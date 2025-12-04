function handleMouseMove(e) {
    const { currentTarget: target } = e;
    
    // Get the position of the card on the screen
    const rect = target.getBoundingClientRect();
    
    // Calculate mouse position relative to the card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update CSS variables
    target.style.setProperty("--x", `${x}px`);
    target.style.setProperty("--y", `${y}px`);
}