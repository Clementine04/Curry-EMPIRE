"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Megaphone, X } from "lucide-react"
import { campaignLabel, useCurry } from "./state"

export function CampaignBanner() {
  const {
    campaign,
    promotedItemDetails,
    promotedServiceDetails,
    campaignBannerVisible,
    dismissCampaignBanner,
  } = useCurry()

  const promotedLabel = promotedItemDetails?.name ?? promotedServiceDetails?.name
  const promotedKind = promotedItemDetails ? "menu pick" : "service"
  const targetId = promotedItemDetails
    ? `menu-item-${promotedItemDetails.slug}`
    : promotedServiceDetails
      ? `catering-service-${promotedServiceDetails.slug}`
      : campaign
        ? "order"
        : null

  const viewCampaignTarget = () => {
    if (!targetId) return
    const target = document.getElementById(targetId)
    target?.scrollIntoView({ behavior: "smooth", block: "center" })
    window.setTimeout(() => target?.focus({ preventScroll: true }), 350)
  }

  return (
    <AnimatePresence>
      {campaign && campaignBannerVisible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="fixed top-[78px] min-[380px]:top-[88px] sm:top-[96px] left-0 right-0 z-40 px-2.5 min-[380px]:px-4 sm:px-6 pointer-events-none"
        >
          <div className="mx-auto max-w-7xl flex justify-center">
            <div className="pointer-events-auto glass-strong max-w-full rounded-2xl min-[380px]:rounded-full pl-3 min-[380px]:pl-4 pr-2 py-1.5 flex items-center gap-2 min-[380px]:gap-3 shadow-sm">
              <Megaphone className="h-4 w-4 flex-shrink-0 text-gold-deep" />
              <span className="min-w-0 truncate text-xs min-[380px]:text-sm">
                Campaign detected:{" "}
                <span className="font-medium">{campaignLabel(campaign)}</span>
                {promotedLabel ? (
                  <span className="hidden sm:inline text-muted-foreground">
                    {" "}
                    · Featured {promotedKind}: {promotedLabel}
                  </span>
                ) : null}
              </span>
              {targetId ? (
                <button
                  onClick={viewCampaignTarget}
                  className="hidden sm:inline-flex h-7 items-center gap-1 rounded-full bg-foreground px-3 text-[11px] font-medium text-background transition hover:bg-foreground/90"
                >
                  View
                  <ArrowRight className="h-3 w-3" />
                </button>
              ) : null}
              <button
                onClick={dismissCampaignBanner}
                className="h-7 w-7 flex-shrink-0 grid place-items-center rounded-full hover:bg-foreground/10 transition"
                aria-label="Dismiss"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
