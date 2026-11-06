import { img } from "@/lib/design";

/** A photo layer inside a brand card, in Figma px relative to the 1023×558 card. */
export type CardLayer = {
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  rotate?: number;
  flipX?: boolean;
};

export type Brand = {
  name: string;
  /** URL segment for the brand's detail page. */
  slug: string;
  /** Title lines as set in Figma. */
  titleLines: string[];
  description: string;
  /** Paragraph width in the 1023px card. */
  descriptionWidth: number;
  /** Photo layers, bottom to top. */
  layers: CardLayer[];
  shadow: string;
};

/**
 * The three overlapping cards in the Figma `Brands` layer (318:59), back to front.
 * Layers hidden entirely under another layer in Figma are left out.
 */
export const brands: Brand[] = [
  {
    name: "Natural Wunderz",
    slug: "natural-wunderz",
    titleLines: ["Natural", "Wunderz"],
    description:
      "Approachable care for the ingredient-conscious shopper. Natural Wunderz makes everyday beauty feel enjoyable and uncomplicated, with a down-to-earth personality rooted in familiar ingredients and everyday wellbeing.",
    descriptionWidth: 429,
    layers: [
      {
        src: img("brand-natural-wunderz.jpg"),
        left: -2,
        top: -37.8,
        width: 1165.68,
        height: 650.61,
        rotate: -0.35,
      },
    ],
    shadow: "0 4px 250px rgba(0,0,0,0.08)",
  },
  {
    name: "Gentlemen Supply",
    slug: "gentlemen-supply",
    titleLines: ["Gentlemen", "Supply"],
    description:
      "Confident care for men who appreciate a straightforward approach to grooming. Gentleman Supply brings a confident, understated character to daily rituals, with an uncomplicated approach to feeling well cared for.",
    descriptionWidth: 365,
    layers: [
      {
        src: img("brand-gentlemen-supply.jpg"),
        left: 213.04,
        top: -17,
        width: 825,
        height: 616,
      },
      {
        src: img("brand-gentlemen-supply.jpg"),
        left: -610.96,
        top: -17,
        width: 825,
        height: 616,
        flipX: true,
      },
    ],
    shadow: "0 4px 250px rgba(0,0,0,0.54)",
  },
  {
    name: "Juice Day",
    slug: "juice-day",
    titleLines: ["Juice", "Day"],
    description:
      "An upbeat take on body care for people drawn to freshness, fun and a little everyday escapism. Juice Day channels a fruit-inspired personality that makes caring for yourself feel lighthearted and full of possibility.",
    descriptionWidth: 334,
    layers: [
      {
        src: img("brand-juice-day.png"),
        left: -963,
        top: 0,
        width: 1023,
        height: 558,
        flipX: true,
      },
      {
        src: img("brand-juice-day.png"),
        left: 60,
        top: 0,
        width: 1023,
        height: 558,
      },
    ],
    shadow: "0 4px 250px rgba(0,0,0,0.54)",
  },
];

export type Category = {
  title: string;
  /** Anchor id on the products page. */
  slug: string;
  description: string;
  descriptionWidth: number;
  image: string;
  /** Image crop inside the photo frame, as CSS percentages from Figma. */
  crop: { left: string; top: string; width: string; height: string };
};

export const categories: Category[] = [
  {
    title: "Body & Bath",
    slug: "body-bath",
    description:
      "Body washes, exfoliating washes, lotions and oils designed to make daily body care feel more personal.",
    descriptionWidth: 271,
    image: img("category-body-bath.jpg"),
    crop: { left: "-145.42%", top: "-0.03%", width: "278.59%", height: "100.06%" },
  },
  {
    title: "Hair Care",
    slug: "hair-care",
    description:
      "Shampoos, conditioners and treatments that bring a clear point of view to everyday hair-care routines.",
    descriptionWidth: 266,
    image: img("category-hair-care.jpg"),
    crop: { left: "-117.4%", top: "-2.73%", width: "218.24%", height: "105.45%" },
  },
  {
    title: "Men's Grooming",
    slug: "mens-grooming",
    description:
      "Hair and body essentials presented through brands created specifically for men’s everyday needs.",
    descriptionWidth: 261,
    image: img("category-mens-grooming.jpg"),
    crop: { left: "-116.22%", top: "-5.57%", width: "331.58%", height: "116.88%" },
  },
  {
    title: "Skin Care",
    slug: "skin-care",
    description:
      "Focused skin-care products built around thoughtful ingredients and easy-to-understand routines.",
    descriptionWidth: 261,
    image: img("category-skin-care.jpg"),
    crop: { left: "-130.32%", top: "0%", width: "284.17%", height: "100.01%" },
  },
  {
    title: "Fragrance Mists",
    slug: "fragrance-mists",
    description:
      "Fine fragrance mists with juicy, fruit-forward scents that layer easily over everyday body care.",
    descriptionWidth: 266,
    image: img("brand-juice-day.png"),
    crop: { left: "-129.2%", top: "0%", width: "293.7%", height: "100%" },
  },
  {
    title: "Lotions & Butters",
    slug: "lotions-butters",
    description:
      "Nourishing lotions and body butters with familiar ingredients like mango, shea and oat milk.",
    descriptionWidth: 266,
    image: img("portfolio-mango.jpg"),
    crop: { left: "-93.5%", top: "0%", width: "287.1%", height: "100%" },
  },
];

/**
 * Portfolio gallery tiles. Each Figma tile is a photo box masked to a window;
 * `box` is the photo size and `window` the visible area offset inside it.
 */
export type PortfolioTile = {
  src: string;
  alt: string;
  box: { width: number; height: number };
  window: { x: number; y: number; width: number; height: number };
};

const tile = (
  file: string,
  alt: string,
  box: [number, number],
  window: [number, number, number, number],
): PortfolioTile => ({
  src: img(file),
  alt,
  box: { width: box[0], height: box[1] },
  window: { x: window[0], y: window[1], width: window[2], height: window[3] },
});

export const portfolioTiles: PortfolioTile[] = [
  tile("portfolio-papaya-wash.jpg", "Papaya and shea butter body wash", [602, 336], [218, 4, 166, 331]),
  tile("portfolio-passion-fruit.jpg", "Passion fruit exfoliating wash", [601, 336], [220, 4, 166, 331]),
  tile("portfolio-guava-wash.jpg", "Guava exfoliating wash", [596, 333], [220, 0, 165, 331]),
  tile("portfolio-featured.jpg", "Guava and coconut milk body lotion on white stone", [859, 480], [116, 0, 627, 480]),
  tile("portfolio-mango.jpg", "Mango and oat milk body lotion", [608, 340], [224, 0, 165, 331]),
  tile("portfolio-papaya-lotion.jpg", "Papaya and shea butter body lotion", [608, 339], [223, 4, 166, 331]),
  tile("portfolio-guava-lotion.jpg", "Guava cream body wash", [594, 331], [213, 0, 166, 331]),
];

export const portfolioFilters = [
  { label: "Juice Day", active: false },
  { label: "Black Label", active: false },
  { label: "Gentle Men Supply", active: false },
  { label: "Natural Wunderz", active: true },
  { label: "Root Theory", active: false },
  { label: "Suzu", active: false },
];

/** "Why brands" fan, left to right. Offsets are from the centre card, in Figma px. */
export const pillars = [
  { label: "Thoughtful Products. Accessible Prices.", icon: img("icon-accessible-prices.png"), x: -647, y: 173, rotate: -29.21, labelWidth: 228, size: 25 },
  { label: "Formula & Fragrance Expertise", icon: img("icon-formula.png"), x: -330, y: 41, rotate: -15, labelWidth: 228, size: 25 },
  { label: "Manufacturers Behind the Brands", icon: img("icon-manufacturing.png"), x: 0, y: 0, rotate: 0, labelWidth: 235, size: 30 },
  { label: "Brands With a Clear Point of View", icon: img("icon-clear-pov.png"), x: 330, y: 41, rotate: 15, labelWidth: 184, size: 25 },
  { label: "Fastest to Market", icon: img("icon-fastest-market.png"), x: 648, y: 177, rotate: 30, labelWidth: 141, size: 25 },
];

/** Retailer logos: white silhouettes, sizes and vertical offsets from Figma. */
export const retailers = [
  { name: "HomeGoods", src: img("retailer-homegoods.png"), width: 240.3, height: 82.8, offset: 7.2 },
  { name: "Marshalls", src: img("retailer-marshalls.png"), width: 277.2, height: 73.2, offset: 12 },
  { name: "T.J.Maxx", src: img("retailer-tjmaxx.png"), width: 269.5, height: 73.2, offset: 12 },
  { name: "Bealls", src: img("retailer-bealls.png"), width: 206.3, height: 73.2, offset: 12 },
  { name: "Amazon", src: img("retailer-amazon.png"), width: 293.5, height: 73.2, offset: 12 },
  { name: "Burlington", src: img("retailer-burlington.png"), width: 261.9, height: 73.2, offset: 8.6 },
  { name: "Ross Dress for Less", src: img("retailer-ross.png"), width: 136, height: 58.4, offset: 14.8 },
  { name: "dd's Discounts", src: img("retailer-dds.png"), width: 134.8, height: 76.8, offset: 0 },
];

export const capabilities = [
  "Product strategy",
  "Custom formulation & R&D",
  "Brand design & artwork",
  "Packaging & sourcing",
  "Manufacturing",
  "Quality control",
  "Fulfillment & replenishment",
];

export type Testimonial = {
  quote: string;
  body: string;
  rating: string;
  image: string;
  imageAlt: string;
  /** Product photo frame and crop inside it, in Figma px / CSS percentages. */
  frame: { width: number; height: number; radius: number };
  crop: { left: string; top: string; width: string; height: string };
  /** Card tilt and the product tilt on top of it, in degrees. */
  tilt: number;
  productTilt: number;
  /** Quote mark position in the 756px card. */
  quoteAt: { x: number; y: number };
};

export const testimonials: Testimonial[] = [
  {
    quote: "It's so great! Ima just keep buying this!",
    body: "this is such a nice exfoliating beautiful smelling body wash! I would highly recommend for anybody, please like my comment it helps, sending love to all! ",
    rating: "4.9",
    image: img("testimonial-guava.png"),
    imageAlt: "Natural Wunderz guava and coconut milk body lotion",
    frame: { width: 270.72, height: 663.31, radius: 57 },
    crop: { left: "-324.93%", top: "-9.63%", width: "531.66%", height: "121.05%" },
    tilt: -2,
    productTilt: 6.37,
    quoteAt: { x: 95, y: 49 },
  },
  {
    quote: "It's so great! Ima just keep buying this!",
    body: "this is such a nice exfoliating beautiful smelling body wash! I would highly recommend for anybody, please like my comment it helps, sending love to all! ",
    rating: "4.9",
    image: img("testimonial-gentleman.png"),
    imageAlt: "Gentleman Supply hair and beard oil",
    frame: { width: 249.28, height: 690.32, radius: 60 },
    crop: { left: "-74.18%", top: "-10.22%", width: "246.15%", height: "119.05%" },
    tilt: 2,
    productTilt: 5.74,
    quoteAt: { x: 115, y: 35 },
  },
];

export const socials = [
  { label: "Instagram", icon: img("icon-instagram.png"), href: "#" },
  { label: "Facebook", icon: img("icon-facebook.png"), href: "#" },
  { label: "Tiktok", icon: img("icon-tiktok.png"), href: "#" },
];

export const contact = {
  phone: "630-305-3254",
  email: "info@naturalwunderz.com",
};

/** "Area of interest" options on the contact form; `value` is what the API receives. */
export const interestOptions = [
  { value: "brands", label: "Carrying our brands" },
  { value: "products", label: "Our products" },
  { value: "private-label", label: "Private label" },
  { value: "other", label: "Something else" },
] as const;

export type Interest = (typeof interestOptions)[number]["value"];
