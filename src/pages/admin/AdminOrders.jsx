import { useState } from 'react'
import { useAdmin } from '../../hooks/useAdmin'
import { ORDER_STATUSES } from '../../data/adminData'
import { formatDate, formatPrice } from '../../utils/format'
import Modal from '../../components/admin/Modal'
import SearchInput from '../../components/admin/SearchInput'
import StatusBadge from '../../components/admin/StatusBadge'

export default function AdminOrders() {
  const { orders, getCustomer, updateOrderStatus } = useAdmin()
  const [status, setStatus] = useState('All')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null)

  const q = query.trim().toLowerCase()
  const visible = orders.filter((o) => {
    const customer = getCustomer(o.customerId)
    return (
      (status === 'All' || o.status === status) &&
      (!q || o.id.toLowerCase().includes(q) || customer?.name.toLowerCase().includes(q))
    )
  })
  const countFor = (s) => (s === 'All' ? orders.length : orders.filter((o) => o.status === s).length)
  const selected = orders.find((o) => o.id === selectedId)

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {['All', ...ORDER_STATUSES].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(s)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium ${
              status === s ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100'
            }`}
          >
            {s} <span className="opacity-70">({countFor(s)})</span>
          </button>
        ))}
      </div>

      <SearchInput value={query} onChange={setQuery} placeholder="Search order ID or customer" />

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3 font-medium">Order</th>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Items</th>
              <th className="px-5 py-3 text-right font-medium">Total</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {visible.map((o) => (
              <tr key={o.id} className="hover:bg-slate-50">
                <td className="px-5 py-3">
                  <button type="button" onClick={() => setSelectedId(o.id)} className="font-medium text-emerald-700 hover:underline">
                    {o.id}
                  </button>
                </td>
                <td className="px-5 py-3">{getCustomer(o.customerId)?.name}</td>
                <td className="px-5 py-3 text-slate-500">{formatDate(o.date)}</td>
                <td className="px-5 py-3 text-slate-500">{o.items.reduce((n, i) => n + i.quantity, 0)}</td>
                <td className="px-5 py-3 text-right tabular-nums">{formatPrice(o.total)}</td>
                <td className="px-5 py-3">
                  <select
                    value={o.status}
                    onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                    className="rounded-md border border-slate-300 bg-white px-2 py-1 text-sm"
                    aria-label={`Status for ${o.id}`}
                  >
                    {ORDER_STATUSES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-slate-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <Modal title={`Order ${selected.id}`} onClose={() => setSelectedId(null)}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-medium">{getCustomer(selected.customerId)?.name}</p>
              <p className="text-sm text-slate-500">
                {getCustomer(selected.customerId)?.email} · {getCustomer(selected.customerId)?.city}
              </p>
            </div>
            <StatusBadge status={selected.status} />
          </div>
          <p className="mt-1 text-sm text-slate-500">Placed {formatDate(selected.date)}</p>
          <ul className="mt-4 divide-y divide-slate-100 border-y border-slate-100">
            {selected.items.map((i) => (
              <li key={i.productId} className="flex justify-between gap-3 py-3 text-sm">
                <span>
                  {i.name} <span className="text-slate-500">× {i.quantity}</span>
                </span>
                <span className="tabular-nums">{formatPrice(i.price * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-between text-sm font-semibold">
            <span>Total</span>
            <span className="tabular-nums">{formatPrice(selected.total)}</span>
          </div>
        </Modal>
      )}
    </div>
  )
}
