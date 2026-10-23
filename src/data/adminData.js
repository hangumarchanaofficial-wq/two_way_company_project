// Sample data for the admin dashboard until a backend is connected.

export const ORDER_STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

export const PRODUCT_CATEGORIES = ['Tea', 'Spices', 'Handicrafts', 'Clothing', 'Wellness', 'Food']

export const adminProducts = [
  { id: 'P-1001', name: 'Ceylon Black Tea – 400g', category: 'Tea', price: 2450, stock: 128, sku: 'TEA-BLK-400' },
  { id: 'P-1002', name: 'Green Tea with Jasmine – 100 bags', category: 'Tea', price: 1890, stock: 64, sku: 'TEA-GRN-100' },
  { id: 'P-1003', name: 'Pure Ceylon Cinnamon Sticks – 250g', category: 'Spices', price: 3200, stock: 9, sku: 'SPC-CIN-250' },
  { id: 'P-1004', name: 'Black Pepper Whole – 500g', category: 'Spices', price: 1750, stock: 210, sku: 'SPC-PEP-500' },
  { id: 'P-1005', name: 'Hand-painted Kandyan Mask', category: 'Handicrafts', price: 8900, stock: 14, sku: 'HND-MSK-001' },
  { id: 'P-1006', name: 'Batik Wall Hanging', category: 'Handicrafts', price: 6500, stock: 0, sku: 'HND-BTK-002' },
  { id: 'P-1007', name: 'Handloom Cotton Sarong', category: 'Clothing', price: 4200, stock: 47, sku: 'CLT-SRG-010' },
  { id: 'P-1008', name: 'Batik Silk Scarf', category: 'Clothing', price: 5600, stock: 6, sku: 'CLT-SCF-011' },
  { id: 'P-1009', name: 'Coconut Oil Virgin Cold-pressed – 500ml', category: 'Wellness', price: 1450, stock: 175, sku: 'WEL-COC-500' },
  { id: 'P-1010', name: 'Ayurvedic Herbal Balm – 50g', category: 'Wellness', price: 980, stock: 92, sku: 'WEL-BLM-050' },
  { id: 'P-1011', name: 'Kithul Treacle – 750ml', category: 'Food', price: 2100, stock: 38, sku: 'FOD-KTH-750' },
  { id: 'P-1012', name: 'Cashew Nuts Roasted – 500g', category: 'Food', price: 3650, stock: 3, sku: 'FOD-CSH-500' },
]

export const adminCustomers = [
  { id: 'C-201', name: 'Nimali Perera', email: 'nimali.perera@example.com', city: 'Colombo', joined: '2025-11-04' },
  { id: 'C-202', name: 'Kasun Jayasinghe', email: 'kasun.j@example.com', city: 'Kandy', joined: '2025-12-18' },
  { id: 'C-203', name: 'Tharushi Fernando', email: 'tharushi.f@example.com', city: 'Galle', joined: '2026-01-09' },
  { id: 'C-204', name: 'Ravindu Silva', email: 'ravindu.silva@example.com', city: 'Negombo', joined: '2026-02-21' },
  { id: 'C-205', name: 'Dilini Wickramasinghe', email: 'dilini.w@example.com', city: 'Kurunegala', joined: '2026-03-02' },
  { id: 'C-206', name: 'Ashan Rathnayake', email: 'ashan.r@example.com', city: 'Matara', joined: '2026-04-15' },
  { id: 'C-207', name: 'Sachini Gunawardena', email: 'sachini.g@example.com', city: 'Colombo', joined: '2026-05-27' },
  { id: 'C-208', name: 'Isuru Bandara', email: 'isuru.b@example.com', city: 'Jaffna', joined: '2026-07-08' },
  { id: 'C-209', name: 'Madhavi Senanayake', email: 'madhavi.s@example.com', city: 'Anuradhapura', joined: '2026-08-19' },
  { id: 'C-210', name: 'Chamath Herath', email: 'chamath.h@example.com', city: 'Badulla', joined: '2026-09-30' },
]

const item = (productId, quantity) => {
  const product = adminProducts.find((p) => p.id === productId)
  return { productId, name: product.name, price: product.price, quantity }
}

const order = (id, customerId, date, status, items) => ({
  id,
  customerId,
  date,
  status,
  items,
  total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
})

export const adminOrders = [
  order('ORD-3051', 'C-207', '2026-10-18', 'Pending', [item('P-1001', 2), item('P-1010', 1)]),
  order('ORD-3050', 'C-202', '2026-10-18', 'Processing', [item('P-1005', 1)]),
  order('ORD-3049', 'C-210', '2026-10-17', 'Pending', [item('P-1003', 1), item('P-1004', 2)]),
  order('ORD-3048', 'C-201', '2026-10-16', 'Shipped', [item('P-1007', 2), item('P-1008', 1)]),
  order('ORD-3047', 'C-205', '2026-10-15', 'Delivered', [item('P-1009', 3)]),
  order('ORD-3046', 'C-203', '2026-10-14', 'Cancelled', [item('P-1012', 1)]),
  order('ORD-3045', 'C-208', '2026-10-12', 'Delivered', [item('P-1002', 2), item('P-1011', 1)]),
  order('ORD-3044', 'C-204', '2026-10-10', 'Shipped', [item('P-1006', 1), item('P-1010', 2)]),
  order('ORD-3043', 'C-209', '2026-10-08', 'Delivered', [item('P-1001', 4)]),
  order('ORD-3042', 'C-206', '2026-10-05', 'Delivered', [item('P-1005', 1), item('P-1003', 1)]),
  order('ORD-3041', 'C-201', '2026-10-02', 'Delivered', [item('P-1004', 1), item('P-1009', 1)]),
  order('ORD-3040', 'C-207', '2026-09-28', 'Delivered', [item('P-1008', 2)]),
  order('ORD-3039', 'C-202', '2026-09-24', 'Delivered', [item('P-1011', 2), item('P-1012', 1)]),
  order('ORD-3038', 'C-205', '2026-09-19', 'Delivered', [item('P-1007', 1)]),
  order('ORD-3037', 'C-203', '2026-09-11', 'Delivered', [item('P-1002', 3), item('P-1001', 1)]),
]

// Monthly revenue in LKR for the last 12 months (Nov 2025 – Oct 2026).
export const monthlyRevenue = [
  { month: 'Nov', revenue: 412000 },
  { month: 'Dec', revenue: 586000 },
  { month: 'Jan', revenue: 398000 },
  { month: 'Feb', revenue: 431000 },
  { month: 'Mar', revenue: 472000 },
  { month: 'Apr', revenue: 538000 },
  { month: 'May', revenue: 497000 },
  { month: 'Jun', revenue: 521000 },
  { month: 'Jul', revenue: 563000 },
  { month: 'Aug', revenue: 609000 },
  { month: 'Sep', revenue: 584000 },
  { month: 'Oct', revenue: 642000 },
]

export const LOW_STOCK_LIMIT = 10
