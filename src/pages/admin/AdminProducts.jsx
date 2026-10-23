import { useState } from 'react'
import { PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useAdmin } from '../../hooks/useAdmin'
import { LOW_STOCK_LIMIT, PRODUCT_CATEGORIES } from '../../data/adminData'
import { formatPrice } from '../../utils/format'
import Modal from '../../components/admin/Modal'
import ProductForm from '../../components/admin/ProductForm'
import SearchInput from '../../components/admin/SearchInput'

function StockLabel({ stock }) {
  if (stock === 0) return <span className="font-medium text-rose-700">Out of stock</span>
  if (stock <= LOW_STOCK_LIMIT) return <span className="font-medium text-amber-700">{stock} (low)</span>
  return <span>{stock}</span>
}

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useAdmin()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [editing, setEditing] = useState(null) // null = closed, {} = new, product = edit
  const [deleting, setDeleting] = useState(null)

  const q = query.trim().toLowerCase()
  const visible = products.filter(
    (p) =>
      (category === 'All' || p.category === category) &&
      (!q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)),
  )

  const handleSave = (product) => {
    if (editing?.id) updateProduct({ ...product, id: editing.id })
    else addProduct(product)
    setEditing(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput value={query} onChange={setQuery} placeholder="Search name or SKU" />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          aria-label="Filter by category"
        >
          <option>All</option>
          {PRODUCT_CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setEditing({})}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 sm:ml-auto"
        >
          <PlusIcon className="h-4 w-4" />
          Add product
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3 font-medium">Product</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 text-right font-medium">Price</th>
              <th className="px-5 py-3 text-right font-medium">Stock</th>
              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {visible.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="px-5 py-3">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-slate-500">
                    {p.id} · {p.sku}
                  </p>
                </td>
                <td className="px-5 py-3">{p.category}</td>
                <td className="px-5 py-3 text-right tabular-nums">{formatPrice(p.price)}</td>
                <td className="px-5 py-3 text-right tabular-nums">
                  <StockLabel stock={p.stock} />
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => setEditing(p)}
                      className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                      aria-label={`Edit ${p.name}`}
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleting(p)}
                      className="rounded-md p-1.5 text-slate-500 hover:bg-rose-50 hover:text-rose-700"
                      aria-label={`Delete ${p.name}`}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-slate-500">
                  No products match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-slate-500">
        Showing {visible.length} of {products.length} products
      </p>

      {editing && (
        <Modal title={editing.id ? 'Edit product' : 'Add product'} onClose={() => setEditing(null)}>
          <ProductForm initial={editing.id ? editing : null} onSubmit={handleSave} onCancel={() => setEditing(null)} />
        </Modal>
      )}

      {deleting && (
        <Modal title="Delete product" onClose={() => setDeleting(null)}>
          <p className="text-sm text-slate-600">
            Delete <span className="font-medium text-slate-900">{deleting.name}</span>? This cannot be undone.
          </p>
          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setDeleting(null)}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                deleteProduct(deleting.id)
                setDeleting(null)
              }}
              className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
