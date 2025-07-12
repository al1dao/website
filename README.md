# AL1 DAO - Futuristic Landing Page

A minimal, futuristic landing page for AL1 DAO featuring Spline 3D effects, custom animations, and responsive design.

## ✨ Features

### 🎨 Design
- **Black background** with **off-white text** for a sleek, futuristic look
- **Minimal design** with clean typography using Orbitron font
- **Fully responsive** - works perfectly on mobile phones and desktop browsers
- **Futuristic aesthetic** with neon colors and glow effects

### 🚀 Interactive Elements
- **Custom cursor** with smooth animations and hover effects
- **Spline 3D effects** integrated in the background
- **Typing animation** for the subtitle
- **Glitch effects** on the main title
- **Matrix rain** background animation
- **Parallax scrolling** effects
- **Smooth button animations** with glow effects

### 📱 Mobile Optimization
- **Touch-friendly** interactions for mobile devices
- **Responsive layout** that adapts to all screen sizes
- **Performance optimized** for lower-end devices
- **Reduced animations** on mobile for better battery life

### ♿ Accessibility
- **High contrast mode** support
- **Reduced motion** support for users with motion sensitivity
- **Keyboard navigation** friendly
- **Screen reader** compatible

## 🛠️ Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with custom properties
- **JavaScript** - Interactive animations and effects
- **Spline** - 3D background effects
- **Google Fonts** - Orbitron font for futuristic typography

## 🎯 File Structure

```
alidao/
├── index.html          # Main HTML file
├── style.css           # CSS styling and animations
├── script.js           # JavaScript functionality
└── README.md           # Documentation
```

## 🔧 Customization

### Colors
Edit the CSS custom properties in `style.css`:

```css
:root {
    --primary-color: #00ff88;      /* Main neon green */
    --secondary-color: #0066ff;    /* Blue accent */
    --accent-color: #ff0066;       /* Pink accent */
    --text-primary: #f0f0f0;       /* Off-white text */
    --text-secondary: #a0a0a0;     /* Gray text */
    --bg-primary: #000000;         /* Black background */
    --bg-secondary: #111111;       /* Dark gray background */
}
```

### Spline Scene
Replace the Spline URL in `index.html`:

```html
<spline-viewer url="YOUR_SPLINE_URL_HERE"></spline-viewer>
```

### Content
- Edit the title, subtitle, and description in `index.html`
- Modify the feature cards in the about section
- Update footer links and information

## 🚀 Getting Started

1. **Clone or download** the files to your project directory
2. **Open `index.html`** in a web browser
3. **Customize** the content and styling as needed
4. **Deploy** to your preferred hosting service

## 📊 Performance Features

- **Throttled scroll events** for smooth performance
- **Intersection Observer** for efficient animations
- **Reduced animations** on low-end devices
- **Optimized animations** using `requestAnimationFrame`
- **Graceful fallbacks** if Spline fails to load

## 🌐 Browser Support

- **Chrome** 60+
- **Firefox** 60+
- **Safari** 12+
- **Edge** 79+
- **Mobile browsers** - iOS Safari, Chrome Mobile

## 🎮 Interactive Elements

### Custom Cursor
- Follows mouse movement with smooth animation
- Changes size and color on hover
- Automatically hidden on touch devices

### Animations
- **Title**: Glowing pulse effect with occasional glitch
- **Subtitle**: Typewriter animation on page load
- **Cards**: Fade in animation when scrolled into view
- **Buttons**: Glow effect on hover
- **Background**: Subtle matrix rain animation

## 🔧 Advanced Customization

### Adding New Animations
Add new animations in `script.js`:

```javascript
// Example: New fade-in animation
function fadeInElement(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        element.style.transition = 'all 0.6s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 100);
}
```

### Modifying Responsive Breakpoints
Edit the media queries in `style.css`:

```css
@media (max-width: 768px) {
    /* Tablet styles */
}

@media (max-width: 480px) {
    /* Mobile styles */
}
```

## 📝 Notes

- The page uses a **public Spline scene** for demonstration
- For production, create your own Spline scene and replace the URL
- All animations are **performance optimized** for smooth experience
- The design is **fully customizable** through CSS custom properties

## 🎉 Enjoy Your Futuristic Landing Page!

Your AL1 DAO landing page is now ready to impress visitors with its futuristic design and smooth animations. The combination of Spline 3D effects, custom animations, and responsive design creates an engaging user experience that works beautifully on all devices.

---

*Built with ❤️ for the future of decentralized autonomous organizations* 