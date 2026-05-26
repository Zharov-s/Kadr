# Performance Guidelines

## Component Optimization

- Use React.memo() for components with expensive renders
- Implement lazy loading for below-the-fold sections
- Optimize GSAP animations with `will-change` CSS
- Use dynamic imports for code splitting

## Animation Performance

- Use `transform` and `opacity` for animations
- Avoid animating layout-triggering properties
- Implement requestAnimationFrame for smooth 60fps
- Use Swiper's native lazy-loading

## Image Optimization

- Use Next.js Image component
- Provide multiple srcSet sizes
- Use modern formats (WebP with fallback)
- Compress assets before upload

## Bundle Size

- Monitor bundle size with `npm run build`
- Code-split route-based components
- Tree-shake unused dependencies
