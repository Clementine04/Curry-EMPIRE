"use client"

import { motion } from "framer-motion"
import { CalendarHeart, MessageSquareText, Sparkles, UtensilsCrossed } from "lucide-react"

const STEPS = [
  {
    icon: UtensilsCrossed,
    title: "Choose Dine In or Take Out",
    text: "Pick how you'd like to enjoy Curry Empire. The menu adapts automatically.",
  },
  {
    icon: Sparkles,
    title: "Add food and smart pairings",
    text: "Build your order and discover dishes that pair beautifully together.",
  },
  {
    icon: MessageSquareText,
    title: "Submit order inquiry",
    text: "Send a clean inquiry message to the staff group chat. No payment needed.",
  },
  {
    icon: CalendarHeart,
    title: "Explore catering",
    text: "Browse event services, view past setups, and book through Contact.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-14 sm:py-24">
      <div className="mx-auto max-w-7xl px-3 min-[380px]:px-4 sm:px-6">
        <div className="flex flex-col items-center text-center gap-3 mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-[0.18em] text-gold-deep">
            How It Works
          </span>
          <h2 className="font-serif text-2xl min-[380px]:text-3xl sm:text-4xl lg:text-5xl tracking-tight text-balance">
            A smoother way to order
          </h2>
          <p className="text-muted-foreground max-w-xl text-pretty">
            Four simple steps to enjoy Curry Empire — for casual dining, quick
            take-outs, or planned events.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass-card rounded-[1.35rem] min-[380px]:rounded-3xl p-4 min-[380px]:p-6 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <span className="h-11 w-11 grid place-items-center rounded-2xl gold-gradient">
                  <s.icon className="h-5 w-5 text-foreground/80" />
                </span>
                <span className="font-serif text-xl text-muted-foreground/60">
                  0{i + 1}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-base text-balance">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed text-pretty">
                  {s.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
