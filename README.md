# shourya-portfolio

The personal website and portfolio for [Shourya Sharan](https://www.shouryasharan.xyz).

I rebuilt this from scratch to keep things fast, minimal, and straightforward. Previous iterations had heavy 3D canvases, canvas particle systems, and audio engines that slowed down page loads and distracted from the actual content. This version gets rid of the gimmicks and focuses on clean typography, snappy load times, and a calm reading experience.

---

## Stack

- **Framework**: Next.js 15 (App Router), React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS custom properties for theming
- **Typography**: Inter (body/headings) and JetBrains Mono (labels/code accents) via `next/font`
- **Hosting**: Vercel

---

## What's Inside

- **Fast bundle**: Around ~100 KB total First Load JS. Most components are server-rendered.
- **Theme support**: Defaults to dark mode with a quick toggle to light mode. Theme preference is saved in `localStorage`, and an inline script in the `<head>` prevents any flash on refresh.
- **Single source of truth**: All data — projects, roles, school history, certifications, and contact info — lives in [`src/lib/data.ts`](src/lib/data.ts). Updating any detail takes seconds without digging through component markup.
- **Micro-interactions**: Subtle fade-ins on scroll using a tiny native `IntersectionObserver` helper instead of a bloated animation library.

---

## Project Structure

```text
src/
├── app/
│   ├── globals.css        # Theme variables (dark by default, [data-theme="light"])
│   ├── layout.tsx         # Font definitions, SEO metadata, theme blocker
│   └── page.tsx           # Server component assembling each section
├── components/
│   ├── Nav.tsx            # Header with navigation links and theme switcher
│   ├── Hero.tsx           # Intro, current status indicators, call to action
│   ├── About.tsx          # Background, academic track record, recognitions
│   ├── Projects.tsx       # Handpicked projects with tech tags and links
│   ├── Skills.tsx         # Skill categories and active certifications
│   ├── Contact.tsx        # Direct contact details and one-click email copy
│   ├── Footer.tsx         # Simple copyright and status line
│   ├── ThemeToggle.tsx    # Sun / moon toggle button
│   └── FadeObserver.tsx   # Lightweight scroll fade triggers
└── lib/
    └── data.ts            # Central data store for all portfolio facts
```

---

## Running Locally

Make sure you have Node.js 18+ installed.

```bash
# 1. Clone the repository
git clone https://github.com/shouryasharan7-netizen/shourya-portfolio.git
cd shourya-portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To verify a production build:

```bash
npm run build
npm run start
```

---

## License & Contact

Feel free to use the layout or architecture for your own portfolio. If you want to get in touch:

- **Website**: [shouryasharan.xyz](https://www.shouryasharan.xyz)
- **Email**: [shouryasharan27@gmail.com](mailto:shouryasharan27@gmail.com)
- **GitHub**: [@shouryasharan7-netizen](https://github.com/shouryasharan7-netizen)
