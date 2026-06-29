# Removed Elements - Homepage Cleanup

## Hero Section

**Removed:**
- All animations (fadeInUp keyframes, opacity transitions, staggered delays)
- "Explore" button/link with SVG arrow icon
- Viewport-height layout (min-h-[85vh])
- Centered layout with max-width constraints
- Large typography scale (text-9xl)
- Font-extralight weight
- Complex spacing (space-y-8, mb-20)
- Client-side JavaScript (onClick handlers, smooth scroll)

**Why:** Animations are decorative. Buttons are unnecessary navigation. Large typography is performative. The name and statement are enough.

**Kept:**
- Name: "Ire Soleye"
- Statement: "Building systems that matter"
- Simple typography hierarchy

---

## Projects Section

**Removed:**
- Card components (backgrounds, borders, shadows, padding)
- Project descriptions
- Language badges
- Star count badges
- Update date badges
- "Repository" and "Demo" links
- Grid layout (12-column responsive grid)
- All metadata display

**Why:** Cards are decorative containers. Descriptions are marketing. Badges are visual noise. Links are redundant (project names link directly). Grids add complexity without value.

**Kept:**
- Plain list of project names
- Direct links to repositories
- Chronological order (most recent first)

---

## About Section

**Removed:**
- Verbose descriptions ("I'm a computer science student...")
- Multiple paragraphs
- Marketing language ("building in public", "turning ideas into usable products")
- Explanatory text

**Why:** Unnecessary elaboration. The work speaks.

**Kept:**
- Section heading
- One declarative sentence: "Computer science student. Building systems."

---

## Header

**Removed:**
- Backdrop blur effect (backdrop-filter: blur)
- Transparency effects (color-mix opacity)
- Bold font weight on brand
- Opacity transitions on nav links

**Why:** Visual effects are decorative. Bold is performative. Opacity changes are unnecessary.

**Kept:**
- Simple sticky header
- Plain border
- Normal font weights
- Direct color changes on hover

**Changed:**
- "Blog" → "Notes" (more accurate, less performative)

---

## Global Styles

**Removed:**
- Body gradient background (linear-gradient)
- fadeInUp animation keyframes
- All card styles (.card, .card-title, .card-body, .card-actions)
- All badge styles (.badge)
- All button styles (.btn, .btn.primary)
- Grid system (.projects-grid)
- Section alt backgrounds (.section.alt)
- Box shadows
- Border radius on cards
- Complex color-mix effects

**Why:** Gradients are decorative. Cards and badges are containers. Buttons aren't used. Grids add complexity. Shadows and rounded corners are decorative.

**Kept:**
- Solid background color
- Basic typography
- Simple borders
- Container width constraints
- Essential link styles

---

## Blog/Notes Page

**Removed:**
- Card layout for posts
- Post previews/descriptions (truncated content)
- Date badges with formatting
- Attachment count badges
- Grid layout

**Why:** Same reasoning as projects. Plain list is clearer.

**Kept:**
- List of post titles
- Direct links to posts
- Chronological order

**Changed:**
- "Blog" → "Notes" (throughout)
- Simplified empty state message

---

## Philosophy

Every decorative element was removed because:
1. **Cards** - Unnecessary containers that add visual weight
2. **Badges** - Metadata noise that distracts from content
3. **Animations** - Decorative motion that doesn't add clarity
4. **Gradients** - Visual effects that don't serve function
5. **Shadows** - Depth effects that are purely aesthetic
6. **Descriptions** - Marketing language that doesn't add value
7. **Icons** - Visual decoration that doesn't clarify meaning

The result: Typography and spacing only. Content first. No decoration.
