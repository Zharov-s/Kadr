# Development Tips & Troubleshooting

## Common Issues

### GSAP animations not triggering
- Ensure ScrollTrigger is registered: `gsap.registerPlugin(ScrollTrigger)`
- Check that element refs are properly mounted
- Verify window object availability in server components

### Swiper carousel not working
- Import CSS: `import 'swiper/css'` and `import 'swiper/css/pagination'`
- Initialize Swiper modules: `[Pagination, ...]`
- Check for conflicts with existing CSS

### Port 3000 already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

## Development Workflow

### Debugging Animations
- Use GSAP DevTools (Chrome extension)
- Check browser DevTools console for errors
- Use `gsap.globalTimeline.progress()` to inspect timeline

### Mobile Testing
- Use device emulation in browser DevTools
- Test on actual devices when possible
- Check touch events with `pointer-events`

### Performance Profiling
- Use Chrome DevTools Lighthouse
- Check Performance tab for frame rate
- Use React DevTools Profiler

## Useful Commands

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run start      # Run production build
npm run lint       # Run ESLint
npm run type-check # TypeScript check (when added)
```
