import { CurryProvider } from "@/components/curry/state"
import { Header } from "@/components/curry/header"
import { Hero } from "@/components/curry/hero"
import { CampaignBanner } from "@/components/curry/campaign-banner"
import { MenuSection } from "@/components/curry/menu-section"
import { CateringSection } from "@/components/curry/catering-section"
import { HowItWorks } from "@/components/curry/how-it-works"
import { ContactSection } from "@/components/curry/contact-section"
import { CartDrawer } from "@/components/curry/cart-drawer"
import { PairingSuggestion } from "@/components/curry/pairing-suggestion"
import { Footer } from "@/components/curry/footer"

export default function Page() {
  return (
    <CurryProvider>
      <Header />
      <CampaignBanner />
      <main>
        <Hero />
        <MenuSection />
        <CateringSection />
        <HowItWorks />
        <ContactSection />
      </main>
      <Footer />
      <CartDrawer />
      <PairingSuggestion />
    </CurryProvider>
  )
}
