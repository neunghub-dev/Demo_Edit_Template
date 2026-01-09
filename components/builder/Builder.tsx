"use client";

import { useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Palette from "./Palette";
import Canvas from "./Canvas";
import Inspector from "./Inspector";
import { Block, PaletteItem, BlockType } from "./types";
import { createBlock } from "./utils";
import { BlockRenderer } from "./blocks";

const paletteItems: PaletteItem[] = [
  { type: "hero", title: "Hero Banner", hint: "Heading + subheading + CTA" },
  { type: "heading", title: "Heading", hint: "Section title" },
  { type: "text", title: "Text", hint: "Paragraph / caption" },
  { type: "button", title: "Button", hint: "CTA button" },
  { type: "image", title: "Image", hint: "Full-width image card" },
];

export default function Builder() {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const [blocks, setBlocks] = useState<Block[]>([createBlock("hero"), createBlock("heading"), createBlock("text")]);

  const [selectedId, setSelectedId] = useState<string | null>(blocks[0]?.id ?? null);
  const selectedBlock = useMemo(() => blocks.find((b) => b.id === selectedId) ?? null, [blocks, selectedId]);

  const [activeDrag, setActiveDrag] = useState<
    { kind: "palette" | "block"; type?: BlockType; blockId?: string } | null
  >(null);

  function onDragStart(e: DragStartEvent) {
    const data = e.active.data.current as any;
    if (!data) return;

    if (data.kind === "palette") {
      setActiveDrag({ kind: "palette", type: data.blockType as BlockType });
    } else if (data.kind === "block") {
      setActiveDrag({ kind: "block", blockId: data.blockId as string });
    }
  }

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    setActiveDrag(null);
    if (!over) return;

    const activeData = active.data.current as any;
    const overId = String(over.id);

    // palette -> canvas: add new
    if (activeData?.kind === "palette") {
      if (overId === "canvas-dropzone") {
        const type = activeData.blockType as BlockType;
        const newBlock = createBlock(type);
        setBlocks((prev) => [...prev, newBlock]);
        setSelectedId(newBlock.id);
      }
      return;
    }

    // reorder blocks
    if (activeData?.kind === "block") {
      const activeId = String(active.id);
      const overBlockId = overId;

      if (activeId !== overBlockId && blocks.some((b) => b.id === overBlockId)) {
        const oldIndex = blocks.findIndex((b) => b.id === activeId);
        const newIndex = blocks.findIndex((b) => b.id === overBlockId);
        if (oldIndex !== -1 && newIndex !== -1) {
          setBlocks((prev) => arrayMove(prev, oldIndex, newIndex));
        }
      }
    }
  }

  function patchSelected(patch: Partial<Block>) {
    if (!selectedId) return;
    setBlocks((prev) => prev.map((b) => (b.id === selectedId ? ({ ...b, ...patch } as Block) : b)));
  }

  function deleteSelected() {
    if (!selectedId) return;
    setBlocks((prev) => {
      const next = prev.filter((b) => b.id !== selectedId);
      setSelectedId(next[0]?.id ?? null);
      return next;
    });
  }

  const overlayPreviewBlock: Block | null = useMemo(() => {
    if (!activeDrag) return null;
    if (activeDrag.kind === "palette" && activeDrag.type) return createBlock(activeDrag.type);
    if (activeDrag.kind === "block" && activeDrag.blockId)
      return blocks.find((b) => b.id === activeDrag.blockId) ?? null;
    return null;
  }, [activeDrag, blocks]);

  return (
    <div className="min-h-screen">
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="text-sm font-semibold">Stay Builder</div>
          <div className="text-xs text-neutral-500">Next.js + TS • Drag & Drop Builder</div>
        </div>
      </div>

      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="mx-auto flex max-w-7xl">
          <Palette items={paletteItems} />

          <div className="flex-1">
            <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
              <Canvas blocks={blocks} selectedId={selectedId} onSelect={setSelectedId} />
            </SortableContext>
          </div>

          <Inspector block={selectedBlock} onChange={patchSelected} onDelete={deleteSelected} />
        </div>

        <DragOverlay>
          {overlayPreviewBlock ? (
            <div className="w-[680px] max-w-[90vw]">
              <BlockRenderer block={overlayPreviewBlock} selected={false} onClick={() => {}} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
