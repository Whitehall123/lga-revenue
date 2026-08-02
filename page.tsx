tsx
import { AboutPortal } from "@/components/about-portal"
import { PaymentForm } from "@/components/payment-form"
import { SiteHeader } from "@/components/site-header"

export default function Page() {
  return (
    <main className="min-h-screen bg-background font-sans">
      <SiteHeader />
      <AboutPortal />
      <PaymentForm />
    </main>
  )
}
