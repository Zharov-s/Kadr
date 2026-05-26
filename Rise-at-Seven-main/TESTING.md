# Testing Guidelines

## Component Testing

While the project currently uses manual testing, here are recommended practices:

### Manual Testing Checklist

- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on iOS Safari and Android Chrome
- [ ] Verify animations at 60fps
- [ ] Test keyboard navigation
- [ ] Verify screen reader compatibility
- [ ] Check color contrast ratios

### Animation Testing

- [ ] Animations trigger on scroll correctly
- [ ] Mobile animations fall back gracefully
- [ ] No performance degradation with animations
- [ ] ScrollTrigger cancels on unmount

### Responsive Testing

- Mobile: 375px (iPhone SE)
- Tablet: 768px (iPad)
- Desktop: 1024px and above

## Future: Unit Testing

```bash
npm install --save-dev jest @testing-library/react
```

See Jest configuration in `jest.config.js` (to be created).
