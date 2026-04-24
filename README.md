<center> <h1><a href="https://365tsf.vercel.app/">ThreeSixtyFive</a></h1></center>
<p align="center">
  <img src="https://skillicons.dev/icons?i=react,nextjs,tailwind,ts" />
  <br/>
  <a href=""><kbd>⚫️ shadcn-ui</kbd></a>
</p>
<br/><br/>

# What is ThreeSixtyFive?

ThreeSixtyFive is a website that turns your year into a grid of 365 dots — one for every day. As the year moves forward, each dot fills in. It's a quiet, visual reminder of time passing. You can set it as a dynamic wallpaper that updates automatically every day so you never lose track of where you are in the year.

It also supports a life calendar (weeks of your life) and goal countdowns if you want to track something more personal.

# Features

- 365-dot year grid that fills in as each day passes
- Life calendar mode — every week of your life as a dot
- Goal countdown mode for milestones, launches, vacations
- Fully customizable colors, accent, and background
- Wallpaper URL generation for dynamic wallpapers on iOS and Android
- Timezone-aware via country selection
- Supports 30+ phone models for accurate resolution

# Self Hosting Guide

### Prerequisites

- Node.js 20 or later
- npm or bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/avalynndev/threesixtyfive.git
cd threesixtyfive
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

### Setting Up Dynamic Wallpapers (iOS)

1. Copy your generated wallpaper URL from the site
2. Open the **Shortcuts** app → Automation tab → New Automation
3. Set trigger to **Time of Day: 6:00 AM**, repeat daily, run immediately
4. Add action: **Get Contents of URL** → paste your wallpaper URL
5. Add action: **Set Wallpaper Photo** → choose Lock Screen
6. In "Set Wallpaper Photo", tap the arrow (→) and disable both **Crop to Subject** and **Show Preview**

By following these steps, you can host ThreeSixtyFive on your own server and make it accessible to others.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Favalynndev%2Fthreesixtyfive)
