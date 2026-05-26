# Deployment Guide

## Environment Setup

### Production Environment

```bash
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.riseatseven.com
```

### Staging Environment

```bash
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://staging-api.riseatseven.com
```

## Build & Deploy

### Local Build
```bash
npm run build
npm run start
```

### Vercel Deployment
Push to main branch to auto-deploy to Vercel.

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD npm start
```

## Post-Deployment Checks

- [ ] Verify all animations load smoothly
- [ ] Test on mobile devices
- [ ] Check Core Web Vitals
- [ ] Monitor error tracking
