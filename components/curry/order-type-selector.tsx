"use client"

import { motion } from "framer-motion"
import { useCurry, type OrderType } from "./state"
import { cn } from "@/lib/utils"

const OPTIONS: { id: OrderType; label: string }[] = [
  { id: "dine-in", label: "Dine In" },
  { id: "takeout", label: "Take Out" },
]

export function OrderTypeSelector() {
  const { orderType, setOrderType } = useCurry()
  return (
    <div
      role="tablist"
      aria-label="Order type"
      className="relative grid h-12 w-full grid-cols-2 p-1 rounded-full glass border border-foreground/10 sm:inline-grid sm:w-fit"
    >
      {OPTIONS.map((o) => {
        const active = orderType === o.id
        return (
          <button
            key={o.id}
            role="tab"
            aria-selected={active}
            onClick={() => setOrderType(o.id)}
            className={cn(
              "relative z-10 px-3 min-[380px]:px-5 sm:px-7 rounded-full text-sm font-medium transition-colors",
              active ? "text-background" : "text-foreground/70 hover:text-foreground",
            )}
          >
            {active && (
              <motion.span
                layoutId="orderTypePill"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="absolute inset-0 rounded-full bg-foreground -z-10"
              />
            )}
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
