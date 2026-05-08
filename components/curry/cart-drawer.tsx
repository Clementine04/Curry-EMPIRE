"use client"

import { useState } from "react"
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCurry } from "./state"
import { MENU } from "@/lib/menu-data"
import { FoodImage } from "./food-image"
import { InquiryForm } from "./inquiry-form"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

export function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    setQty,
    removeFromCart,
    clearCart,
    cartSubtotal,
    orderType,
  } = useCurry()
  const isMobile = useIsMobile()
  const [step, setStep] = useState<"cart" | "inquiry">("cart")

  const onClose = () => {
    setCartOpen(false)
    setTimeout(() => setStep("cart"), 200)
  }

  return (
    <Sheet
      open={cartOpen}
      onOpenChange={(o) => {
        if (!o) onClose()
        else setCartOpen(true)
      }}
    >
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        showCloseButton={false}
        className={cn(
          "p-0 border-foreground/10 bg-background/85 backdrop-blur-2xl",
          isMobile
            ? "rounded-t-3xl h-[90dvh] max-h-[90dvh]"
            : "w-full sm:max-w-md rounded-l-3xl",
        )}
      >
        <SheetHeader className="px-3.5 min-[380px]:px-5 pt-4 min-[380px]:pt-5 pb-3 border-b border-foreground/5">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-serif text-lg min-[380px]:text-xl flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              {step === "cart" ? "Your Order" : "Order Inquiry"}
            </SheetTitle>
            <button
              onClick={onClose}
              className="h-9 w-9 grid place-items-center rounded-full hover:bg-foreground/5"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="text-xs text-muted-foreground capitalize">
            {orderType === "dine-in" ? "Dine In" : "Take Out"} · Inquiry only — no payment
          </div>
        </SheetHeader>

        {step === "cart" ? (
          <div className="flex flex-col h-[calc(100%-72px)]">
            <div className="flex-1 overflow-y-auto px-3.5 min-[380px]:px-5 py-4 space-y-3">
              {cart.length === 0 ? (
                <div className="h-full grid place-items-center text-center px-6">
                  <div>
                    <div className="mx-auto mb-3 h-12 w-12 grid place-items-center rounded-2xl bg-foreground/5">
                      <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your cart is empty. Browse the menu and add your favorites.
                    </p>
                  </div>
                </div>
              ) : (
                cart.map((c) => {
                  const item = MENU.find((m) => m.slug === c.slug)
                  if (!item) return null
                  return (
                    <div
                      key={c.slug}
                      className="glass-card rounded-2xl p-2.5 min-[380px]:p-3 flex gap-3 items-center"
                    >
                      <div className="h-16 w-16 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                        <FoodImage
                          category={item.category}
                          slug={item.slug}
                          alt={item.name}
                          width={120}
                          height={120}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {item.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ₱{item.price}
                        </div>
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1 rounded-full bg-foreground/5 p-1">
                            <button
                              onClick={() => setQty(c.slug, c.qty - 1)}
                              className="h-7 w-7 grid place-items-center rounded-full hover:bg-foreground/10"
                              aria-label="Decrease"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="text-xs w-6 text-center">{c.qty}</span>
                            <button
                              onClick={() => setQty(c.slug, c.qty + 1)}
                              className="h-7 w-7 grid place-items-center rounded-full hover:bg-foreground/10"
                              aria-label="Increase"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(c.slug)}
                            className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            <div className="border-t border-foreground/5 px-3.5 min-[380px]:px-5 py-4 space-y-3 glass-strong">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal (estimate)</span>
                <span className="font-serif text-lg">₱{cartSubtotal}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={clearCart}
                  disabled={cart.length === 0}
                  className="rounded-full flex-1 border-foreground/10 bg-transparent"
                >
                  Clear
                </Button>
                <Button
                  onClick={() => setStep("inquiry")}
                  disabled={cart.length === 0}
                  className="rounded-full flex-1 bg-foreground text-background hover:bg-foreground/90"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <InquiryForm onBack={() => setStep("cart")} onClose={onClose} />
        )}
      </SheetContent>
    </Sheet>
  )
}
