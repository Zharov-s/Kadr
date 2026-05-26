# Architecture & Component Structure

## Directory Structure

```
src/
├── app/              # Next.js app router
├── components/
│   ├── home/        # Homepage components
│   ├── layout/      # Layout components (Navbar, Footer, etc.)
│   └── common/      # Shared components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── styles/          # Global styles
└── types/           # TypeScript types
```

## Component Patterns

### Page Components
- Located in `src/app/`
- Async components by default
- Fetch data at component level

### Feature Components
- Located in `src/components/home/`
- Client-side animation logic
- Use GSAP for scroll-triggered effects

### Layout Components
- Located in `src/components/layout/`
- Persistent across routes
- Global state management (if needed)

## Animation Architecture

- **GSAP**: Primary animation engine
- **ScrollTrigger**: Scroll-based animations
- **Swiper**: Touch-enabled carousels
- **CSS**: Initial state and transitions
