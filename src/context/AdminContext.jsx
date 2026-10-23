import { useMemo, useState } from 'react'
import { adminCustomers, adminOrders, adminProducts } from '../data/adminData'
import { AdminContext } from './adminContextObject'

export function AdminProvider({ children }) {
  const [products, setProducts] = useState(adminProducts)
  const [orders, setOrders] = useState(adminOrders)
  const [customers] = useState(adminCustomers)

  const value = useMemo(() => {
    const addProduct = (product) => {
      setProducts((prev) => {
        const nextNumber = Math.max(1000, ...prev.map((p) => Number(p.id.slice(2)))) + 1
        return [{ ...product, id: `P-${nextNumber}` }, ...prev]
      })
    }

    const updateProduct = (product) => {
      setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)))
    }

    const deleteProduct = (id) => {
      setProducts((prev) => prev.filter((p) => p.id !== id))
    }

    const updateOrderStatus = (id, status) => {
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
    }

    const getCustomer = (id) => customers.find((c) => c.id === id)

    return { products, orders, customers, addProduct, updateProduct, deleteProduct, updateOrderStatus, getCustomer }
  }, [products, orders, customers])

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}
