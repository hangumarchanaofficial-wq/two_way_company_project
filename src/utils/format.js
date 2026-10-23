const currency = new Intl.NumberFormat('en-LK', {
  style: 'currency',
  currency: 'LKR',
  maximumFractionDigits: 0,
})

export const formatPrice = (value) => currency.format(value)

export const formatCompactPrice = (value) => {
  if (value >= 1_000_000) return `Rs ${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `Rs ${Math.round(value / 1_000)}K`
  return `Rs ${value}`
}

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
