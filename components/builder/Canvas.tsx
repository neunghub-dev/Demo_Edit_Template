"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Block } from "./types";
import { BlockRenderer } from "./blocks";

function SortableBlock({
  block,
  selected,
  onSelect,
}: {
  block: Block;
  selected: boolean;
  onSelect: () => void;
}) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: block.id,
    data: { kind: "block", blockId: block.id },
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-manipulation">
      <BlockRenderer block={block} selected={selected} onClick={onSelect} />
    </div>
  );
}

export default function Canvas({
  blocks,
  selectedId,
  onSelect,
}: {
  blocks: Block[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-dropzone",
    data: { kind: "canvas" },
  });

  return (
    <section className="flex-1">
      <div className="sticky top-0 z-10 border-b bg-neutral-50/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div className="text-sm font-semibold">Canvas</div>
          <div className="text-xs text-neutral-500">Drag to reorder • Drop from Elements to add</div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-6">
        <div
          ref={setNodeRef}
          className={[
            "rounded-2xl border-2 border-dashed p-4",
            isOver ? "border-emerald-400 bg-emerald-50" : "border-black/10 bg-white",
          ].join(" ")}
        >
          {blocks.length === 0 ? (
            <div className="rounded-xl bg-neutral-50 p-8 text-center text-sm text-neutral-600">
              วาง element ที่นี่เพื่อเริ่มสร้างหน้า
            </div>
          ) : (
            <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
              <div className="grid gap-4">
                {blocks.map((b) => (
                  <SortableBlock
                    key={b.id}
                    block={b}
                    selected={selectedId === b.id}
                    onSelect={() => onSelect(b.id)}
                  />
                ))}
              </div>
            </SortableContext>
          )}
        </div>
      </div>
    </section>
  );
}
