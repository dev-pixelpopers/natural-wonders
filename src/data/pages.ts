import { img } from "@/lib/design";

/* ------------------------------------------------------------------ */
/* Brand detail pages                                                  */
/* ------------------------------------------------------------------ */

export type BrandDetail = {
  tagline: string;
  intro: string;
  story: string[];
  /** Which product categories the brand covers. */
  categories: string[];
  highlights: { title: string; body: string }[];
  /** Product photos shown in the gallery. */
  gallery: { src: string; alt: string }[];
  hero: string;
};

export const brandDetails: Record<string, BrandDetail> = {
  "natural-wunderz": {
    tagline: "Familiar ingredients. Everyday wellbeing.",
    intro:
      "Approachable care for the ingredient-conscious shopper, built around fruit, butters and milks people already know and love.",
    story: [
      "Natural Wunderz began with a simple idea: everyday beauty should feel enjoyable and uncomplicated. Every formula starts from familiar ingredients like guava, papaya, mango and coconut milk, paired with textures that make a daily routine feel like a small treat.",
      "The result is a collection of washes, lotions and treatments with a down-to-earth personality, priced to be part of every week rather than saved for special occasions.",
    ],
    categories: ["Body & Bath", "Lotions & Butters", "Hair Care", "Skin Care"],
    highlights: [
      { title: "Fruit-forward formulas", body: "Guava, papaya, passion fruit and mango paired with shea butter, oat and coconut milks." },
      { title: "Sensory first", body: "Fragrances and textures developed in-house to make daily care feel enjoyable." },
      { title: "Everyday pricing", body: "Thoughtful products that sit comfortably in a weekly shopping basket." },
    ],
    gallery: [
      { src: img("portfolio-featured.jpg"), alt: "Guava and coconut milk body lotion on white stone" },
      { src: img("portfolio-papaya-wash.jpg"), alt: "Papaya and shea butter body wash" },
      { src: img("portfolio-passion-fruit.jpg"), alt: "Passion fruit exfoliating wash" },
      { src: img("portfolio-guava-wash.jpg"), alt: "Guava exfoliating wash" },
      { src: img("portfolio-mango.jpg"), alt: "Mango and oat milk body lotion" },
      { src: img("portfolio-papaya-lotion.jpg"), alt: "Papaya and shea butter body lotion" },
    ],
    hero: img("brand-natural-wunderz.jpg"),
  },
  "gentlemen-supply": {
    tagline: "Straightforward grooming, quietly confident.",
    intro:
      "Confident care for men who appreciate a straightforward approach to grooming, from beard oils to everyday hair and body essentials.",
    story: [
      "Gentlemen Supply brings an understated character to daily rituals. The range is built around a few products that do their job well, with warm, woody fragrances and clean, practical packaging.",
      "Every product is developed specifically for men's everyday needs, so the routine stays short and the results stay consistent.",
    ],
    categories: ["Men's Grooming", "Hair Care", "Body & Bath"],
    highlights: [
      { title: "Beard & hair oils", body: "Lightweight conditioning oils that tame, soften and add a subtle finish." },
      { title: "Hair & body essentials", body: "Washes and conditioners that keep the daily routine simple." },
      { title: "Understated design", body: "Dark, refined packaging that looks at home on any shelf." },
    ],
    gallery: [
      { src: img("testimonial-gentleman.png"), alt: "Gentlemen Supply hair and beard oil" },
      { src: img("category-mens-grooming.jpg"), alt: "Gentlemen Supply grooming collection" },
      { src: img("brand-gentlemen-supply.jpg"), alt: "Gentlemen Supply products on a wooden surface" },
    ],
    hero: img("brand-gentlemen-supply.jpg"),
  },
  "juice-day": {
    tagline: "Fresh, fun and a little everyday escapism.",
    intro:
      "An upbeat take on body care for people drawn to freshness, fun and bright fruit-inspired fragrances.",
    story: [
      "Juice Day channels a fruit-stand personality into body care. Bright colours, juicy fragrances and playful names make caring for yourself feel lighthearted and full of possibility.",
      "The collection focuses on body washes, scrubs and lotions that turn an ordinary shower into a small moment of escape.",
    ],
    categories: ["Body & Bath", "Fragrance Mists", "Skin Care"],
    highlights: [
      { title: "Juicy fragrances", body: "Fruit-inspired scents developed to feel bright, fresh and fun." },
      { title: "Colourful by design", body: "Packaging made to stand out and bring energy to the shelf." },
      { title: "Shower-to-skin routine", body: "Washes, scrubs and lotions that layer together." },
    ],
    gallery: [
      { src: img("brand-juice-day.png"), alt: "Juice Day body care collection" },
      { src: img("category-body-bath.jpg"), alt: "Body and bath products" },
      { src: img("category-skin-care.jpg"), alt: "Skin care products" },
    ],
    hero: img("brand-juice-day.png"),
  },
};

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const stats = [
  { value: "30", suffix: "yrs", label: "Manufacturing experience" },
  { value: "5,500", suffix: "+", label: "US retail stores" },
  { value: "6", suffix: "", label: "Core product categories" },
  { value: "6", suffix: "", label: "Brands in our portfolio" },
];

export const values = [
  {
    title: "Thoughtful",
    body: "Every product starts with a clear consumer need and a reason to exist on the shelf.",
  },
  {
    title: "Accessible",
    body: "Quality formulas and considered packaging at prices that fit everyday routines.",
  },
  {
    title: "Integrated",
    body: "Formula, brand and manufacturing under one roof keep the vision connected to the result.",
  },
  {
    title: "Fast",
    body: "An integrated supply chain lets us scale proven products and launch new ones quickly.",
  },
];

export const milestones = [
  { year: "1990s", text: "Our founders begin manufacturing personal-care products in Southern California." },
  { year: "2000s", text: "In-house formulation and fragrance development expand the product range." },
  { year: "2010s", text: "Natural Wunderz launches, followed by a growing family of distinct brands." },
  { year: "Today", text: "Our products reach more than 5,500 US stores through leading off-price and online retailers." },
];

/* ------------------------------------------------------------------ */
/* Capabilities                                                        */
/* ------------------------------------------------------------------ */

export const capabilityDetails = [
  {
    title: "Product strategy",
    body: "We start with the shopper and the shelf: category gaps, price architecture and the story a product needs to tell to earn its place.",
    points: ["Category & trend research", "Price-point planning", "Range architecture"],
  },
  {
    title: "Custom formulation & R&D",
    body: "We develop distinctive, high-performance formulas through thoughtful research, innovation, and a deep understanding of evolving beauty and personal-care needs.",
    points: ["In-house chemists", "Fragrance development", "Stability & compatibility testing"],
  },
  {
    title: "Brand design & artwork",
    body: "From naming and identity to finished artwork, we create brands with a clear point of view and packaging that stands out on shelf.",
    points: ["Naming & identity", "Packaging artwork", "Regulatory copy"],
  },
  {
    title: "Packaging & sourcing",
    body: "Long-standing supplier relationships give us access to quality components and ingredients at competitive costs.",
    points: ["Component sourcing", "Ingredient procurement", "Sustainable options"],
  },
  {
    title: "Manufacturing",
    body: "With 30 years of manufacturing experience, we produce the finished product ourselves, keeping quality and timelines in our hands.",
    points: ["Batching & filling", "Scalable production runs", "Flexible minimums"],
  },
  {
    title: "Quality control",
    body: "Every batch is checked against specification, from raw materials through finished goods, so products perform the same every time.",
    points: ["Raw material testing", "In-process checks", "Finished-goods release"],
  },
  {
    title: "Fulfillment & replenishment",
    body: "We ship to retailers nationwide and keep shelves stocked with dependable replenishment programs.",
    points: ["Retail-ready shipping", "Replenishment planning", "Nationwide distribution"],
  },
];

/* ------------------------------------------------------------------ */
/* Private label                                                       */
/* ------------------------------------------------------------------ */

export const privateLabelSteps = [
  { title: "Discover", body: "Share your concept, customer and target price. We map the opportunity and recommend a direction." },
  { title: "Formulate", body: "Our chemists develop or adapt a formula and fragrance, with samples for your approval." },
  { title: "Design", body: "We create packaging and artwork that fit your brand and meet regulatory requirements." },
  { title: "Manufacture", body: "Production runs in our own facility with quality checks at every step." },
  { title: "Deliver", body: "Retail-ready product ships to your warehouse or direct to stores, with replenishment on demand." },
];

export const privateLabelBenefits = [
  { title: "One partner, concept to shelf", body: "Formula, packaging, production and fulfillment under one roof.", icon: img("icon-manufacturing.png") },
  { title: "Formula & fragrance expertise", body: "A library of proven formulas plus custom development.", icon: img("icon-formula.png") },
  { title: "Fastest to market", body: "Integrated operations shorten timelines from brief to launch.", icon: img("icon-fastest-market.png") },
  { title: "Accessible pricing", body: "Manufacturer-direct costs that leave room for healthy margins.", icon: img("icon-accessible-prices.png") },
];

/* ------------------------------------------------------------------ */
/* Resources                                                           */
/* ------------------------------------------------------------------ */

export const resources = [
  {
    kind: "Guide",
    title: "Planning a private-label launch",
    body: "What to prepare before your first conversation: target customer, price point, volumes and timing.",
    image: img("capabilities-formulation.jpg"),
    href: "/private-label",
    cta: "Explore Private Label",
  },
  {
    kind: "Category insight",
    title: "Why body care keeps growing",
    body: "How sensory formulas and fruit-forward fragrances are reshaping everyday body routines.",
    image: img("category-body-bath.jpg"),
    href: "/products#body-bath",
    cta: "See Body & Bath",
  },
  {
    kind: "Retail",
    title: "Building a range for off-price retail",
    body: "Pack sizes, price architecture and shelf presence for value-driven retailers.",
    image: img("category-hair-care.jpg"),
    href: "/brands",
    cta: "Meet Our Brands",
  },
];

export const faqs = [
  {
    q: "Do you work with retailers who want to carry your brands?",
    a: "Yes. Our brands are carried by leading off-price and online retailers across the US. Get in touch and our team will share line sheets, pricing and availability.",
  },
  {
    q: "What are your minimum order quantities for private label?",
    a: "Minimums depend on the product, packaging and whether we use an existing or custom formula. We will recommend options that fit your launch plans during discovery.",
  },
  {
    q: "How long does it take to develop a new product?",
    a: "Using an existing formula, products can move from approval to shelf in a matter of weeks. Custom formulation and packaging typically add a few months for development and testing.",
  },
  {
    q: "Which categories do you manufacture?",
    a: "We develop across body & bath, hair care, men's grooming, skin care, fragrance mists and lotions & butters, including washes, lotions, oils, shampoos, conditioners and treatments.",
  },
  {
    q: "Where are your products made?",
    a: "Natural Wunderz is a Southern California beauty company. We manufacture our products ourselves, which keeps quality and timelines in our hands.",
  },
  {
    q: "Can you handle fulfillment and replenishment?",
    a: "Yes. We ship retail-ready product nationwide and offer replenishment programs to keep shelves stocked.",
  },
];
