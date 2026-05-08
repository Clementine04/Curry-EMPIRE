"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Check, Megaphone, Plus, Search } from "lucide-react"
import { CATEGORIES, MENU, type MenuCategory } from "@/lib/menu-data"
import { campaignLabel, useCurry, type OrderType } from "./state"
import { FoodImage } from "./food-image"
import { OrderTypeSelector } from "./order-type-selector"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

function isAvailable(avail: "dine-in" | "takeout" | "both", t: OrderType) {
  if (avail === "both") return true
  if (avail === "dine-in") return t === "dine-in"
  if (avail === "takeout") return t === "takeout"
  return true
}

function focusCampaignTarget(id: string) {
  const target = document.getElementById(id)
  if (!target) return

  const top = Math.max(
    target.getBoundingClientRect().top + window.scrollY - 128,
    0,
  )
  window.scrollTo({ top, behavior: "auto" })
  target.focus({ preventScroll: true })
}

export function MenuSection() {
  const {
    campaign,
    orderType,
    setOrderType,
    addToCart,
    promotedItem,
    promotedItemDetails,
  } = useCurry()
  const [query, setQuery] = useState("")
  const [active, setActive] = useState<"All" | MenuCategory>("All")
  const [pulse, setPulse] = useState<string | null>(null)

  useEffect(() => {
    if (!promotedItemDetails) return

    setQuery("")
    setActive(promotedItemDetails.category)
    if (promotedItemDetails.availability !== "both") {
      setOrderType(promotedItemDetails.availability)
    }

    const targetId = `menu-item-${promotedItemDetails.slug}`
    const timeouts = [120, 420, 900].map((delay) =>
      window.setTimeout(() => focusCampaignTarget(targetId), delay),
    )

    return () => timeouts.forEach((timeout) => window.clearTimeout(timeout))
  }, [promotedItemDetails, setOrderType])

  const filtered = useMemo(() => {
    return MENU.filter((m) => isAvailable(m.availability, orderType))
      .filter((m) => (active === "All" ? true : m.category === active))
      .filter((m) => {
        if (!query.trim()) return true
        const q = query.toLowerCase()
        return (
          m.name.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q)
        )
      })
  }, [orderType, active, query])

  const handleAdd = (slug: string, name: string) => {
    addToCart(slug)
    setPulse(slug)
    setTimeout(() => setPulse(null), 800)
    toast.success(`Added ${name}`, {
      description: "Open cart to review your order inquiry.",
    })
  }

  return (
    <section id="order" className="py-14 sm:py-24">
      <div className="mx-auto max-w-7xl px-3 min-[380px]:px-4 sm:px-6">
        <div className="flex flex-col items-center text-center gap-3 mb-8 sm:mb-12">
          <span className="text-xs uppercase tracking-[0.18em] text-gold-deep">
            Menu
          </span>
          <h2 className="font-serif text-2xl min-[380px]:text-3xl sm:text-4xl lg:text-5xl tracking-tight text-balance">
            Choose Your Favorites
          </h2>
          <p className="text-muted-foreground max-w-xl text-pretty">
            Select Dine In or Take Out, then build your Curry Empire order
            inquiry.
          </p>
        </div>

        {/* Order type + search */}
        <div className="grid md:grid-cols-[auto_1fr] gap-3 min-[380px]:gap-4 items-center mb-6">
          <OrderTypeSelector />
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Curry Empire menu…"
              className="h-12 pl-11 rounded-full glass border-foreground/10 focus-visible:ring-gold/40 text-sm min-[380px]:text-base"
            />
          </div>
        </div>

        {/* Category pills */}
        <div className="-mx-3 min-[380px]:-mx-4 sm:mx-0 px-3 min-[380px]:px-4 sm:px-0 overflow-x-auto scrollbar-hide mb-8">
          <div className="flex gap-2 min-w-max sm:flex-wrap">
            {CATEGORIES.map((c) => {
              const isActive = active === c
              return (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={cn(
                    "h-9 px-4 rounded-full text-sm whitespace-nowrap transition-all",
                    isActive
                      ? "bg-foreground text-background shadow-sm"
                      : "glass text-foreground/75 hover:text-foreground hover:bg-foreground/5",
                  )}
                >
                  {c}
                </button>
              )
            })}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="glass-card rounded-3xl p-6 min-[380px]:p-10 text-center">
            <p className="text-muted-foreground">
              No items match this filter for {orderType === "dine-in" ? "dine-in" : "take-out"}.
              Try a different category or search term.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filtered.map((item, i) => {
              const promoted = promotedItem === item.slug
              return (
                <motion.article
                  key={item.slug}
                  id={`menu-item-${item.slug}`}
                  tabIndex={promoted ? -1 : undefined}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.35, delay: Math.min(i * 0.02, 0.2) }}
                  className={cn(
                    "group glass-card scroll-mt-32 rounded-[1.35rem] min-[380px]:rounded-3xl overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/45",
                    promoted &&
                      "relative ring-4 ring-gold shadow-[0_22px_70px_rgba(197,137,31,0.28)] bg-gold-soft/30",
                  )}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <FoodImage
                      category={item.category}
                      slug={item.slug}
                      alt={item.name}
                      width={600}
                      height={450}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <AvailabilityBadge availability={item.availability} />
                    </div>
                    {promoted && (
                      <div className="absolute top-3 right-3 gold-gradient rounded-full px-2.5 min-[380px]:px-3 py-1 text-[9px] min-[380px]:text-[10px] font-semibold tracking-wide uppercase text-foreground shadow-md">
                        Campaign Pick
                      </div>
                    )}
                  </div>
                  <div className="p-3.5 min-[380px]:p-4 sm:p-5 flex flex-col gap-2 flex-1">
                    {promoted && campaign ? (
                      <div className="mb-1 inline-flex max-w-full items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-[11px] font-medium text-gold-deep">
                        <Megaphone className="h-3.5 w-3.5" />
                        <span className="truncate">{campaignLabel(campaign)} feature</span>
                      </div>
                    ) : null}
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-[11px] text-muted-foreground uppercase tracking-wide">
                          {item.category}
                        </div>
                        <h3 className="font-medium text-base text-balance">
                          {item.name}
                        </h3>
                      </div>
                      <div className="font-serif text-base whitespace-nowrap">
                        ₱{item.price}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                    <button
                      onClick={() => handleAdd(item.slug, item.name)}
                      className={cn(
                        "mt-2 h-10 rounded-full inline-flex items-center justify-center gap-1.5 text-sm font-medium transition-all",
                        pulse === item.slug
                          ? "bg-emerald-500 text-white"
                          : "bg-foreground text-background hover:bg-foreground/90",
                      )}
                    >
                      {pulse === item.slug ? (
                        <>
                          <Check className="h-4 w-4" />
                          Added
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" />
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </motion.article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

function AvailabilityBadge({
  availability,
}: {
  availability: "dine-in" | "takeout" | "both"
}) {
  const map = {
    "dine-in": { label: "Dine-in Only", cls: "bg-foreground text-background" },
    takeout: { label: "Takeout Only", cls: "bg-foreground text-background" },
    both: { label: "Dine In · Take Out", cls: "glass text-foreground/80" },
  } as const
  const b = map[availability]
  return (
    <span
      className={cn(
        "rounded-full px-2 min-[380px]:px-2.5 py-1 text-[9px] min-[380px]:text-[10px] font-medium tracking-wide",
        b.cls,
      )}
    >
      {b.label}
    </span>
  )
}
