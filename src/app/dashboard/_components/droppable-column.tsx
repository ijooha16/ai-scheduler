"use client";
import { useDroppable } from "@dnd-kit/core";
import { PropsWithChildren } from "react";

export function DroppableColumn({
  step,
  children,
}: PropsWithChildren<{ step: string }>) {
  const { setNodeRef, isOver } = useDroppable({ id: `col:${step}` });

  return (
    <div
      ref={setNodeRef}
      className={`flex w-full flex-col gap-2 rounded-lg p-2 transition
        ${isOver ? "bg-slate-50 ring-2 ring-slate-200" : ""}`}
    >
      {children}
      <div className="min-h-16" />
    </div>
  );
}