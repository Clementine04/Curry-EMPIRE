"use client"

import { useEffect, useMemo, useState } from "react"
import { Clock, Copy, Facebook, MapPin, Phone, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCurry, campaignLabel } from "./state"
import { CATERING_SERVICES } from "@/lib/catering-data"
import { toast } from "sonner"
import {
  CURRY_MESSENGER_URL,
  RESTAURANT_PHONE,
  phoneHref,
} from "@/lib/contact-links"

const ADDRESS = "Dona Fronie Avenue, San Fermin, Cauayan City, Isabela"
const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Curry Empire, " + ADDRESS,
)}`
const FB = CURRY_MESSENGER_URL

type InquiryType = "Order" | "Dine In" | "Take Out" | "Catering / Events"

export function ContactSection() {
  const {
    selectedService,
    campaign,
    campaignSource,
    promotedItemDetails,
    promotedServiceDetails,
    recordInquiry,
  } = useCurry()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [type, setType] = useState<InquiryType>("Order")
  const [serviceSlug, setServiceSlug] = useState<string>("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (selectedService) {
      setType("Catering / Events")
      setServiceSlug(selectedService)
    }
  }, [selectedService])

  const serviceName = useMemo(
    () => CATERING_SERVICES.find((s) => s.slug === serviceSlug)?.name ?? "",
    [serviceSlug],
  )

  const formatted = useMemo(() => {
    const lines: string[] = []
    lines.push("New Inquiry - Curry Empire Cauayan")
    lines.push("")
    lines.push("Customer:")
    lines.push(`Name: ${name || "-"}`)
    lines.push(`Phone: ${phone || "-"}`)
    lines.push("")
    lines.push(`Inquiry Type: ${type}`)
    if (type === "Catering / Events" && serviceName) {
      lines.push(`Selected Service: ${serviceName}`)
    }
    lines.push(`Message: ${message || "-"}`)
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
    }
    lines.push("")
    lines.push(`Submitted: ${new Date().toLocaleString()}`)
    return lines.join("\n")
  }, [
    name,
    phone,
    type,
    serviceName,
    message,
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
    recordInquiry(0)
    setSubmitted(true)
  }

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(formatted)
      toast.success("Inquiry message copied")
    } catch {
      toast.error("Could not copy. Please try again.")
    }
  }

  const openMessenger = async () => {
    const messengerTab = window.open("", "_blank")
    try {
      await navigator.clipboard.writeText(formatted)
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
    <section id="contact" className="py-14 sm:py-24">
      <div className="mx-auto max-w-7xl px-3 min-[380px]:px-4 sm:px-6">
        <div className="flex flex-col items-center text-center gap-3 mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-[0.18em] text-gold-deep">
            Contact
          </span>
          <h2 className="font-serif text-2xl min-[380px]:text-3xl sm:text-4xl lg:text-5xl tracking-tight text-balance">
            Contact & Booking Inquiry
          </h2>
          <p className="text-muted-foreground max-w-xl text-pretty">
            Reach out for orders, reservations, or catering. We&apos;ll respond
            promptly during open hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-[420px_1fr] gap-5 lg:gap-8">
          <div className="space-y-4">
            <InfoCard icon={MapPin} title="Visit" lines={[ADDRESS]} />
            <InfoCard
              icon={Clock}
              title="Open Hours"
              lines={["Open daily", "11:00 AM - 10:00 PM"]}
            />
            <InfoCard icon={Phone} title="Call" lines={[RESTAURANT_PHONE]} />
            <div className="grid grid-cols-1 min-[380px]:grid-cols-3 gap-2">
              <Button asChild className="rounded-full h-11 bg-foreground text-background hover:bg-foreground/90 text-xs">
                <a href={phoneHref(RESTAURANT_PHONE)}>
                  <Phone className="h-3.5 w-3.5" /> Call
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full h-11 border-foreground/10 bg-transparent text-xs">
                <a href={FB} target="_blank" rel="noreferrer">
                  <Facebook className="h-3.5 w-3.5" /> Messenger
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full h-11 border-foreground/10 bg-transparent text-xs">
                <a href={MAPS} target="_blank" rel="noreferrer">
                  <MapPin className="h-3.5 w-3.5" /> Maps
                </a>
              </Button>
            </div>
          </div>

          <div className="glass-card rounded-[1.35rem] min-[380px]:rounded-3xl p-3.5 min-[380px]:p-5 sm:p-7">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="grid gap-3">
                {campaign ? (
                  <div className="rounded-2xl border border-gold/30 bg-gold-soft/35 p-4 text-sm">
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

                <div className="grid sm:grid-cols-2 gap-3">
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
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Inquiry Type">
                    <Select
                      value={type}
                      onValueChange={(v) => setType(v as InquiryType)}
                    >
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Order">Order</SelectItem>
                        <SelectItem value="Dine In">Dine In</SelectItem>
                        <SelectItem value="Take Out">Take Out</SelectItem>
                        <SelectItem value="Catering / Events">
                          Catering / Events
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  {type === "Catering / Events" && (
                    <Field label="Selected Service">
                      <Select value={serviceSlug} onValueChange={setServiceSlug}>
                        <SelectTrigger className="h-11 rounded-xl">
                          <SelectValue placeholder="Choose a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATERING_SERVICES.map((s) => (
                            <SelectItem key={s.slug} value={s.slug}>
                              {s.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                </div>

                <Field label="Message / Notes">
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your event, expected guests, dates, or special requests..."
                    rows={5}
                    className="rounded-xl"
                  />
                </Field>

                <Button
                  type="submit"
                  className="mt-1 h-12 rounded-full bg-foreground text-background hover:bg-foreground/90"
                >
                  Submit Inquiry
                </Button>
                <p className="text-[11px] text-muted-foreground text-center">
                  Inquiry only. No payment is processed.
                </p>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="text-sm font-medium">
                  Inquiry ready to send
                </div>
                <div className="rounded-2xl bg-foreground/5 p-4">
                  <pre className="text-[12px] whitespace-pre-wrap leading-relaxed font-mono text-foreground/85">
                    {formatted}
                  </pre>
                </div>
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
        </div>
      </div>
    </section>
  )
}

function InfoCard({
  icon: Icon,
  title,
  lines,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  lines: string[]
}) {
  return (
    <div className="glass-card rounded-[1.35rem] min-[380px]:rounded-3xl p-3.5 min-[380px]:p-5 flex items-start gap-3 min-[380px]:gap-4">
      <span className="h-10 w-10 grid place-items-center rounded-2xl gold-gradient flex-shrink-0">
        <Icon className="h-4 w-4 text-foreground/80" />
      </span>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {title}
        </div>
        {lines.map((l, i) => (
          <div key={i} className="break-words text-sm text-foreground leading-relaxed">
            {l}
          </div>
        ))}
      </div>
    </div>
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
