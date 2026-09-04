#!/usr/bin/env node
/*  Portfolio admin — local only, zero dependencies.
 *
 *    node admin/server.js      →  http://localhost:4321
 *
 *  Reads index.html, lets you drag a focal point on every cropped photo and
 *  edit the carousel copy, then writes index.html back in place.
 *  Nothing here is used by the live site; it never runs on Vercel.
 */
const http = require('http');
const fs   = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const IDX  = path.join(ROOT, 'index.html');
const PORT = process.env.PORT || 4321;

const MIME = { '.html':'text/html; charset=utf-8', '.js':'text/javascript', '.css':'text/css',
  '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.png':'image/png', '.webp':'image/webp',
  '.svg':'image/svg+xml', '.json':'application/json', '.pdf':'application/pdf', '.ico':'image/x-icon' };

/* ── the boxes each photo is actually cropped into, per breakpoint ───── */
/* Below 900px the carousel shows each photo whole (object-fit:contain on a
   blurred backdrop), so a slide's focal point only affects desktop. The band
   and the hero cards are still cropped at every size. */
const BOXES = {
  slide: [ ['Desktop', 1440, 900], ['Laptop', 1280, 800] ],
  band:  [ ['Phone', 390, 242], ['Tablet', 768, 422], ['Desktop', 605, 738] ],
  card:  [ ['Phone', 300, 400], ['Tablet', 300, 400], ['Desktop', 420, 560] ],
};

const dec = s => String(s == null ? '' : s);

function parse(html) {
  const items = [];
  const imgRe = /<img[^>]*data-role="(slide|band|card)"[^>]*>/g;
  let m;
  while ((m = imgRe.exec(html))) {
    const tag  = m[0];
    const role = m[1];
    const stem = (tag.match(/data-focal="([^"]+)"/) || [])[1];
    const fp   = (tag.match(/--fp:\s*([^;"]+)/) || [])[1] || 'center top';
    const src  = (tag.match(/\sdata-src="([^"]+)"/) || tag.match(/\ssrc="([^"]+)"/) || [])[1] || '';
    const alt  = (tag.match(/alt="([^"]*)"/) || [])[1] || '';
    if (!stem) continue;
    const parts = fp.trim().split(/\s+/);
    const num = v => /%$/.test(v) ? parseFloat(v) : (v === 'left' || v === 'top' ? 0 : v === 'right' || v === 'bottom' ? 100 : 50);
    items.push({ stem, role, src, alt, x: num(parts[0] || '50%'), y: num(parts[1] || '50%') });
  }
  // carousel copy, sliced on the "<!-- SLIDE n" comments already in the file
  const chunks = html.split(/<!-- SLIDE \d+/).slice(1);
  chunks.forEach((c, i) => {
    const stem = (c.match(/data-focal="([^"]+)"/) || [])[1];
    const it = items.find(o => o.stem === stem && o.role === 'slide');
    if (!it) return;
    it.index = i;
    it.badge = dec((c.match(/<div class="cs-badge">([\s\S]*?)<\/div>/) || [])[1]).trim();
    it.title = dec((c.match(/<h2>([\s\S]*?)<\/h2>/) || [])[1]).trim();
    it.desc  = dec((c.match(/<p>([\s\S]*?)<\/p>/) || [])[1]).trim();
  });
  return items;
}

function save(html, items) {
  let out = html;
  // focal points — data-focal is unique per photo, so this is precise
  for (const it of items) {
    const re = new RegExp('(data-focal="' + it.stem + '"[^>]*?--fp:\\s*)[^;"]*');
    if (!re.test(out)) throw new Error('could not locate focal point for ' + it.stem);
    out = out.replace(re, '$1' + it.x + '% ' + it.y + '%');
  }
  // carousel copy, edited inside each slide's own chunk only
  const parts = out.split(/(<!-- SLIDE \d+)/);
  const slides = items.filter(i => i.role === 'slide').sort((a, b) => a.index - b.index);
  let si = 0;
  for (let i = 1; i < parts.length; i += 2) {
    const it = slides[si++]; if (!it) break;
    let c = parts[i + 1];
    if (it.badge != null) c = c.replace(/(<div class="cs-badge">)[\s\S]*?(<\/div>)/, (_, a, b) => a + it.badge + b);
    if (it.title != null) c = c.replace(/(<h2>)[\s\S]*?(<\/h2>)/, (_, a, b) => a + it.title + b);
    if (it.desc  != null) c = c.replace(/(<p>)[\s\S]*?(<\/p>)/,   (_, a, b) => a + it.desc  + b);
    parts[i + 1] = c;
  }
  return parts.join('');
}

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);

  if (url === '/api/slides') {
    const html = fs.readFileSync(IDX, 'utf8');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ items: parse(html), boxes: BOXES }));
  }

  if (url === '/api/save' && req.method === 'POST') {
    let body = '';
    req.on('data', d => body += d);
    req.on('end', () => {
      try {
        const { items } = JSON.parse(body);
        const html = fs.readFileSync(IDX, 'utf8');
        fs.writeFileSync(IDX + '.bak', html);
        fs.writeFileSync(IDX, save(html, items));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, backup: 'index.html.bak' }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
    });
    return;
  }

  // static: the admin UI at /, everything else straight out of the repo
  let file = url === '/' ? path.join(__dirname, 'index.html') : path.join(ROOT, url.replace(/^\/+/, ''));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end('forbidden'); }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(buf);
  });
});

module.exports = { parse, save, BOXES };

if (require.main !== module) return;

server.listen(PORT, () => {
  console.log('\n  Portfolio admin running');
  console.log('  →  http://localhost:' + PORT + '\n');
  console.log('  Editing: ' + IDX);
  console.log('  Ctrl-C to stop.\n');
});
