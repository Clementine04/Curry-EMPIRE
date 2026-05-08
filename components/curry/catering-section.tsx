"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Images, Megaphone } from "lucide-react"
import { CATERING_SERVICES, type CateringService } from "@/lib/catering-data"
import { FoodImage } from "./food-image"
import { Button } from "@/components/ui/button"
import { campaignLabel, useCurry } from "./state"
import { CateringModal } from "./catering-modal"
import { cn } from "@/lib/utils"

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

export function CateringSection() {
  const {
    campaign,
    promotedService,
    promotedServiceDetails,
    setSelectedService,
  } = useCurry()
  const [active, setActive] = useState<CateringService | null>(null)

  useEffect(() => {
    if (!promotedServiceDetails) return

    setSelectedService(promotedServiceDetails.slug)
    const targetId = `catering-service-${promotedServiceDetails.slug}`
    const timeouts = [120, 420, 900].map((delay) =>
      window.setTimeout(() => focusCampaignTarget(targetId), delay),
    )

    return () => timeouts.forEach((timeout) => window.clearTimeout(timeout))
  }, [promotedServiceDetails, setSelectedService])

  const scrollToContact = (slug: string) => {
    setSelectedService(slug)
    setActive(null)
    setTimeout(() => {
      document
        .querySelector("#contact")
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 50)
  }

  return (
    <section id="catering" className="py-14 sm:py-24 relative">
      <div className="pointer-events-none absolute inset-x-0 -top-10 -z-10 h-32 bg-gradient-to-b from-gold-soft/30 to-transparent" />
      <div className="mx-auto max-w-7xl px-3 min-[380px]:px-4 sm:px-6">
        <div className="flex flex-col items-center text-center gap-3 mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-[0.18em] text-gold-deep">
            Catering & Events
          </span>
          <h2 className="font-serif text-2xl min-[380px]:text-3xl sm:text-4xl lg:text-5xl tracking-tight text-balance">
            Catering & Event Services
          </h2>
          <p className="text-muted-foreground max-w-2xl text-pretty">
            Explore Curry Empire&apos;s on-site and off-site catering services
            for celebrations, company events, private gatherings, and special
            occasions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {CATERING_SERVICES.map((s, i) => {
            const promoted = promotedService === s.slug
            return (
              <motion.article
                key={s.slug}
                id={`catering-service-${s.slug}`}
                tabIndex={promoted ? -1 : undefined}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.2) }}
                className={cn(
                  "group glass-card scroll-mt-32 rounded-[1.35rem] min-[380px]:rounded-3xl overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/45",
                  promoted &&
                    "relative ring-4 ring-gold shadow-[0_22px_70px_rgba(197,137,31,0.28)] bg-gold-soft/30",
                )}
              >
                <button
                  onClick={() => setActive(s)}
                  className="relative aspect-[4/3] overflow-hidden bg-muted text-left"
                  aria-label={`View ${s.name} documentation`}
                >
                  <FoodImage
                    src={s.image}
                    alt={s.name}
                    width={600}
                    height={450}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
                    <span className="glass rounded-full px-2.5 py-1 text-[10px] font-medium tracking-wide uppercase text-foreground/80">
                      Service
                    </span>
                    <span className="glass rounded-full p-1.5">
                      <Images className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  {promoted && (
                    <div className="absolute top-3 right-3 gold-gradient rounded-full px-2.5 min-[380px]:px-3 py-1 text-[9px] min-[380px]:text-[10px] font-semibold tracking-wide uppercase text-foreground shadow-md">
                      Campaign Service
                    </div>
                  )}
                </button>
                <div className="p-3.5 min-[380px]:p-4 sm:p-5 flex-1 flex flex-col gap-3">
                  {promoted && campaign ? (
                    <div className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-[11px] font-medium text-gold-deep">
                      <Megaphone className="h-3.5 w-3.5" />
                      <span className="truncate">{campaignLabel(campaign)} feature</span>
                    </div>
                  ) : null}
                  <div>
                    <h3 className="font-medium text-base text-balance">
                      {s.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {s.description}
                    </p>
                  </div>
                  <div className="mt-auto grid gap-2 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
                    <Button
                      variant="outline"
                      onClick={() => setActive(s)}
                      className="w-full rounded-full h-10 border-foreground/10 bg-transparent px-3 text-xs"
                    >
                      View Documentation
                    </Button>
                    <Button
                      onClick={() => scrollToContact(s.slug)}
                      className="w-full rounded-full h-10 bg-foreground text-background hover:bg-foreground/90 px-3 text-xs"
                    >
                      Book / Inquire
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>

      <CateringModal
        service={active}
        onClose={() => setActive(null)}
        onBook={(slug) => scrollToContact(slug)}
      />
    </section>
  )
}
