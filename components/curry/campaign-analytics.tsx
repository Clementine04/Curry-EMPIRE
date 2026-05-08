"use client"

import { motion } from "framer-motion"
import { BarChart3 } from "lucide-react"
import { campaignLabel, useCurry } from "./state"

export function CampaignAnalytics() {
  const { analytics } = useCurry()
  const entries = Object.entries(analytics)

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="glass-card rounded-3xl p-5 sm:p-7"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className="h-9 w-9 grid place-items-center rounded-2xl gold-gradient">
                <BarChart3 className="h-4 w-4 text-foreground/80" />
              </span>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  Demo Admin
                </div>
                <h3 className="font-serif text-lg sm:text-xl">
                  Campaign Analytics
                </h3>
              </div>
            </div>
            <span className="hidden sm:inline-flex glass rounded-full px-3 py-1 text-[11px] text-muted-foreground">
              Local mock — Facebook ad link tracking
            </span>
          </div>

          {entries.length === 0 ? (
            <div className="rounded-2xl bg-foreground/5 p-6 text-sm text-muted-foreground text-center">
              No campaign visits yet. Try opening a tracked link such as{" "}
              <code className="font-mono text-foreground">
                ?campaign=biryani_ad&amp;item=chicken_biryani
              </code>{" "}
              to populate this card.
            </div>
          ) : (
            <div className="overflow-x-auto -mx-2 sm:mx-0">
              <table className="w-full text-sm min-w-[520px]">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    <th className="text-left font-normal py-2 px-2">Campaign</th>
                    <th className="text-right font-normal py-2 px-2">Visits</th>
                    <th className="text-right font-normal py-2 px-2">Inquiries</th>
                    <th className="text-right font-normal py-2 px-2">
                      Est. Order Value
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-foreground/5">
                  {entries.map(([k, v]) => (
                    <tr key={k}>
                      <td className="py-3 px-2 font-medium">
                        {campaignLabel(k)}
                      </td>
                      <td className="py-3 px-2 text-right tabular-nums">
                        {v.visits}
                      </td>
                      <td className="py-3 px-2 text-right tabular-nums">
                        {v.inquiries}
                      </td>
                      <td className="py-3 px-2 text-right tabular-nums">
                        ₱{v.estValue.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
