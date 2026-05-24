# Оптика будущего - Advanced Eyewear Experience

A highly interactive, visually stunning frontend web application built to redefine the online eyewear shopping experience. Designed with a premium 'Luxe' aesthetic, this project combines modern web technologies with advanced CSS and Canvas-based animations to create a cinematic and engaging user flow.

## Features

- **Cinematic 3D Hero Section:** Features a fluid, auto-rotating 3D model embed using Sketchfab with high-end glassmorphism controls.
- **Interactive Vision Canvas:** A custom-built HTML5 Canvas implementation of fluid simulation and particle text mechanics ("FUTURE OF EYEWEAR") that reacts dynamically to mouse movement.
- **Smooth Scrolling & Navigation:** Utilizes `framer-motion` to create butter-smooth page navigation, scroll reveals, and parallax effects. Let the user explore effortlessly with a custom glowing cursor.
- **Dynamic Marquee Scroller:** A cinematic horizontal scrolling banner section using high-resolution lifestyle imagery.
- **Infinite Testimonial Engine:** Features an infinitely looping double-lane carousel of glassmorphism testimonial cards.
- **Blur-Reveal Footer:** A beautifully animated footer banner that transitions from a heavy blur into sharp focus based on your scroll position.
- **Premium User Interface:** Tailored for a luxury brand experience with curated typography, neon accents, and minimalist, un-obstructive layouts.

## Tech Stack

- **Framework:** React 19 / Vite
- **Styling:** Tailwind CSS / Vanilla CSS (for complex micro-interactions and neon fx)
- **Animations:** Framer Motion (Scroll, Spring, variants), Native Canvas Physics
- **Routing:** Wouter (Lightweight declarative routing)
- **UI Components:** Customized Radix UI primitives with Lucide Icons

## Getting Started

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Start the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Build for production:**
   \`\`\`bash
   npm run build
   \`\`\`

## Performance Notes

- This project is optimized using vanilla JS where React's re-render cycle is too heavy (e.g. the custom 60fps glowing cursor).
- The fluid particle simulation uses efficient canvas loop skips and bounds checking to ensure decent performance across modern browsers without relying on external WebGL heavyweights like Three.js when unnecessary.
- 3D models are conditionally loaded or handled via highly efficient iframes to not block the main thread.

## License

This project was built as an experimental frontend demonstration.
