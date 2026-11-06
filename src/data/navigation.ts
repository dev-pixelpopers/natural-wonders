export type NavLink = { label: string; href: string };

/** Primary site pages, in menu order. */
export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Brands", href: "/brands" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Products", href: "/products" },
  { label: "Private Label", href: "/private-label" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

/** Footer columns, as laid out in Figma. */
export const footerNav: NavLink[][] = [
  [
    { label: "About Us", href: "/about" },
    { label: "Our Brands", href: "/brands" },
    { label: "Capabilities", href: "/capabilities" },
    { label: "Products", href: "/products" },
  ],
  [
    { label: "Private Label", href: "/private-label" },
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ],
];

export const legalNav: NavLink[] = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Returns", href: "/returns" },
];
