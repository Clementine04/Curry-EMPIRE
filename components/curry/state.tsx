"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useSearchParams } from "next/navigation"
import { CATERING_SERVICES, type CateringService } from "@/lib/catering-data"
import { MENU, type MenuItem } from "@/lib/menu-data"

export type OrderType = "dine-in" | "takeout"

export type CartItem = {
  slug: string
  qty: number
}

export type CampaignAnalytics = Record<
  string,
  { visits: number; inquiries: number; estValue: number }
>

type Ctx = {
  orderType: OrderType
  setOrderType: (t: OrderType) => void
  cart: CartItem[]
  addToCart: (slug: string) => MenuItem | null
  removeFromCart: (slug: string) => void
  setQty: (slug: string, qty: number) => void
  clearCart: () => void
  cartCount: number
  cartSubtotal: number
  cartOpen: boolean
  setCartOpen: (b: boolean) => void
  // pairing
  lastSuggestion: { for: string; suggestSlugs: string[] } | null
  dismissSuggestion: () => void
  // campaign
  campaign: string | null
  campaignSource: string | null
  promotedItem: string | null
  promotedService: string | null
  promotedItemDetails: MenuItem | null
  promotedServiceDetails: CateringService | null
  campaignBannerVisible: boolean
  dismissCampaignBanner: () => void
  analytics: CampaignAnalytics
  recordInquiry: (estValue: number) => void
  // selected catering service for contact
  selectedService: string | null
  setSelectedService: (s: string | null) => void
}

const CurryCtx = createContext<Ctx | null>(null)

const STORAGE_KEY = "curry_empire_analytics_v1"

function isAvailableForOrder(item: MenuItem, type: OrderType) {
  return item.availability === "both" || item.availability === type
}

function readAnalytics(): CampaignAnalytics {
  if (typeof window === "undefined") return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CampaignAnalytics) : {}
  } catch {
    return {}
  }
}

function writeAnalytics(a: CampaignAnalytics) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(a))
  } catch {}
}

function prettyCampaign(name: string) {
  return name
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export function CurryProvider({ children }: { children: React.ReactNode }) {
  const search = useSearchParams()

  const [orderType, setOrderTypeState] = useState<OrderType>("dine-in")
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [lastSuggestion, setLastSuggestion] = useState<Ctx["lastSuggestion"]>(null)
  const [analytics, setAnalytics] = useState<CampaignAnalytics>({})
  const [campaignBannerVisible, setCampaignBannerVisible] = useState(true)
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const campaign = search.get("campaign")
  const campaignSource = search.get("source")
  const promotedItem = search.get("item")
  const promotedService = search.get("service")

  const promotedItemDetails = useMemo(
    () => MENU.find((m) => m.slug === promotedItem) ?? null,
    [promotedItem],
  )
  const promotedServiceDetails = useMemo(
    () => CATERING_SERVICES.find((s) => s.slug === promotedService) ?? null,
    [promotedService],
  )

  const setOrderType = useCallback((next: OrderType) => {
    setOrderTypeState(next)
    setCart((prev) =>
      prev.filter((c) => {
        const item = MENU.find((m) => m.slug === c.slug)
        return item ? isAvailableForOrder(item, next) : false
      }),
    )
    setLastSuggestion(null)
  }, [])

  // hydrate analytics from localStorage and increment campaign visit
  useEffect(() => {
    const stored = readAnalytics()
    if (campaign) {
      const prev = stored[campaign] ?? { visits: 0, inquiries: 0, estValue: 0 }
      stored[campaign] = { ...prev, visits: prev.visits + 1 }
      writeAnalytics(stored)
    }
    setAnalytics(stored)
    if (promotedServiceDetails) {
      setSelectedService(promotedServiceDetails.slug)
    }
  }, [campaign, promotedServiceDetails])

  const addToCart = useCallback(
    (slug: string) => {
      const item = MENU.find((m) => m.slug === slug)
      if (!item) return null
      if (!isAvailableForOrder(item, orderType)) return null
      setCart((prev) => {
        const existing = prev.find((c) => c.slug === slug)
        if (existing) {
          return prev.map((c) =>
            c.slug === slug ? { ...c, qty: c.qty + 1 } : c,
          )
        }
        return [...prev, { slug, qty: 1 }]
      })
      // Trigger pairing suggestion
      if (item.pairings && item.pairings.length > 0) {
        const inCartSet = new Set(cart.map((c) => c.slug))
        const candidates = item.pairings.filter((p) => {
          if (inCartSet.has(p)) return false
          const paired = MENU.find((m) => m.slug === p)
          return paired ? isAvailableForOrder(paired, orderType) : false
        })
        if (candidates.length > 0) {
          setLastSuggestion({ for: slug, suggestSlugs: candidates.slice(0, 2) })
        }
      }
      return item
    },
    [cart, orderType],
  )

  const removeFromCart = useCallback((slug: string) => {
    setCart((prev) => prev.filter((c) => c.slug !== slug))
  }, [])

  const setQty = useCallback((slug: string, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((c) => c.slug !== slug))
      return
    }
    setCart((prev) => prev.map((c) => (c.slug === slug ? { ...c, qty } : c)))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const dismissSuggestion = useCallback(() => setLastSuggestion(null), [])
  const dismissCampaignBanner = useCallback(
    () => setCampaignBannerVisible(false),
    [],
  )

  const cartCount = useMemo(
    () => cart.reduce((sum, c) => sum + c.qty, 0),
    [cart],
  )
  const cartSubtotal = useMemo(
    () =>
      cart.reduce((sum, c) => {
        const item = MENU.find((m) => m.slug === c.slug)
        return sum + (item?.price ?? 0) * c.qty
      }, 0),
    [cart],
  )

  const recordInquiry = useCallback(
    (estValue: number) => {
      if (!campaign) return
      setAnalytics((prev) => {
        const cur = prev[campaign] ?? { visits: 0, inquiries: 0, estValue: 0 }
        const next = {
          ...prev,
          [campaign]: {
            ...cur,
            inquiries: cur.inquiries + 1,
            estValue: cur.estValue + estValue,
          },
        }
        writeAnalytics(next)
        return next
      })
    },
    [campaign],
  )

  const value = useMemo<Ctx>(
    () => ({
      orderType,
      setOrderType,
      cart,
      addToCart,
      removeFromCart,
      setQty,
      clearCart,
      cartCount,
      cartSubtotal,
      cartOpen,
      setCartOpen,
      lastSuggestion,
      dismissSuggestion,
      campaign,
      campaignSource,
      promotedItem,
      promotedService,
      promotedItemDetails,
      promotedServiceDetails,
      campaignBannerVisible,
      dismissCampaignBanner,
      analytics,
      recordInquiry,
      selectedService,
      setSelectedService,
    }),
    [
      orderType,
      setOrderType,
      cart,
      addToCart,
      removeFromCart,
      setQty,
      clearCart,
      cartCount,
      cartSubtotal,
      cartOpen,
      lastSuggestion,
      dismissSuggestion,
      campaign,
      campaignSource,
      promotedItem,
      promotedService,
      promotedItemDetails,
      promotedServiceDetails,
      campaignBannerVisible,
      dismissCampaignBanner,
      analytics,
      recordInquiry,
      selectedService,
    ],
  )

  return <CurryCtx.Provider value={value}>{children}</CurryCtx.Provider>
}

export function useCurry() {
  const c = useContext(CurryCtx)
  if (!c) throw new Error("useCurry must be used inside CurryProvider")
  return c
}

export const campaignLabel = prettyCampaign
