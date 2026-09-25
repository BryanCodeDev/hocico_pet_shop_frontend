# Hocico Pet Shop Redesign Proposal
## Apple-Inspired Minimalist Rebrand

### 1. Design Direction

The current design is a **dark-theme tech store** with a near-black background (`primary-900` = `#030303`), white text, and gold accents (`#C9A860`). This proposal rebrands to an **Apple-inspired minimalist aesthetic** with:

| Aspect | Current | New (Apple-inspired) |
|--------|---------|---------------------|
| Background | `primary-900` (#030303) | `#FFFFFF` (pure white) |
| Typography | White on dark | `#111827` / `#1F2937` (high-contrast black) |
| Accent | Gold (#C9A860) | Charcoal gray (#616161) — restrained, sophisticated |
| Borders | `#333333` (dark) | `#E0E0E0` (subtle light gray) |
| Cards | Glassmorphism, dark blur | Clean white, subtle shadow, thin border |
| Buttons | Gold gradient | Solid charcoal / outline / text-link |
| Animations | Bounce, gold pulse | Subtle fade and translate |

### 2. Tailwind Palette Redefinition Strategy

Rather than renaming every class, the `gold` and `primary` color scales are **redefined in-place** to charcoal/light-gray values. Existing class names (`text-gold-400`, `bg-gold-600`, `bg-primary-900`, etc.) are preserved but render the new palette. Only hardcoded hex colors and the `bg-primary-900`/`text-white` base swaps need source edits.

**New `primary` (light scale):** 50=`#FFFFFF` → 900=`#111827`
**New `gold` (charcoal scale):** 50=`#FAFAFA` → 900=`#1A1A1A`
**New `silver` (light gray):** mirrors charcoal for consistency
**`borderColor.dark-border`** → `#E0E0E0`

### 3. Component-Level Changes

#### Layout (Navbar, Footer)
- Navbar: white background, black text, subtle bottom border, charcoal icons/accents
- Footer: clean white/light-gray, charcoal headings, minimal social links

#### Home (Hero, TrustSection, Newsletter, FeaturedProducts)
- Hero: minimal full-width product image, centered headline in black, single primary button (charcoal)
- TrustSection: white cards, charcoal icons, clean grid
- Newsletter: white card, charcoal CTA, simplified form

#### ProductCard
- White card, light border, charcoal text
- Price in charcoal (was gold)
- Simplified badge system (charcoal/white)
- Reduced action buttons on hover

#### Store / Category / Search
- White page bg, light gray filter sidebar
- Charcoal filter checkboxes
- Clean pagination with charcoal active states

#### Auth (Login, Register)
- Centered white card, charcoal inputs, minimal form
- Single primary button (charcoal)

#### Cart / Checkout
- White summary cards, charcoal text
- 3-step wizard with charcoal indicators
- Clean payment method selection

#### Account / OrderDetail
- Sidebar nav with charcoal active states
- Order table with light borders
- White cards for order details

#### Admin (Dashboard, Products, Categories, Orders, Users, Settings)
- AdminLayout: light sidebar (charcoal dark mode replaced with light)
- Tables: clean borders, charcoal text
- Form pages: white cards, charcoal inputs

#### Misc (NotFound, About, Contact, Legal, Success/Failure/Pending)
- All pages: white bg, black heading text
- Status badges: colored (green/red/blue) on light gray backgrounds
- Toasts: light theme (white bg, charcoal text)

### 4. Files Modified

| Category | Files |
|----------|-------|
| Config | `tailwind.config.js`, `index.css`, `index.html`, `main.jsx` |
| Layout | `components/layout/Navbar.jsx`, `components/layout/Footer.jsx` |
| Home | `components/home/Hero.jsx`, `TrustSection.jsx`, `Newsletter.jsx`, `FeaturedProducts.jsx` |
| Products | `components/products/ProductCard.jsx`, `ProductSkeleton.jsx` |
| Cart | `components/cart/CartDrawer.jsx` |
| Auth | `components/auth/RouteGuards.jsx` |
| Pages | `pages/Home.jsx`, `pages/Store.jsx`, `pages/ProductDetail.jsx`, `pages/Cart.jsx`, `pages/Checkout.jsx`, `pages/CheckoutSuccess.jsx`, `pages/CheckoutFailure.jsx`, `pages/CheckoutPending.jsx`, `pages/About.jsx`, `pages/Contact.jsx`, `pages/Search.jsx`, `pages/NotFound.jsx`, `pages/Category.jsx`, `pages/account/Account.jsx`, `pages/account/OrderDetail.jsx` |
| Admin | `layouts/AdminLayout.jsx`, `pages/admin/Dashboard.jsx`, `pages/admin/Products.jsx`, `pages/admin/Categories.jsx`, `pages/admin/Settings.jsx` |

### 5. Implementation Order

1. Tailwind config (palette redefinition)
2. index.css (base styles + component classes)
3. index.html (theme-color meta)
4. main.jsx (Toaster styling)
5. Navbar → Footer → Hero → TrustSection → Newsletter
6. ProductCard → ProductSkeleton
7. CartDrawer → RouteGuards
8. Store → Category → ProductDetail → Search
9. Cart → Checkout → CheckoutSuccess/Failure/Pending
10. Auth (Login/Register)
11. Account → OrderDetail
12. Admin (Layout → Dashboard → Products → Categories → Settings)
13. Remaining pages (About → Contact → NotFound → Legal)
14. Lint + typecheck verification