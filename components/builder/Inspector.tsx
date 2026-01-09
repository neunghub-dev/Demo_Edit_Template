"use client";

import { Block } from "./types";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-medium text-neutral-700">{label}</span>
      {children}
    </label>
  );
}

export default function Inspector({
  block,
  onChange,
  onDelete,
}: {
  block: Block | null;
  onChange: (patch: Partial<Block>) => void;
  onDelete: () => void;
}) {
  return (
    <aside className="w-[320px] shrink-0 border-l bg-white">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Inspector</div>
          <button
            onClick={onDelete}
            disabled={!block}
            className="rounded-md border px-3 py-1.5 text-xs font-medium disabled:opacity-40"
          >
            Delete
          </button>
        </div>

        {!block ? (
          <div className="mt-4 rounded-xl bg-neutral-50 p-3 text-sm text-neutral-600">
            คลิก element ใน canvas เพื่อแก้ไข
          </div>
        ) : (
          <div className="mt-4 grid gap-3">
            <div className="rounded-xl border bg-neutral-50 p-3 text-xs text-neutral-600">
              <div className="font-semibold text-neutral-800">Selected:</div>
              <div className="mt-1">{block.type}</div>
            </div>

            {block.type === "hero" && (
              <>
                <Field label="Heading">
                  <input
                    className="rounded-md border px-3 py-2 text-sm"
                    value={block.heading}
                    onChange={(e) => onChange({ heading: e.target.value } as Partial<Block>)}
                  />
                </Field>
                <Field label="Subheading">
                  <textarea
                    className="min-h-[90px] rounded-md border px-3 py-2 text-sm"
                    value={block.subheading}
                    onChange={(e) => onChange({ subheading: e.target.value } as Partial<Block>)}
                  />
                </Field>
                <Field label="CTA Label">
                  <input
                    className="rounded-md border px-3 py-2 text-sm"
                    value={block.ctaLabel}
                    onChange={(e) => onChange({ ctaLabel: e.target.value } as Partial<Block>)}
                  />
                </Field>
                <Field label="CTA Href">
                  <input
                    className="rounded-md border px-3 py-2 text-sm"
                    value={block.ctaHref}
                    onChange={(e) => onChange({ ctaHref: e.target.value } as Partial<Block>)}
                  />
                </Field>
                <Field label="Background URL">
                  <input
                    className="rounded-md border px-3 py-2 text-sm"
                    value={block.backgroundUrl}
                    onChange={(e) => onChange({ backgroundUrl: e.target.value } as Partial<Block>)}
                  />
                </Field>
                <Field label={`Overlay Opacity (${Math.round(block.overlayOpacity * 100)}%)`}>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={block.overlayOpacity}
                    onChange={(e) =>
                      onChange({ overlayOpacity: Number(e.target.value) } as Partial<Block>)
                    }
                  />
                </Field>
              </>
            )}

            {block.type === "heading" && (
              <Field label="Text">
                <input
                  className="rounded-md border px-3 py-2 text-sm"
                  value={block.text}
                  onChange={(e) => onChange({ text: e.target.value } as Partial<Block>)}
                />
              </Field>
            )}

            {block.type === "text" && (
              <Field label="Text">
                <textarea
                  className="min-h-[110px] rounded-md border px-3 py-2 text-sm"
                  value={block.text}
                  onChange={(e) => onChange({ text: e.target.value } as Partial<Block>)}
                />
              </Field>
            )}

            {block.type === "button" && (
              <>
                <Field label="Label">
                  <input
                    className="rounded-md border px-3 py-2 text-sm"
                    value={block.label}
                    onChange={(e) => onChange({ label: e.target.value } as Partial<Block>)}
                  />
                </Field>
                <Field label="Href">
                  <input
                    className="rounded-md border px-3 py-2 text-sm"
                    value={block.href}
                    onChange={(e) => onChange({ href: e.target.value } as Partial<Block>)}
                  />
                </Field>
              </>
            )}

            {block.type === "image" && (
              <>
                <Field label="Image URL">
                  <input
                    className="rounded-md border px-3 py-2 text-sm"
                    value={block.url}
                    onChange={(e) => onChange({ url: e.target.value } as Partial<Block>)}
                  />
                </Field>
                <Field label="Alt">
                  <input
                    className="rounded-md border px-3 py-2 text-sm"
                    value={block.alt}
                    onChange={(e) => onChange({ alt: e.target.value } as Partial<Block>)}
                  />
                </Field>
              </>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
