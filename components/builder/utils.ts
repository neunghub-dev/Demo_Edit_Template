import { Block, BlockType } from "./types";

export function uid(prefix = "blk") {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

export function createBlock(type: BlockType): Block {
  const id = uid(type);
  switch (type) {
    case "hero":
      return {
        id,
        type: "hero",
        heading: "Experience Luxury Like Never Before",
        subheading:
          "Discover a sanctuary of peace and elegance in the heart of nature. Your perfect getaway awaits.",
        ctaLabel: "Book Your Stay",
        ctaHref: "#rooms",
        backgroundUrl:
          "https://images.unsplash.com/photo-1501117716987-c8e1ecb210d1?auto=format&fit=crop&w=2200&q=80",
        overlayOpacity: 0.35,
      };
    case "heading":
      return { id, type: "heading", text: "Our Suites" };
    case "text":
      return { id, type: "text", text: "Handpicked comfort for your ultimate relaxation" };
    case "button":
      return { id, type: "button", label: "View Rooms", href: "#rooms" };
    case "image":
      return {
        id,
        type: "image",
        url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
        alt: "Room",
      };
  }
}
