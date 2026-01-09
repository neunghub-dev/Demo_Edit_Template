"use client";

import Image from "next/image";
import { Block } from "./types";

export function BlockRenderer({
  block,
  selected,
  onClick,
}: {
  block: Block;
  selected: boolean;
  onClick: () => void;
}) {
  const ring = selected
    ? "ring-2 ring-emerald-500"
    : "ring-1 ring-black/10 hover:ring-black/20";

  if (block.type === "hero") {
    return (
      <section
        onClick={onClick}
        className={`relative overflow-hidden rounded-2xl bg-black ${ring} cursor-pointer`}
      >
        <div className="relative h-[420px] w-full">
          <Image src={block.backgroundUrl} alt="Hero background" fill className="object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: `rgba(0,0,0,${block.overlayOpacity})` }}
          />
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            <div className="max-w-3xl text-white">
              <p className="mb-4 text-xs tracking-[0.35em] text-white/85">WELCOME TO PARADISE</p>
              <h1 className="font-serif text-4xl leading-tight md:text-6xl">{block.heading}</h1>
              <p className="mt-5 text-sm leading-6 text-white/85 md:text-base">{block.subheading}</p>
              <div className="mt-8">
                <button className="rounded-md bg-white px-6 py-3 text-sm font-medium text-neutral-900">
                  {block.ctaLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (block.type === "heading") {
    return (
      <div onClick={onClick} className={`rounded-2xl bg-white p-6 ${ring} cursor-pointer`}>
        <h2 className="font-serif text-3xl md:text-4xl">{block.text}</h2>
      </div>
    );
  }

  if (block.type === "text") {
    return (
      <div onClick={onClick} className={`rounded-2xl bg-white p-6 ${ring} cursor-pointer`}>
        <p className="text-sm text-neutral-600 md:text-base">{block.text}</p>
      </div>
    );
  }

  if (block.type === "button") {
    return (
      <div onClick={onClick} className={`rounded-2xl bg-white p-6 ${ring} cursor-pointer`}>
        <a
          href={block.href}
          onClick={(e) => e.preventDefault()}
          className="inline-flex rounded-md bg-neutral-900 px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800"
        >
          {block.label}
        </a>
      </div>
    );
  }

  return (
    <div onClick={onClick} className={`overflow-hidden rounded-2xl bg-white ${ring} cursor-pointer`}>
      <div className="relative h-64 w-full">
        <Image src={block.url} alt={block.alt} fill className="object-cover" />
      </div>
      <div className="p-4 text-sm text-neutral-600">{block.alt}</div>
    </div>
  );
}
