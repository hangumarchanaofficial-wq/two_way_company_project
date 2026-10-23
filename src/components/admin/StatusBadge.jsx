import {
  CheckCircleIcon,
  ClockIcon,
  CogIcon,
  TruckIcon,
  XCircleIcon,
} from '@heroicons/react/20/solid'

const styles = {
  Pending: { className: 'bg-amber-50 text-amber-700 ring-amber-200', icon: ClockIcon },
  Processing: { className: 'bg-sky-50 text-sky-700 ring-sky-200', icon: CogIcon },
  Shipped: { className: 'bg-indigo-50 text-indigo-700 ring-indigo-200', icon: TruckIcon },
  Delivered: { className: 'bg-emerald-50 text-emerald-700 ring-emerald-200', icon: CheckCircleIcon },
  Cancelled: { className: 'bg-rose-50 text-rose-700 ring-rose-200', icon: XCircleIcon },
}

export default function StatusBadge({ status }) {
  const { className, icon: Icon } = styles[status] ?? styles.Pending
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${className}`}>
      <Icon className="h-3.5 w-3.5" />
      {status}
    </span>
  )
}
