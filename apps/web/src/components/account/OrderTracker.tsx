'use client'

import { motion } from 'framer-motion'
import { Package } from 'lucide-react'
import { Order } from '../../lib/mock-data'
import { cn } from '../../lib/utils'

const STATUS_COLORS: Record<Order['status'], string> = {
  CONFIRMED:  'text-velore-gray',
  PROCESSED:  'text-velore-gray-light',
  SHIPPED:    'text-blue-400',
  IN_TRANSIT: 'text-velore-gold',
  DELIVERED:  'text-green-400',
  CANCELLED:  'text-red-400',
}

interface OrderTrackerProps {
  order:    Order
  compact?: boolean
}

export default function OrderTracker({ order, compact = false }: OrderTrackerProps) {
  const activeStep = order.tracking.filter((t: any) => t.done).length - 1

  return (
    <div className={cn('border border-velore-border', compact ? 'p-4' : 'p-6')}>
      {/* Header row */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-[10px] tracking-[0.25em] uppercase text-velore-gray-light">
              Order #{order.orderNumber}
            </p>
            <span className={cn(
              'text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 border',
              STATUS_COLORS[order.status],
              'border-current/30'
            )}>
              {order.status.replace('_', ' ')}
            </span>
          </div>
          <p className="text-[9px] text-velore-gray">Placed {order.createdAt}</p>
        </div>

        {/* Product thumbnail */}
        <div className="flex items-center gap-3">
          <div className="w-14 h-16 bg-velore-surface border border-velore-border/50
                          flex items-center justify-center flex-shrink-0">
            {/* IMAGE PLACEHOLDER */}
            <Package size={16} className="text-velore-border" />
          </div>
          <div className="hidden md:block">
            {order.items[0] && (
              <>
                <p className="text-[10px] tracking-[0.15em] uppercase text-velore-white">
                  {order.items[0].name}
                </p>
                <p className="text-[9px] text-velore-gray mt-0.5">{order.items[0].variant}</p>
                <p className="text-[11px] text-velore-gray-light mt-1">
                  ${order.items[0].price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Progress bar + steps */}
      <div className="relative">
        {/* Track line */}
        <div className="absolute top-2.5 left-0 right-0 h-px bg-velore-border" />
        {/* Active track */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(activeStep / (order.tracking.length - 1)) * 100}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          className="absolute top-2.5 left-0 h-px bg-velore-gold"
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {order.tracking.map((step: any, i: number) => (
            <div key={step.label} className="flex flex-col items-center gap-2">
              {/* Dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                className={cn(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-500',
                  step.done
                    ? i === activeStep
                      ? 'border-velore-gold bg-velore-gold'
                      : 'border-velore-gold bg-velore-gold/20'
                    : 'border-velore-border bg-velore-black'
                )}
              >
                {step.done && i < activeStep && (
                  <div className="w-1.5 h-1.5 rounded-full bg-velore-gold" />
                )}
              </motion.div>

              {/* Label */}
              <div className="text-center">
                <p className={cn(
                  'text-[8px] tracking-[0.2em] uppercase whitespace-nowrap',
                  step.done ? 'text-velore-white' : 'text-velore-border'
                )}>
                  {step.label}
                </p>
                <p className="text-[7px] text-velore-gray mt-0.5">{step.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-velore-border/40">
        <div>
          <p className="text-[9px] text-velore-gray tracking-wide">Estimated Delivery</p>
          <p className="text-[11px] text-velore-white mt-0.5">{order.estimatedDelivery}</p>
        </div>
        <button className="text-[9px] tracking-[0.25em] uppercase text-velore-gold
                           border border-velore-gold/40 px-4 py-2 hover:bg-velore-gold/10
                           transition-all duration-300">
          Track Package
        </button>
      </div>

      {/* Multiple items */}
      {!compact && order.items.length > 1 && (
        <div className="mt-4 pt-4 border-t border-velore-border/40">
          <p className="text-[9px] tracking-[0.2em] uppercase text-velore-gray mb-3">
            All Items ({order.items.length})
          </p>
          <div className="space-y-2">
            {order.items.slice(1).map((item: any, i: number) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-velore-gray-light">
                    {item.name}
                  </p>
                  <p className="text-[9px] text-velore-gray">{item.variant}</p>
                </div>
                <p className="text-[10px] text-velore-gray-light">
                  ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}