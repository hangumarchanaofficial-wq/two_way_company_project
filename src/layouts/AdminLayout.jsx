import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  Bars3Icon,
  ChartPieIcon,
  CubeIcon,
  ShoppingBagIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

const navItems = [
  { to: '/admin', label: 'Overview', icon: ChartPieIcon, end: true },
  { to: '/admin/products', label: 'Products', icon: CubeIcon },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingBagIcon },
  { to: '/admin/customers', label: 'Customers', icon: UsersIcon },
]

function Sidebar({ onNavigate }) {
  return (
    <div className="flex h-full flex-col bg-slate-900 text-slate-300">
      <div className="flex h-16 items-center gap-2 px-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-sm font-bold text-white">
          TW
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">TwoWay Ceylon</p>
          <p className="text-xs text-slate-400">Admin panel</p>
        </div>
      </div>
      <nav className="mt-4 flex-1 space-y-1 px-3">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? 'bg-slate-800 text-white' : 'hover:bg-slate-800/60 hover:text-white'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </nav>
      <p className="px-6 py-4 text-xs text-slate-500">Showing sample data</p>
    </div>
  )
}

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const current = navItems.find((item) => (item.end ? pathname === item.to : pathname.startsWith(item.to)))

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <aside className="fixed inset-y-0 left-0 hidden w-64 lg:block">
        <Sidebar />
      </aside>

      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/50" onClick={() => setMenuOpen(false)} />
          <aside className="relative h-full w-64">
            <Sidebar onNavigate={() => setMenuOpen(false)} />
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white px-4 sm:px-6">
          <button
            type="button"
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
          <h1 className="text-lg font-semibold">{current?.label ?? 'Admin'}</h1>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">Store Admin</p>
              <p className="text-xs text-slate-500">admin@twowayceylon.lk</p>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
              SA
            </span>
          </div>
        </header>

        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
