"use client";

import { useDraggable } from "@dnd-kit/core";
import { PaletteItem } from "./types";

function PaletteDraggable({ item }: { item: PaletteItem }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette:${item.type}`,
    data: { kind: "palette", blockType: item.type },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={[
        "rounded-xl border bg-white p-3 shadow-sm",
        "cursor-grab active:cursor-grabbing",
        "hover:border-black/20",
        isDragging ? "opacity-60" : "",
      ].join(" ")}
    >
      <div className="text-sm font-semibold">{item.title}</div>
      <div className="mt-1 text-xs text-neutral-500">{item.hint}</div>
    </div>
  );
}

export default function Palette({ items }: { items: PaletteItem[] }) {
  return (
    <aside className="w-[280px] shrink-0 border-r bg-white">
      <div className="p-4">
        <div className="text-sm font-semibold">Elements</div>
        <div className="mt-3 grid gap-2">
          {items.map((it) => (
            <PaletteDraggable key={it.type} item={it} />
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-neutral-50 p-3 text-xs text-neutral-600">
          ลาก element จากด้านซ้ายมาวางใน Canvas ตรงกลางได้เลย
        </div>
      </div>
    </aside>
  );
}
