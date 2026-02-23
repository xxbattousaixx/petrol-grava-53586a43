# Petrol Grava Services - Immersive Website Redesign

## Original Problem Statement
Take the Petrol Grava Services website and create a new version with the same green/gold color scheme that is 10x more visually appealing. The UX should be more immersive, taking hints from moxy.studio for visual depth. Services in footer must match site content.

## User Personas
- **Primary**: B2B industrial clients in oil/petroleum and maritime industries in Venezuela
- **Secondary**: Potential partners and contractors seeking industrial services

## Core Requirements (Static)
- Same color scheme: Green (#007038) + Gold (#E0A526)
- Bilingual support: Spanish (primary) + English
- All 10 services displayed consistently
- Contact form functionality
- Mobile responsive

## What's Been Implemented (Feb 22, 2026)

### Immersive Features
- ✅ **Satellite Zoom Hero** - Auto-playing cinematic zoom sequence from space to shipyard (NEW)
  - Earth from space → Venezuela region → Lake Maracaibo → Wide dock → Final dock view
  - Satellite UI overlays (crosshairs, coordinates, progress bar)
  - Skip button for impatient users
- ✅ Smooth scrolling with Lenis library
- ✅ Glass-morphism navigation (transparent → blurred on scroll)
- ✅ 3D tilt effect on service cards with framer-motion
- ✅ Grain texture overlay for depth
- ✅ Animated counter statistics
- ✅ Parallax scrolling effects
- ✅ Staggered reveal animations throughout
- ✅ Mobile carousel for "Other Experience" section (Swiper.js, 2 cards per view)

### Pages Built
1. **Homepage** - Satellite zoom hero, stats, about preview, services grid (6), mission/vision, CTA
2. **About Page** - Company history, facilities, experience list with animations, mobile carousel for "Other Experience"
3. **Service Detail Pages** - Dynamic routing for all 10 services
4. **Mission & Vision Page** - Dedicated page with values section
5. **Contact Page** - Form with map and contact info
6. **404 Page** - Branded error page

### Technical Stack
- React 18 + React Router DOM
- Tailwind CSS with custom config
- Framer Motion for animations
- Lenis for smooth scrolling
- Swiper.js for carousels
- Custom fonts: Barlow Condensed (headings), Manrope (body), JetBrains Mono (UI)

### Components
- SatelliteHero - Full satellite zoom animation component
- Layout with grain overlay
- Glass-morphism Navbar with services dropdown
- Footer with all 10 services
- 3D ServiceCard component
- AnimatedCounter component
- ScrollToTop component
- i18n system (LanguageContext + translations)

## Prioritized Backlog

### P0 (Completed)
- [x] Satellite zoom hero effect
- [x] Bilingual support (ES/EN)
- [x] All 10 services in navigation and footer
- [x] Mobile responsive design
- [x] Service detail pages
- [x] Mobile carousel for About page experience cards

### P1 (Deferred)
- [ ] Contact form backend integration (FormSubmit configured)
- [ ] SEO meta tags per page (basic done)
- [ ] Open Graph images for social sharing
- [ ] Google Analytics integration

### P2 (Future)
- [ ] Dark mode toggle
- [ ] Service filtering/search
- [ ] Blog/News section
- [ ] Image gallery lightbox
- [ ] Testimonials section

## Key Files
- `/frontend/src/components/SatelliteHero.js` - Satellite zoom animation
- `/frontend/src/pages/Index.js` - Landing page
- `/frontend/src/pages/AboutPage.js` - About page with mobile carousel
- `/frontend/src/index.css` - All custom CSS including satellite styles
- `/frontend/public/assets/` - Satellite and dock images
