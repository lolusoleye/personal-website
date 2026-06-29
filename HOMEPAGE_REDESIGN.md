# Homepage Redesign - Final Minimal State

## Changes Made

### Hero Section
**Before:**
- "Building systems that matter" (marketing language)
- Larger typography (text-4xl)
- More padding

**After:**
- "Systems engineer" (declarative, factual)
- Smaller typography (text-3xl)
- Increased top padding (pt-32) for more space
- Removed all decorative elements

**Why:** "Building systems that matter" is performative. "Systems engineer" is a statement of fact. Smaller type is more serious, less performative.

---

### Layout & Container
**Before:**
- Container max-width: 1100px
- No explicit padding

**After:**
- Container max-width: 700px
- Padding: 1rem on sides
- All content left-aligned

**Why:** Narrower width forces focus. 700px is optimal reading width. Left alignment is standard for serious content.

---

### Typography
**Before:**
- Responsive clamp() sizing
- Font weights: 700, 600
- Line-height: 1.2

**After:**
- Fixed sizes (text-3xl, text-xl, text-sm)
- Font weight: 400 (normal) throughout
- Line-height: 1.4

**Why:** Fixed sizes are predictable. Normal weight (400) is less performative than bold. 1.4 line-height improves readability.

---

### Sections Removed
**Removed:**
- About section entirely

**Why:** Redundant. Hero already states identity. About sections are typically marketing fluff.

---

### Projects Section
**Before:**
- Heading: text-2xl, mb-6
- List spacing: space-y-1

**After:**
- Heading: text-xl, mb-8 (more space)
- List spacing: space-y-2 (more space)
- Project links: text-sm

**Why:** More spacing creates breathing room. Smaller project links reduce visual weight. Single column, plain list.

---

### Notes Section (New)
**Added:**
- One-line intro: "Occasional thoughts on systems and software."
- Link to notes page: "View all notes →"
- Removed About from navigation

**Why:** Notes section replaces About. One-line intro sets context without marketing. Simple link replaces cards/grids.

---

### Navigation
**Removed:**
- "About" link from header

**Why:** About section removed. Navigation should only link to existing content.

---

### Spacing Philosophy
**Increased spacing throughout:**
- Hero: pt-32 pb-20 (was py-24)
- Sections: py-20 (was py-16)
- Project list: space-y-2 (was space-y-1)
- Headings: mb-8 (was mb-6)

**Why:** Spacing replaces decoration. More space = more serious, less cluttered. White space is the only decoration needed.

---

## Final Structure

```
Hero
  - Name: "Ire Soleye"
  - Role: "Systems engineer"

Projects
  - Plain list of names
  - Direct links

Notes
  - One-line intro
  - Link to notes page
```

---

## Design Principles Applied

1. **Declarative over descriptive**: "Systems engineer" not "Building systems that matter"
2. **Factual over performative**: No marketing language
3. **Spacing over decoration**: White space is the only visual element
4. **Typography over graphics**: No icons, images, or decorative elements
5. **Content over containers**: No cards, badges, or visual containers
6. **Serious over friendly**: Normal weights, restrained sizing, left-aligned

---

## What Was Removed (Final Pass)

- About section (redundant)
- "About" navigation link
- Responsive typography (clamp)
- Bold font weights
- Marketing copy ("Building systems that matter")
- Larger hero typography
- Tighter spacing
- Wider container

---

## Result

A homepage that:
- States identity clearly
- Lists work plainly
- Links to notes simply
- Uses spacing as the only visual element
- Conveys seriousness through restraint
- Eliminates all decorative elements
