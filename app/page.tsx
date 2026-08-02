tsx
import { PaymentForm } from "@/components/payment-form"

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-green-700 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">AKWA IBOM STATE REVENUE PORTAL</h1>
      </header>
      <PaymentForm />
    </main>
  )
}
