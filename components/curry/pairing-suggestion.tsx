"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, X } from "lucide-react"
import { useCurry } from "./state"
import { getMenuItemBySlug } from "@/lib/menu-data"
import { FoodImage } from "./food-image"
import { Button } from "@/components/ui/button"

export function PairingSuggestion() {
  const { lastSuggestion, dismissSuggestion, addToCart } = useCurry()

  if (!lastSuggestion) return null
  const sourceItem = getMenuItemBySlug(lastSuggestion.for)
  const suggestions = lastSuggestion.suggestSlugs
    .map((s) => getMenuItemBySlug(s))
    .filter(Boolean)

  if (!sourceItem || suggestions.length === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-3 left-2.5 right-2.5 min-[380px]:bottom-4 min-[380px]:left-4 min-[380px]:right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-[380px] z-40"
      >
        <div className="glass-strong rounded-[1.35rem] min-[380px]:rounded-3xl p-3.5 min-[380px]:p-4 shadow-xl">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="h-7 w-7 grid place-items-center rounded-full gold-gradient">
                <Sparkles className="h-3.5 w-3.5 text-foreground/80" />
              </span>
              <div className="text-sm font-medium">Smart Pairing</div>
            </div>
            <button
              onClick={dismissSuggestion}
              className="h-7 w-7 grid place-items-center rounded-full hover:bg-foreground/5"
              aria-label="Dismiss"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="text-xs min-[380px]:text-sm text-foreground/80 mb-3 leading-relaxed">
            <span className="font-medium">{sourceItem.name}</span> pairs well with{" "}
            {suggestions.map((s, i) => (
              <span key={s!.slug}>
                <span className="font-medium">{s!.name}</span>
                {i < suggestions.length - 1 ? " or " : ""}
              </span>
            ))}
            . Want to add one?
          </p>
          <div className="space-y-2">
            {suggestions.map((s) => (
              <div
                key={s!.slug}
                className="flex items-center gap-3 p-2 rounded-2xl bg-foreground/5"
              >
                <div className="h-10 w-10 rounded-xl overflow-hidden flex-shrink-0">
                  <FoodImage
                    category={s!.category}
                    slug={s!.slug}
                    alt={s!.name}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{s!.name}</div>
                  <div className="text-xs text-muted-foreground">₱{s!.price}</div>
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    addToCart(s!.slug)
                    dismissSuggestion()
                  }}
                  className="rounded-full h-8 px-3 bg-foreground text-background hover:bg-foreground/90 text-xs"
                >
                  Add
                </Button>
              </div>
            ))}
          </div>
          <button
            onClick={dismissSuggestion}
            className="mt-3 w-full text-xs text-muted-foreground hover:text-foreground py-1"
          >
            Maybe later
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
