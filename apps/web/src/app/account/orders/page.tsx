'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import OrderTracker from '@/src/components/account/OrderTracker'
import { MOCK_ORDERS, Order } from '@/src/lib/mock-data'
import { cn } from '@/src/lib/utils'

const STATUS_FILTERS = ['All', 'In Transit', 'Delivered', 'Cancelled'] as const
type StatusFilter = typeof STATUS_FILTERS[number]

const STATUS_MAP: Record<StatusFilter, Order['status'][]> = {
  'All':        ['CONFIRMED','PROCESSED','SHIPPED','IN_TRANSIT','DELIVERED','CANCELLED'],
  'In Transit': ['CONFIRMED','PROCESSED','SHIPPED','IN_TRANSIT'],
  'Delivered':  ['DELIVERED'],
  'Cancelled':  ['CANCELLED'],
}

export default function OrdersPage() {
  const [filter,  setFilter]  = useState<StatusFilter>('All')
  const [search,  setSearch]  = useState('')

  const filtered = MOCK_ORDERS.filter((order: Order) => {
    const matchesStatus = STATUS_MAP[filter].includes(order.status)
    const matchesSearch = search
      ? order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        order.items.some((i: any) => i.name.toLowerCase().includes(search.toLowerCase()))
      : true
    return matchesStatus && matchesSearch
  })

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-serif text-4xl font-light text-velore-white mb-2">
          Your Orders
        </h1>
        <p className="text-velore-gray text-xs tracking-wide">
          {MOCK_ORDERS.length} orders placed
        </p>
      </motion.div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-velore-gray" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders..."
            className="w-full bg-velore-surface border border-velore-border pl-9 pr-4 py-2.5
                       text-velore-white text-xs placeholder:text-velore-border
                       focus:border-velore-gold focus:outline-none transition-colors duration-300"
          />
        </div>

        {/* Status filters */}
        <div className="flex gap-2 flex-wrap">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-4 py-2 text-[9px] tracking-[0.25em] uppercase border transition-all duration-300',
                filter === f
                  ? 'border-velore-gold text-velore-gold bg-velore-gold/5'
                  : 'border-velore-border text-velore-gray hover:border-velore-gray hover:text-velore-white'
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Orders list */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-serif text-3xl text-velore-border mb-3">No orders found</p>
          <p className="text-velore-gray text-xs tracking-wide">
            Try adjusting your search or filter
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {filtered.map((order: Order, i: number) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <OrderTracker order={order} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}