Build a modern, professional NEWS CHANNEL WEBSITE using Next.js 14 (App Router) with TypeScript and Tailwind CSS. The design should feel like a premium news portal (think NDTV, CNN, Times of India, BBC style) — clean, fast, content-first, and fully responsive (mobile, tablet, desktop).

## TECH STACK
- Next.js 14+ (App Router, Server Components where possible)
- TypeScript
- Tailwind CSS (custom theme, no default look)
- Framer Motion for subtle animations (page transitions, hover effects, ticker)
- Lucide React for icons
- next/image for optimized images
- Dummy/mock JSON data (array of articles) to simulate a real news API — structure it so it's easy to swap with a real API later

## DESIGN LANGUAGE
- Modern, minimal, high-contrast typography (use a strong serif or condensed sans for headlines, clean sans for body — e.g. Playfair Display / Poppins / Inter combo via next/font)
- Primary brand color: a bold red or deep blue (news-channel feel) + neutral grays + white; support DARK MODE toggle
- Rounded-xl cards with soft shadows, hover lift/scale animation on news cards
- Sticky header with blur/glass effect on scroll
- Consistent spacing system, max-width container, generous whitespace
- Skeleton loaders for content while "loading"
- Fully responsive grid layouts (1 col mobile → 2 col tablet → 3-4 col desktop)

## GLOBAL COMPONENTS
1. **Header/Navbar**
   - Logo (text-based, e.g. "NewsPulse" or similar) + tagline
   - Horizontal category menu: Home, India, World, Politics, Business, Technology, Sports, Entertainment, Health, Science
   - Search bar (expandable icon → input)
   - Dark/light mode toggle
   - "Live TV" or "Breaking" badge button (red pulsing dot)
   - Hamburger menu for mobile with slide-in drawer

2. **Breaking News Ticker**
   - Horizontal auto-scrolling marquee strip below header with latest headlines, red "BREAKING" label

3. **Footer**
   - 4-column layout: About, Categories, Company links, Social + Newsletter signup form
   - Copyright bar at bottom

4. **News Card component** (reusable, multiple variants: large/featured, medium, small/list)
   - Thumbnail image, category tag/badge, headline, short excerpt, author, published time ("5 hours ago"), read time

5. **Sidebar**
   - "Trending Now" numbered list
   - "Most Read" widget
   - Ad placeholder banner
   - Newsletter subscribe box

## PAGES TO BUILD

### 1. Home Page (`/`)
- Hero section: 1 large featured story (big image + headline) + 2-3 secondary stories beside it
- "Latest News" grid section (news cards, 3-4 columns)
- "Trending Topics" horizontal scroll chips
- Category preview sections (e.g. "Top in Sports", "Top in Business") each showing 3-4 cards with "View All" link
- Sidebar with trending/most-read
- Video news section (thumbnail cards with play button overlay)
- Newsletter CTA banner

### 2. Category Page (`/category/[slug]`)
- Category title/banner
- Filter/sort bar (Latest, Popular, Oldest)
- Paginated grid of news cards for that category
- Sidebar (trending + ad)

### 3. Article Detail Page (`/article/[slug]`)
- Category tag, headline (large serif), subheading
- Author info row (avatar, name, published date, read time)
- Social share buttons (WhatsApp, Twitter/X, Facebook, Copy link)
- Featured image with caption
- Article body (well-formatted typography, pull quotes styled distinctly)
- Tags at bottom
- "Related Articles" grid (3-4 cards)
- Comments section UI (static/mock)

### 4. Search Results Page (`/search`)
- Search input at top with result count
- Filterable results list (by category, date)
- Empty state design when no results

### 5. About Page (`/about`)
- Mission statement section, team grid (photo, name, role), timeline/history section

### 6. Contact Page (`/contact`)
- Contact form (name, email, subject, message) with validation states
- Office info cards (address, email, phone) with icons
- Map placeholder

### 7. Live TV / Video Page (`/live`)
- Large video player placeholder (16:9) with "LIVE" badge
- List of video news below in grid

## FUNCTIONALITY (frontend only, mock data)
- Working dark/light mode toggle (persisted with context, not localStorage across artifact restrictions — use React state/context)
- Category filtering works on category pages
- Search filters mock articles by title
- Responsive mobile drawer menu functions properly
- Smooth scroll and Framer Motion fade/slide-in animations on scroll (use intersection observer)
- Image lazy loading with next/image

## DATA STRUCTURE (mock)
Create a `data/articles.ts` file exporting an array of ~20-25 mock articles, each with:
id, slug, title, excerpt, content (multi-paragraph), category, author {name, avatar}, image, publishedAt, readTime, tags[], featured (boolean)

## CODE QUALITY
- Organize into `/app`, `/components`, `/data`, `/lib`, `/types` folders
- Reusable, typed components (props interfaces)
- Clean, commented code
- Use Tailwind config to define custom theme colors, fonts, and spacing — avoid generic default Tailwind look

Make the final result feel like a real, polished, production-grade news website — not a template. Prioritize visual hierarchy, readability, and a fast, modern feel across ALL pages.