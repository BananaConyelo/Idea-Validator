import { Pencil, Trash2 } from 'lucide-react'
import type { Item } from '../types'

interface ItemCardProps {
  item: Item
  onEdit: (item: Item) => void
  onDelete: (id: number) => void
}

export function ItemCard({ item, onEdit, onDelete }: ItemCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="group bg-card rounded-xl border border-border p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-card-foreground truncate">
            {item.name}
          </h3>
          <p className="mt-2 text-muted-foreground line-clamp-2">
            {item.description}
          </p>
          <p className="mt-4 text-xs text-muted">
            Created {formatDate(item.created_at)}
          </p>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(item)}
            className="p-2 rounded-lg bg-secondary hover:bg-primary text-secondary-foreground hover:text-primary-foreground transition-colors"
            aria-label="Edit item"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-2 rounded-lg bg-secondary hover:bg-destructive text-secondary-foreground hover:text-destructive-foreground transition-colors"
            aria-label="Delete item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
