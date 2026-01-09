export type BlockType = "hero" | "heading" | "text" | "button" | "image";

export type BlockBase = {
  id: string;
  type: BlockType;
};

export type HeroBlock = BlockBase & {
  type: "hero";
  heading: string;
  subheading: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundUrl: string;
  overlayOpacity: number; // 0..1
};

export type HeadingBlock = BlockBase & {
  type: "heading";
  text: string;
};

export type TextBlock = BlockBase & {
  type: "text";
  text: string;
};

export type ButtonBlock = BlockBase & {
  type: "button";
  label: string;
  href: string;
};

export type ImageBlock = BlockBase & {
  type: "image";
  url: string;
  alt: string;
};

export type Block = HeroBlock | HeadingBlock | TextBlock | ButtonBlock | ImageBlock;

export type PaletteItem = {
  type: BlockType;
  title: string;
  hint: string;
};
