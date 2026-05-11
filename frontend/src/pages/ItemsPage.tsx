import { useState, useEffect, useCallback } from 'react'
import { Plus, RefreshCw, AlertCircle, Package } from 'lucide-react'
import { itemsApi } from '../services/api'
import { ItemCard } from '../components/ItemCard'
import { ItemForm } from '../components/ItemForm'
import type { Item, CreateItemData } from '../types'

export function ItemsPage() {
  const [items, setItems] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<Item | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchItems = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await itemsApi.getAll()
      setItems(data)
    } catch (err) {
      setError('Failed to load items. Make sure the Django server is running on port 8000.')
      console.error('Error fetching items:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const handleCreate = async (data: CreateItemData) => {
    setIsSubmitting(true)
    try {
      const newItem = await itemsApi.create(data)
      setItems((prev) => [newItem, ...prev])
      setShowForm(false)
    } catch (err) {
      console.error('Error creating item:', err)
      alert('Failed to create item')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdate = async (data: CreateItemData) => {
    if (!editingItem) return
    setIsSubmitting(true)
    try {
      const updatedItem = await itemsApi.update(editingItem.id, data)
      setItems((prev) =>
        prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      )
      setEditingItem(null)
    } catch (err) {
      console.error('Error updating item:', err)
      alert('Failed to update item')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return
    try {
      await itemsApi.delete(id)
      setItems((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      console.error('Error deleting item:', err)
      alert('Failed to delete item')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Items</h1>
          <p className="text-muted-foreground mt-1">
            Manage your items with full CRUD operations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchItems}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive mb-6">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="w-8 h-8 text-primary animate-spin" />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Package className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No items yet
          </h3>
          <p className="text-muted-foreground mb-6 max-w-sm">
            Get started by creating your first item. It will appear here.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create First Item
          </button>
        </div>
      )}

      {/* Items Grid */}
      {!isLoading && !error && items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onEdit={setEditingItem}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Create Form Modal */}
      {showForm && (
        <ItemForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
          isLoading={isSubmitting}
        />
      )}

      {/* Edit Form Modal */}
      {editingItem && (
        <ItemForm
          item={editingItem}
          onSubmit={handleUpdate}
          onCancel={() => setEditingItem(null)}
          isLoading={isSubmitting}
        />
      )}
    </div>
  )
}
