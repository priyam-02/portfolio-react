# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with React and Vite, showcasing projects, experience, and contact information. The site features smooth scroll animations using Framer Motion and a single-page layout with anchor navigation.

## Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint linter
npm run lint
```

## Architecture

### Component Structure

Each component follows a self-contained pattern with its own `.jsx` and `.css` files:
- `src/Components/[ComponentName]/[ComponentName].jsx`
- `src/Components/[ComponentName]/[ComponentName].css`

### Main Application Flow

1. **Entry Point** ([main.jsx](src/main.jsx)): Renders the App component in React StrictMode
2. **App Component** ([App.jsx](src/App.jsx)):
   - Wraps all sections in Framer Motion components for scroll animations
   - Uses `useScroll` and `useTransform` hooks for scroll progress bar
   - Forces page to scroll to top on mount/refresh (`history.scrollRestoration = "manual"`)
   - Each section uses `whileInView` for entrance animations with `viewport={{ once: true }}`

### Key Components

- **Navbar** ([Navbar.jsx](src/Components/Navbar/Navbar.jsx)):
  - Uses `react-anchor-link-smooth-scroll` for smooth navigation
  - Tracks active section with state
  - Responsive mobile menu with overlay
  - Auto-closes mobile menu on desktop resize
  - Changes appearance on scroll (`isScrolled` state)

- **Hero, About, MyWork, Milestones, Contact**: Portfolio sections rendered in sequence
- **ScrollToTop**: Floating button for quick navigation to top
- **Footer**: Bottom section with additional info

### Data Management

Portfolio data is stored in static JavaScript files in `src/assets/`:
- `mywork_data.js`: Project showcase data (title, description, tags, links, images)
- `milestones_data.js`: Experience/milestone information

Each project entry includes:
- Project name, description, and tags
- SVG image imported from assets
- GitHub repository link
- Optional live demo link (`w_live`)

### Styling Approach

- Global styles in [src/index.css](src/index.css)
- Component-specific styles co-located with components
- FontAwesome icons via CDN import in [App.jsx](src/App.jsx)
- Framer Motion handles animation styling

### Animation Strategy

All animations use Framer Motion:
- **Scroll Progress Bar**: Horizontal bar at top scales with page scroll
- **Section Animations**: Each section fades in and slides up when entering viewport
- **Staggered Delays**: Sequential sections have incremental delays (0.2s, 0.3s, 0.4s, 0.5s)
- **Once-only**: `viewport={{ once: true }}` prevents animations from replaying on scroll back

## Important Implementation Notes

### Navigation
- All internal navigation uses `AnchorLink` from `react-anchor-link-smooth-scroll` with 80px offset
- Section IDs must match the navigation items: `home`, `about`, `mywork`, `milestones`, `contact`

### Assets
- All images are SVG files stored in `src/assets/`
- Project images can be large (10-25MB SVG files)
- Import assets in data files rather than using paths

### Mobile Responsiveness
- Mobile menu uses ref manipulation for slide-in animation
- Overlay click closes mobile menu
- Menu auto-closes on window resize to desktop breakpoint (1024px)

### Scroll Behavior
- Page always scrolls to top on load/refresh (critical for UX)
- Scroll restoration is manually disabled via `history.scrollRestoration = "manual"`
