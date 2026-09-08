export const en = {
  meta: {
    title: "Jonathan Bergamo",
    description:
      "Full-stack software engineer building web, mobile and distributed systems. Open to new opportunities.",
  },
  os: {
    start: "Start",
    close: "Close",
    minimize: "Minimize",
    maximize: "Maximize",
    restore: "Restore",
    resetLayout: "Reset layout",
    openWindow: "Open {name}",
    running: "Open windows",
    home: "Home",
    theme: "Toggle dark mode",
    language: "Language",
    downloadCv: "Download CV",
    desktopHint: "Double-click an icon to open it",
    nothingOpen:
      "Nothing open yet. Pick a section from the desktop or the Start menu.",
    windowMenu: "Sections",
    system: "System",
    tip: "Tip: drag title bars to move, drag edges to resize, Esc closes the focused window.",
  },
  windows: {
    about: "About me",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
    terminal: "Terminal",
  },
  about: {
    greeting: "Hi, I'm Jonathan.",
    role: "Full-stack software engineer",
    location: "São Paulo, Brazil · working remotely for London",
    status: "Open to new opportunities",
    statusHint:
      "Remote, full-stack or frontend-leaning roles. English or Portuguese.",
    cta: "Get in touch",
    seeProjects: "See projects",
    avatarHint: "Move your mouse to make me look. Click to wave.",
    yearsLabel: "years shipping",
    incidentsLabel: "production incidents fixed",
    regionsLabel: "regions served",
  },
  experience: {
    present: "Present",
    highlights: "Highlights",
    stack: "Stack",
  },
  projects: {
    all: "All",
    featured: "Featured",
    filterLabel: "Filter by tag",
    noLink: "No public link",
    open: "Open",
    details: "Details",
    status: {
      live: "In production",
      archived: "Archived",
      wip: "In progress",
    },
    empty: "No projects match that tag.",
    links: "Links",
  },
  skills: {
    intro:
      "Grouped by where I use them day to day. Bolder chips are the ones I reach for most.",
  },
  contact: {
    heading: "Let's talk",
    body: "I'm open to new opportunities. Email is the fastest way to reach me. I usually reply within a day.",
    email: "Email",
    linkedin: "LinkedIn",
    github: "GitHub",
    cv: "CV (PDF)",
    copy: "Copy email",
    copied: "Copied",
    languages: "Languages",
    portuguese: "Portuguese, native",
    english: "English, fluent (C1)",
  },
  terminal: {
    welcome: "jonathan-os 1.0 · type `help` to see commands",
    help: "Commands: help, whoami, ls, open <section>, lang <en|pt>, theme <light|dark>, clear",
    unknown: "Unknown command: {cmd}. Try `help`.",
    opened: "Opened {name}",
    notFound: "No section called {name}",
    langSet: "Language set to {lang}",
    themeSet: "Theme set to {theme}",
    prompt: "guest@jonathan-os",
  },
  mobile: {
    homeHint: "Tap a section to open it",
  },
} as const;

type Widen<T> = T extends string ? string : { [K in keyof T]: Widen<T[K]> };

export type Messages = Widen<typeof en>;
