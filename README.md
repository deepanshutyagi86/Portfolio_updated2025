
# Portfolio Website

This is a personal portfolio website built using HTML5, CSS3, JavaScript, and various other technologies and tools. It showcases my skills and experience in web development.
This portfolio website was built using the following technologies and tools:

- HTML5: The structure and content of the website are written in HTML5.
- CSS3: The styling and layout of the website are defined using CSS3.
- JavaScript: The interactivity and functionality of the website are implemented using JavaScript.
- Git: Version control is managed using Git.
- GitHub Pages: The website is hosted on GitHub Pages.
- Visual Studio Code: The website was developed using Visual Studio Code as the code editor.
- Adobe Photoshop: The logo for the website was created using Adobe Photoshop.
- Adobe Illustrator: The icons for the website were created using Adobe Illustrator.
- Font Awesome: The icons used on the website were obtained from Font Awesome.
- Google Fonts: The fonts used on the website were obtained from Google Fonts.
- Bootstrap: The responsive layout of the website was created using Bootstrap.
- jQuery: The interactivity and functionality of the website were enhanced using jQuery.
- AOS (Animate On Scroll): The animations on the website were created using AOS.

Overall, this portfolio website showcases my skills and experience in web development using a variety of technologies and tools.
# Deepanshu Tyagi Portfolio Website

A portfolio website with dynamic background effects and interactive elements to showcase skills and projects.

## Features

- Interactive particle system background
- 3D elements using Three.js
- Animated gradient background
- Matrix-style code rain effect
- AR integration
- Responsive design
- Dark/light theme switcher
- Interactive project showcases

## Project Structure

```
/portfolio_deepanshutyagi (root folder)
│
├── index.html                # Main HTML file
│
├── assets/                   # All assets folder
│   │
│   ├── css/                  # CSS files
│   │   ├── style.css         # Main stylesheet
│   │   └── animations.css    # Animation and dynamic elements styles
│   │
│   ├── js/                   # JavaScript files
│   │   ├── main.js           # Main JS file - coordinates all functionality
│   │   ├── particles.js      # Interactive particle system
│   │   ├── three-setup.js    # 3D elements with Three.js
│   │   ├── gradient.js       # Animated gradient background
│   │   ├── code-rain.js      # Matrix-style code rain effect
│   │   └── ar-element.js     # AR element integration
│   │
│   └── images/               # Image assets
│       ├── profile.jpg       # Your profile picture
│       ├── placeholder.jpg   # Placeholder for projects without images
│       └── project-images/   # Folder for project screenshots
│
├── README.md                 # This file
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/deepanshutyagi86/portfolio_deepanshutyagi.git
   ```

2. Navigate to the project directory:
   ```
   cd portfolio_deepanshutyagi
   ```

3. Create the required folder structure:
   ```
   mkdir -p assets/css assets/js assets/images/project-images
   ```

4. Place all the HTML, CSS, and JavaScript files in their respective folders according to the project structure.

5. Add your profile picture as `profile.jpg` in the `assets/images` folder.

6. Add project screenshots in the `assets/images/project-images` folder.

7. Open `index.html` in a web browser to view your portfolio.

## Customization

- Update personal information in `index.html`
- Modify project details in `main.js` under the `initProjectsSection()` function
- Adjust colors and styles in `style.css`
- Customize animation parameters in JavaScript files

## External Libraries Used

- [Three.js](https://threejs.org/) - For 3D elements
- [GSAP](https://greensock.com/gsap/) - For animations
- [Font Awesome](https://fontawesome.com/) - For icons

## Additional Notes

- The AR functionality is a simplified demonstration. In a real implementation, you would integrate with AR.js, 8th Wall, or other AR libraries.
- The contact form requires backend integration to send emails.

## Future Enhancements

- Add a blog section
- Implement more interactive projects showcase
- Enhance AR functionality with real AR frameworks
- Add page transitions

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Mobile / performance notes (Sept 2026)

### Responsive images

Every cropped photo is served as WebP at three widths from `assets/images/opt/`,
wrapped in `<picture>` with the original JPEG left as the `src` fallback.
The carousel loads slide 1 eagerly (it is the LCP element and is preloaded from
`<head>`); the rest are held in `data-srcset` / `data-src` and pulled in by the
`hydrate()` / `warm()` helpers just before the carousel reaches them.

First load on a phone went from ~3.3 MB to ~250 KB.

**After adding or replacing a photo**, regenerate the WebP set:

```bash
python3 tools/gen-images.py
```

then point the new slide's `<source srcset>` at the files it prints.

### Focal points

A phone crops a landscape photo down to a narrow vertical slice, so each image
carries a `--fp` custom property (`style="--fp:46% 35%"`) that feeds
`object-position`. That is what decides which part of the picture survives the
crop at every screen size.

### Admin panel

Don't hand-edit those percentages — use the local admin:

```bash
node admin/server.js      # then open http://localhost:4321
```

Drag the crosshair on any photo and three live previews (phone / tablet /
desktop, at the real box sizes) update as you drag. Carousel badge, title and
description are editable there too. **Save** writes straight into `index.html`
and keeps the previous version as `index.html.bak`; commit and push as usual.

The admin is local-only — `.vercelignore` keeps it out of the deployment.
