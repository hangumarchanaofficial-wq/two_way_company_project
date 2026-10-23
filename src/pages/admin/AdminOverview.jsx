import { Link } from 'react-router-dom'
import { BanknotesIcon, ExclamationTriangleIcon, ShoppingBagIcon, UsersIcon } from '@heroicons/react/24/outline'
import { useAdmin } from '../../hooks/useAdmin'
import { LOW_STOCK_LIMIT, monthlyRevenue } from '../../data/adminData'
import { formatDate, formatPrice } from '../../utils/format'
import StatCard from '../../components/admin/StatCard'
import StatusBadge from '../../components/admin/StatusBadge'
import RevenueChart from '../../components/admin/RevenueChart'

export default function AdminOverview() {
  const { products, orders, customers, getCustomer } = useAdmin()

  const current = monthlyRevenue[monthlyRevenue.length - 1]
  const previous = monthlyRevenue[monthlyRevenue.length - 2]
  const change = ((current.revenue - previous.revenue) / previous.revenue) * 100
  const openOrders = orders.filter((o) => o.status === 'Pending' || o.status === 'Processing').length
  const lowStock = products.filter((p) => p.stock <= LOW_STOCK_LIMIT).sort((a, b) => a.stock - b.stock)
  const recentOrders = orders.slice(0, 6)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Revenue this month"
          value={formatPrice(current.revenue)}
          note={`${change >= 0 ? '▲' : '▼'} ${Math.abs(change).toFixed(1)}% vs ${previous.month}`}
          icon={BanknotesIcon}
        />
        <StatCard label="Orders" value={orders.length} note={`${openOrders} need action`} icon={ShoppingBagIcon} />
        <StatCard label="Customers" value={customers.length} note="Registered accounts" icon={UsersIcon} />
        <StatCard
          label="Low stock"
          value={lowStock.length}
          note={`Products with ${LOW_STOCK_LIMIT} or fewer left`}
          icon={ExclamationTriangleIcon}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-xl border border-slate-200 bg-white p-5 xl:col-span-2">
          <h2 className="text-base font-semibold">Revenue</h2>
          <p className="text-sm text-slate-500">Last 12 months, in LKR</p>
          <div className="mt-4">
            <RevenueChart data={monthlyRevenue} />
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Low stock</h2>
            <Link to="/admin/products" className="text-sm font-medium text-emerald-700 hover:underline">
              Manage
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-slate-100">
            {lowStock.length === 0 && <li className="py-3 text-sm text-slate-500">All products are well stocked.</li>}
            {lowStock.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-slate-500">{p.sku}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                    p.stock === 0 ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {p.stock === 0 ? 'Out of stock' : `${p.stock} left`}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between px-5 pt-5">
          <h2 className="text-base font-semibold">Recent orders</h2>
          <Link to="/admin/orders" className="text-sm font-medium text-emerald-700 hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="border-y border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-2 font-medium">Order</th>
                <th className="px-5 py-2 font-medium">Customer</th>
                <th className="px-5 py-2 font-medium">Date</th>
                <th className="px-5 py-2 font-medium">Status</th>
                <th className="px-5 py-2 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentOrders.map((o) => (
                <tr key={o.id}>
                  <td className="px-5 py-3 font-medium">{o.id}</td>
                  <td className="px-5 py-3">{getCustomer(o.customerId)?.name}</td>
                  <td className="px-5 py-3 text-slate-500">{formatDate(o.date)}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="px-5 py-3 text-right tabular-nums">{formatPrice(o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
