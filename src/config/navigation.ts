export interface NavItem {
  href: string;
  label: string;
}

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/automations", label: "Automations" },
  { href: "/contact", label: "Contact" },
];

export const socialLinks = {
  linkedin: "https://www.linkedin.com/company/gigglebyte",
  twitter: "https://x.com/gigglebyte",
} as const;

export const contactInfo = {
  email: "nerijus@gigglebyte.ltd",
  phone: "+37065643244",
} as const;
