"use client"

import { MaterialCard } from "./material-card"

interface MaterialListProps {
  items: any[]
  type: "workouts" | "nutrition" | "blog"
  onDelete: (id: string) => Promise<void>
}

export function MaterialList({ items, type, onDelete }: MaterialListProps) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <MaterialCard
          key={item.id}
          id={item.id}
          title={item.title}
          type={type}
          category={item.category?.name}
          level={item.level}
          user={item.user}
          createdAt={item.createdAt}
          isFree={item.isFree}
          onDelete={() => onDelete(item.id)}
        />
      ))}
    </div>
  )
} 