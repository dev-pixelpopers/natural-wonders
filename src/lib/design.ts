/**
 * Helpers for translating Figma pixel geometry into fluid CSS.
 *
 * Composites that must keep their exact Figma proportions (brand cards,
 * testimonial cards, the "why brands" fan) are sized in container query
 * units relative to their design width, so they scale down as one piece.
 */

/** Converts a Figma pixel value to `cqw` against a design width. */
export const cq = (px: number, base: number) =>
  `${+((px / base) * 100).toFixed(4)}cqw`;

/** Converts a Figma pixel value to a percentage of a reference size. */
export const pct = (px: number, base: number) =>
  `${+((px / base) * 100).toFixed(4)}%`;

const IMAGES = "/assets/images";
export const img = (file: string) => `${IMAGES}/${file}`;
