"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, ShoppingBag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCurry } from "./state"
import { cn } from "@/lib/utils"

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Order", href: "#order" },
  { label: "Catering", href: "#catering" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
]

export function Header() {
  const { cartCount, setCartOpen } = useCurry()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleNav = (href: string) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-3",
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-7xl px-2.5 min-[380px]:px-4 sm:px-6 transition-all duration-300",
        )}
      >
        <div
          className={cn(
            "glass-strong rounded-3xl flex items-center justify-between gap-2 min-[380px]:gap-3 px-2.5 min-[380px]:px-4 sm:px-5 transition-all duration-300",
            scrolled ? "py-2.5" : "py-3.5",
          )}
        >
          <button
            onClick={() => handleNav("#home")}
            className="flex min-w-0 items-center gap-2 min-[380px]:gap-2.5 group"
          >
            <span className="grid place-items-center h-8 w-8 min-[380px]:h-9 min-[380px]:w-9 rounded-2xl gold-gradient text-primary-foreground font-serif text-sm min-[380px]:text-base shadow-sm flex-shrink-0">
              <span className="text-foreground/90">CE</span>
            </span>
            <div className="leading-tight text-left min-w-0">
              <div className="font-serif text-sm min-[380px]:text-[15px] sm:text-base text-foreground truncate">
                Curry Empire
              </div>
              <div className="text-[9px] min-[380px]:text-[10px] sm:text-[11px] text-muted-foreground tracking-wide uppercase">
                Cauayan
              </div>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <button
                key={n.href}
                onClick={() => handleNav(n.href)}
                className="px-3.5 py-1.5 rounded-full text-sm text-foreground/75 hover:text-foreground hover:bg-foreground/5 transition"
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex flex-shrink-0 items-center gap-1.5 min-[380px]:gap-2">
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
              className="relative h-9 w-9 min-[380px]:h-10 min-[380px]:w-10 grid place-items-center rounded-full bg-foreground/5 hover:bg-foreground/10 transition"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 grid place-items-center h-5 min-w-5 px-1 rounded-full text-[10px] font-medium bg-foreground text-background">
                  {cartCount}
                </span>
              )}
            </button>
            <Button
              onClick={() => handleNav("#order")}
              className="hidden sm:inline-flex rounded-full px-4 h-10 bg-foreground text-background hover:bg-foreground/90"
            >
              Start Order
            </Button>
            <button
              className="lg:hidden h-9 w-9 min-[380px]:h-10 min-[380px]:w-10 grid place-items-center rounded-full bg-foreground/5 hover:bg-foreground/10 transition"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
            >
              {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="lg:hidden mt-2 glass-strong rounded-3xl p-2"
            >
              <div className="flex flex-col">
                {NAV.map((n) => (
                  <button
                    key={n.href}
                    onClick={() => handleNav(n.href)}
                    className="text-left px-4 py-3 rounded-2xl text-sm hover:bg-foreground/5 transition"
                  >
                    {n.label}
                  </button>
                ))}
                <Button
                  onClick={() => handleNav("#order")}
                  className="mt-1 mx-1 rounded-2xl bg-foreground text-background hover:bg-foreground/90"
                >
                  Start Order
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
