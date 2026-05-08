"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { CateringService } from "@/lib/catering-data"
import { FoodImage } from "./food-image"
import { ArrowRight, X } from "lucide-react"
import { motion } from "framer-motion"

type Props = {
  service: CateringService | null
  onClose: () => void
  onBook: (slug: string) => void
}

export function CateringModal({ service, onClose, onBook }: Props) {
  return (
    <Dialog open={!!service} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="!max-w-[min(94vw,1180px)] w-[calc(100vw-0.5rem)] min-[380px]:w-[calc(100vw-1rem)] sm:w-[calc(100vw-3rem)] p-0 overflow-hidden border-foreground/10 bg-background/95 backdrop-blur-2xl rounded-[1.35rem] min-[380px]:rounded-3xl max-h-[94dvh] sm:max-h-[92vh] flex flex-col gap-0"
        showCloseButton={false}
      >
        {service && (
          <>
            <div className="flex items-start justify-between gap-2 min-[380px]:gap-3 p-3.5 min-[380px]:p-5 sm:p-6 border-b border-foreground/5">
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-[0.18em] text-gold-deep mb-1">
                  Event Documentation
                </div>
                <DialogTitle className="font-serif text-xl min-[380px]:text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight text-balance">
                  {service.documentation.title}
                </DialogTitle>
                <DialogDescription className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl text-pretty">
                  {service.documentation.description}
                </DialogDescription>
              </div>
              <button
                onClick={onClose}
                className="h-9 w-9 grid place-items-center rounded-full hover:bg-foreground/5 flex-shrink-0"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-y-auto p-3.5 min-[380px]:p-5 sm:p-6 grid gap-5 min-[380px]:gap-6 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_390px]">
              {/* Gallery */}
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  Previous Events
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 min-[380px]:gap-3 sm:gap-4">
                  {service.documentation.galleryImages.map((src, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className={`relative overflow-hidden rounded-2xl ring-1 ring-foreground/5 ${
                        i === 0
                          ? "col-span-2 row-span-2 aspect-[4/3] lg:aspect-square"
                          : "aspect-square"
                      }`}
                    >
                      <FoodImage
                        src={src}
                        alt={`${service.name} event ${i + 1}`}
                        width={i === 0 ? 800 : 400}
                        height={i === 0 ? 800 : 400}
                        sizes={i === 0 ? "(max-width: 1024px) 90vw, 520px" : "(max-width: 1024px) 45vw, 250px"}
                        className="h-full w-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Event details */}
              <aside className="lg:sticky lg:top-0 lg:self-start">
                <div className="glass-card rounded-2xl p-4 sm:p-5">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                    Sample Event Details
                  </div>
                  <div className="space-y-3 text-sm sm:text-base">
                    <Detail label="Event Type" value={service.documentation.eventDetails.type} />
                    <Detail
                      label="Guest Count"
                      value={service.documentation.eventDetails.guestCount}
                    />
                    <Detail
                      label="Setup Style"
                      value={service.documentation.eventDetails.setupStyle}
                    />
                    <Detail
                      label="Service Includes"
                      value={service.documentation.eventDetails.includes}
                    />
                  </div>
                  <Button
                    onClick={() => onBook(service.slug)}
                    className="mt-5 w-full rounded-full h-12 bg-foreground text-background hover:bg-foreground/90"
                  >
                    Book This Service
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <p className="mt-3 text-[11px] text-muted-foreground text-center">
                    Inquiry-based service. No online payment.
                  </p>
                </div>
              </aside>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="text-foreground">{value}</div>
    </div>
  )
}
