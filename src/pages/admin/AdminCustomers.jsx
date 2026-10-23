import { useState } from 'react'
import { useAdmin } from '../../hooks/useAdmin'
import { formatDate, formatPrice } from '../../utils/format'
import Modal from '../../components/admin/Modal'
import SearchInput from '../../components/admin/SearchInput'
import StatusBadge from '../../components/admin/StatusBadge'

const initials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)

export default function AdminCustomers() {
  const { customers, orders } = useAdmin()
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null)

  const rows = customers.map((c) => {
    const customerOrders = orders.filter((o) => o.customerId === c.id)
    const spent = customerOrders.filter((o) => o.status !== 'Cancelled').reduce((sum, o) => sum + o.total, 0)
    return { ...c, orders: customerOrders, spent, lastOrder: customerOrders[0]?.date }
  })

  const q = query.trim().toLowerCase()
  const visible = rows.filter(
    (c) => !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.city.toLowerCase().includes(q),
  )
  const selected = rows.find((c) => c.id === selectedId)

  return (
    <div className="space-y-4">
      <SearchInput value={query} onChange={setQuery} placeholder="Search name, email or city" />

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">City</th>
              <th className="px-5 py-3 font-medium">Joined</th>
              <th className="px-5 py-3 text-right font-medium">Orders</th>
              <th className="px-5 py-3 text-right font-medium">Total spent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {visible.map((c) => (
              <tr key={c.id} onClick={() => setSelectedId(c.id)} className="cursor-pointer hover:bg-slate-50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                      {initials(c.name)}
                    </span>
                    <div>
                      <p className="font-medium">{c.name}</p>
                      <p className="text-xs text-slate-500">{c.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3">{c.city}</td>
                <td className="px-5 py-3 text-slate-500">{formatDate(c.joined)}</td>
                <td className="px-5 py-3 text-right tabular-nums">{c.orders.length}</td>
                <td className="px-5 py-3 text-right tabular-nums">{formatPrice(c.spent)}</td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-slate-500">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <Modal title={selected.name} onClose={() => setSelectedId(null)}>
          <p className="text-sm text-slate-500">
            {selected.email} · {selected.city} · Joined {formatDate(selected.joined)}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Orders</p>
              <p className="text-lg font-semibold">{selected.orders.length}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Total spent</p>
              <p className="text-lg font-semibold">{formatPrice(selected.spent)}</p>
            </div>
          </div>
          <h3 className="mt-5 text-sm font-semibold">Order history</h3>
          {selected.orders.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500">No orders yet.</p>
          ) : (
            <ul className="mt-2 divide-y divide-slate-100">
              {selected.orders.map((o) => (
                <li key={o.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                  <div>
                    <p className="font-medium">{o.id}</p>
                    <p className="text-xs text-slate-500">{formatDate(o.date)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={o.status} />
                    <span className="tabular-nums">{formatPrice(o.total)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Modal>
      )}
    </div>
  )
}
