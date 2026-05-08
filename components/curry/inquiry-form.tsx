"use client"

import { useMemo, useState } from "react"
import { ArrowLeft, Check, Copy, Phone, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCurry, campaignLabel } from "./state"
import { MENU } from "@/lib/menu-data"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import {
  CURRY_MESSENGER_URL,
  RESTAURANT_PHONE,
  phoneHref,
} from "@/lib/contact-links"

type Props = { onBack: () => void; onClose: () => void }

export function InquiryForm({ onBack }: Props) {
  const {
    cart,
    cartSubtotal,
    orderType,
    campaign,
    campaignSource,
    promotedItemDetails,
    promotedServiceDetails,
    recordInquiry,
  } = useCurry()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [guests, setGuests] = useState("")
  const [delivery, setDelivery] = useState<"pickup" | "delivery">("pickup")
  const [pickupTime, setPickupTime] = useState("")
  const [address, setAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"gcash" | "cash">("gcash")
  const [notes, setNotes] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const message = useMemo(() => {
    const lines: string[] = []
    lines.push("New Order Inquiry - Curry Empire Cauayan")
    lines.push("")
    lines.push("Customer:")
    lines.push(`Name: ${name || "-"}`)
    lines.push(`Phone: ${phone || "-"}`)
    lines.push("")
    lines.push(`Order Type: ${orderType === "dine-in" ? "Dine-in" : "Take-out"}`)
    if (orderType === "dine-in") {
      lines.push(`Date: ${date || "-"}`)
      lines.push(`Time: ${time || "-"}`)
      lines.push(`Guests: ${guests || "-"}`)
    } else {
      lines.push(`Method: ${delivery === "pickup" ? "Pickup" : "Delivery"}`)
      if (delivery === "pickup") {
        lines.push(`Estimated Pickup Time: ${pickupTime || "-"}`)
      }
      if (delivery === "delivery") {
        lines.push(`Delivery Address: ${address || "-"}`)
      }
    }
    lines.push(`Payment Method: ${paymentMethod === "gcash" ? "GCash" : "Cash"}`)
    lines.push("")
    if (campaign) {
      lines.push(
        `Campaign Source: ${campaignLabel(campaign)}${
          campaignSource ? ` (${campaignSource})` : ""
        }`,
      )
      if (promotedItemDetails) {
        lines.push(`Promoted Menu Item: ${promotedItemDetails.name}`)
      }
      if (promotedServiceDetails) {
        lines.push(`Promoted Service: ${promotedServiceDetails.name}`)
      }
      lines.push("")
    }
    lines.push("Items:")
    cart.forEach((c) => {
      const item = MENU.find((m) => m.slug === c.slug)
      if (item) {
        lines.push(`- ${c.qty}x ${item.name} - PHP ${item.price * c.qty}`)
      }
    })
    lines.push("")
    lines.push(`Total Estimated Amount: PHP ${cartSubtotal}`)
    lines.push("")
    lines.push(`Notes: ${notes || "-"}`)
    lines.push("")
    lines.push(`Submitted: ${new Date().toLocaleString()}`)
    return lines.join("\n")
  }, [
    cart,
    cartSubtotal,
    orderType,
    name,
    phone,
    date,
    time,
    guests,
    delivery,
    pickupTime,
    address,
    paymentMethod,
    notes,
    campaign,
    campaignSource,
    promotedItemDetails,
    promotedServiceDetails,
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone) {
      toast.error("Please fill in your name and phone number.")
      return
    }
    recordInquiry(cartSubtotal)
    setSubmitted(true)
  }

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message)
      toast.success("Inquiry message copied")
    } catch {
      toast.error("Could not copy. Please try again.")
    }
  }

  const openMessenger = async () => {
    const messengerTab = window.open("", "_blank")
    try {
      await navigator.clipboard.writeText(message)
      toast.success("Inquiry copied for Messenger", {
        description: "Paste it into Curry Empire's chat, then send.",
      })
    } catch {
      toast.error("Could not copy automatically", {
        description: "Copy the inquiry first, then paste it in Messenger.",
      })
    }

    if (messengerTab) {
      messengerTab.opener = null
      messengerTab.location.href = CURRY_MESSENGER_URL
    } else {
      window.location.href = CURRY_MESSENGER_URL
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col h-[calc(100%-72px)]"
    >
      <div className="flex-1 overflow-y-auto px-3.5 min-[380px]:px-5 py-4 space-y-4">
        {!submitted ? (
          <>
            <button
              type="button"
              onClick={onBack}
              className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to cart
            </button>

            <div className="grid gap-3">
              {campaign ? (
                <div className="rounded-2xl border border-gold/30 bg-gold-soft/35 p-3.5 min-[380px]:p-4 text-sm">
                  <div className="text-[11px] uppercase tracking-[0.16em] text-gold-deep">
                    Campaign Context
                  </div>
                  <div className="mt-1 font-medium">
                    {campaignLabel(campaign)}
                    {campaignSource ? ` · ${campaignSource}` : ""}
                  </div>
                  {promotedItemDetails ? (
                    <div className="mt-1 text-muted-foreground">
                      Promoted menu item: {promotedItemDetails.name}
                    </div>
                  ) : null}
                  {promotedServiceDetails ? (
                    <div className="mt-1 text-muted-foreground">
                      Promoted service: {promotedServiceDetails.name}
                    </div>
                  ) : null}
                </div>
              ) : null}

              <Field label="Name">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="h-11 rounded-xl"
                  required
                />
              </Field>
              <Field label="Phone number">
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+63 ___ ___ ____"
                  className="h-11 rounded-xl"
                  required
                />
              </Field>

              {orderType === "dine-in" ? (
                <>
                  <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-3">
                    <Field label="Date">
                      <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="h-11 rounded-xl"
                      />
                    </Field>
                    <Field label="Time">
                      <Input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="h-11 rounded-xl"
                      />
                    </Field>
                  </div>
                  <Field label="Number of guests">
                    <Input
                      type="number"
                      min={1}
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      placeholder="2"
                      className="h-11 rounded-xl"
                    />
                  </Field>
                </>
              ) : (
                <>
                  <Field label="Method">
                    <div className="grid grid-cols-2 gap-2">
                      {(["pickup", "delivery"] as const).map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setDelivery(m)}
                          className={cn(
                            "h-11 rounded-xl text-sm transition",
                            delivery === m
                              ? "bg-foreground text-background"
                              : "glass border border-foreground/10",
                          )}
                        >
                          {m === "pickup" ? "Pickup" : "Delivery"}
                        </button>
                      ))}
                    </div>
                  </Field>
                  {delivery === "pickup" && (
                    <Field label="Estimated pickup time">
                      <Input
                        type="time"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="h-11 rounded-xl"
                      />
                    </Field>
                  )}
                  {delivery === "delivery" && (
                    <Field label="Delivery address">
                      <Textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Street, barangay, city"
                        className="rounded-xl"
                        rows={2}
                      />
                    </Field>
                  )}
                </>
              )}

              <Field label="Payment method">
                <div className="grid grid-cols-2 gap-2">
                  {(["gcash", "cash"] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={cn(
                        "h-11 rounded-xl text-sm transition",
                        paymentMethod === method
                          ? "bg-foreground text-background"
                          : "glass border border-foreground/10",
                      )}
                    >
                      {method === "gcash" ? "GCash" : "Cash"}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Notes">
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Allergies, special requests..."
                  className="rounded-xl"
                  rows={3}
                />
              </Field>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-700">
              <span className="h-7 w-7 grid place-items-center rounded-full bg-emerald-500/15">
                <Check className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium">Inquiry ready to send</span>
            </div>
            <div className="glass-card rounded-2xl p-3 min-[380px]:p-4">
              <pre className="text-[12px] whitespace-pre-wrap leading-relaxed font-mono text-foreground/85">
                {message}
              </pre>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-foreground/5 px-3.5 min-[380px]:px-5 py-4 glass-strong">
        {!submitted ? (
          <Button
            type="submit"
            className="w-full h-12 rounded-full bg-foreground text-background hover:bg-foreground/90"
          >
            Submit Order Inquiry
          </Button>
        ) : (
          <div className="grid gap-2">
            <div className="grid grid-cols-1 min-[380px]:grid-cols-3 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={copyMessage}
                className="rounded-full border-foreground/10 bg-transparent text-xs"
              >
                <Copy className="h-3.5 w-3.5" /> Copy
              </Button>
              <Button
                type="button"
                onClick={openMessenger}
                className="rounded-full bg-foreground text-background hover:bg-foreground/90 text-xs"
              >
                <Send className="h-3.5 w-3.5" /> Messenger
              </Button>
              <Button
                type="button"
                variant="outline"
                asChild
                className="rounded-full border-foreground/10 bg-transparent text-xs"
              >
                <a href={phoneHref(RESTAURANT_PHONE)}>
                  <Phone className="h-3.5 w-3.5" /> Call
                </a>
              </Button>
            </div>
            <p className="text-[11px] text-muted-foreground text-center">
              Copies the inquiry, then opens Curry Empire on Messenger. Paste and send it there.
            </p>
          </div>
        )}
      </div>
    </form>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground font-normal">
        {label}
      </Label>
      {children}
    </div>
  )
}
