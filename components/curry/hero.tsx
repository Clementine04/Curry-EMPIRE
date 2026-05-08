"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FoodImage } from "./food-image"

const COLLAGE = [
  { src: "/curry/biryani.jpg", alt: "Aromatic chicken biryani" },
  { src: "/curry/pizza.jpg", alt: "Margherita pizza" },
  { src: "/curry/shawarma.jpg", alt: "Shawarma wrap" },
]

const BADGES = ["Dine In", "Take Out", "Catering", "Smart Pairings"]

export function Hero() {
  return (
    <section
      id="home"
      className="relative pt-24 min-[380px]:pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-24 overflow-hidden"
    >
      {/* warm subtle background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-gold-soft/40 blur-3xl" />
        <div className="absolute top-40 -right-32 h-[460px] w-[460px] rounded-full bg-gold/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-3 min-[380px]:px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 min-[380px]:gap-10 lg:gap-14 items-center">
          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex max-w-full items-center gap-2 glass rounded-full px-3 py-1.5 text-[11px] min-[380px]:text-xs text-foreground/80"
            >
              <Sparkles className="h-3.5 w-3.5 text-gold-deep" />
              <span className="truncate">A Tour Around the World Through Food</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-serif mt-5 text-3xl min-[380px]:text-4xl sm:text-5xl lg:text-6xl tracking-tight text-foreground text-balance leading-[1.06]"
            >
              Curry Empire
              <span className="block text-foreground/60">— Cauayan</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-5 max-w-lg text-sm min-[380px]:text-base sm:text-lg leading-relaxed text-muted-foreground text-pretty"
            >
              A smoother way to explore, choose, and send your Curry Empire
              order. Built for dine-in, take-out, and premium catering inquiries.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-7 grid gap-3 min-[380px]:flex min-[380px]:flex-wrap"
            >
              <Button
                onClick={() =>
                  document.querySelector("#order")?.scrollIntoView({ behavior: "smooth" })
                }
                className="w-full min-[380px]:w-auto rounded-full h-12 px-6 bg-foreground text-background hover:bg-foreground/90"
              >
                Start Order
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  document.querySelector("#catering")?.scrollIntoView({ behavior: "smooth" })
                }
                className="w-full min-[380px]:w-auto rounded-full h-12 px-6 glass border-foreground/10 hover:bg-foreground/5"
              >
                Explore Catering
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-7 flex flex-wrap gap-2"
            >
              {BADGES.map((b) => (
                <span
                  key={b}
                  className="glass rounded-full px-3 py-1.5 text-[11px] min-[380px]:text-xs text-foreground/80"
                >
                  {b}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="grid grid-cols-3 grid-rows-2 gap-2.5 min-[380px]:gap-3 sm:gap-4 h-[300px] min-[380px]:h-[360px] sm:h-[520px]">
              <div className="col-span-2 row-span-2 rounded-3xl overflow-hidden shadow-xl ring-1 ring-foreground/5">
                <FoodImage
                  src={COLLAGE[0].src}
                  alt={COLLAGE[0].alt}
                  width={800}
                  height={1000}
                  priority
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 60vw, 540px"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-lg ring-1 ring-foreground/5">
                <FoodImage
                  src={COLLAGE[1].src}
                  alt={COLLAGE[1].alt}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 30vw, 260px"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-lg ring-1 ring-foreground/5">
                <FoodImage
                  src={COLLAGE[2].src}
                  alt={COLLAGE[2].alt}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 30vw, 260px"
                />
              </div>
            </div>

            {/* Floating glass cards */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="hidden sm:flex absolute -bottom-5 -left-5 glass-card rounded-2xl px-4 py-3 items-center gap-3"
            >
              <div className="h-9 w-9 rounded-xl gold-gradient grid place-items-center">
                <Sparkles className="h-4 w-4 text-foreground/80" />
              </div>
              <div className="leading-tight">
                <div className="text-[11px] text-muted-foreground">Smart Pairing</div>
                <div className="text-sm font-medium">Biryani + Samosas</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="hidden md:flex absolute -top-3 -right-3 glass-card rounded-2xl px-4 py-3 items-center gap-3"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div className="leading-tight">
                <div className="text-[11px] text-muted-foreground">Now Open</div>
                <div className="text-sm font-medium">11:00 AM — 10:00 PM</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
