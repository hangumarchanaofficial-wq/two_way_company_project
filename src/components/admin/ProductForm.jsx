import { useState } from 'react'
import { PRODUCT_CATEGORIES } from '../../data/adminData'

const empty = { name: '', category: PRODUCT_CATEGORIES[0], price: '', stock: '', sku: '' }

const inputClass =
  'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20'

export default function ProductForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial ?? empty)
  const [error, setError] = useState('')

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const price = Number(form.price)
    const stock = Number(form.stock)
    if (!form.name.trim() || !form.sku.trim()) return setError('Name and SKU are required.')
    if (!(price > 0)) return setError('Price must be more than 0.')
    if (!Number.isInteger(stock) || stock < 0) return setError('Stock must be a whole number, 0 or more.')
    onSubmit({ ...form, name: form.name.trim(), sku: form.sku.trim(), price, stock })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-sm font-medium text-slate-700">
        Product name
        <input className={inputClass} value={form.name} onChange={set('name')} autoFocus />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Category
          <select className={inputClass} value={form.category} onChange={set('category')}>
            {PRODUCT_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-slate-700">
          SKU
          <input className={inputClass} value={form.sku} onChange={set('sku')} />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Price (LKR)
          <input className={inputClass} type="number" min="0" value={form.price} onChange={set('price')} />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Stock
          <input className={inputClass} type="number" min="0" step="1" value={form.stock} onChange={set('stock')} />
        </label>
      </div>
      {error && <p className="text-sm text-rose-600">{error}</p>}
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
          Cancel
        </button>
        <button type="submit" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
          {initial ? 'Save changes' : 'Add product'}
        </button>
      </div>
    </form>
  )
}
