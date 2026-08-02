jsx
"use client"
import { useState } from "react"
import { CheckCircle2, Download } from "lucide-react"
import { AKWA_IBOM_LGAS, REVENUE_TYPES } from "@/lib/akwa-ibom"

type Receipt = {
  reference: string
  issuedAt: string
  payerName: string
  lga: string
  revenueType: string
  amount: string
}

const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 2,
})

const fieldClass = "w-full rounded-lg border-2 border-brand bg-card px-3 py-3 text-base text-foreground outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/30"
const labelClass = "mb-1.5 block text-sm font-semibold text-brand"
const buttonClass = "w-full rounded-lg bg-gold px-4 py-3.5 text-base font-bold text-gold-foreground transition-colors hover:bg-brand focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2"

export function PaymentForm() {
  const [lga, setLga] = useState("")
  const [payerName, setPayerName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [taxId, setTaxId] = useState("")
  const [revenueType, setRevenueType] = useState("")
  const [amount, setAmount] = useState("")
  const [error, setError] = useState("")
  const [receipt, setReceipt] = useState<Receipt | null>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const parsedAmount = Number(amount)
    if (!lga || !payerName.trim() || !phone.trim() || !revenueType) {
      setError("Please complete your LGA, name, phone number and revenue type before submitting.")
      return
    }
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError("Enter a valid payment amount greater than zero.")
      return
    }
    setError("")
    setReceipt({
      reference: `AKS-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 9000 + 1000)}`,
      issuedAt: new Date().toLocaleString("en-NG", { dateStyle: "long", timeStyle: "short" }),
      payerName: payerName.trim(),
      lga,
      revenueType,
      amount: nairaFormatter.format(parsedAmount),
    })
  }

  function handleNewPayment() {
    setReceipt(null)
    setPayerName("")
    setPhone("")
    setEmail("")
    setTaxId("")
    setRevenueType("")
    setAmount("")
  }

  function handleDownloadPDF() {
    if (!receipt) return
    const html = `
      <html><head><title>Receipt - ${receipt.reference}</title></head>
      <body style="font-family: Arial; padding: 20px;">
        <h1>AKWA IBOM STATE GOVERNMENT</h1>
        <h2>Revenue Payment Receipt</h2>
        <p><strong>Reference:</strong> ${receipt.reference}</p>
        <p><strong>Payer:</strong> ${receipt.payerName}</p>
        <p><strong>LGA:</strong> ${receipt.lga}</p>
        <p><strong>Revenue Type:</strong> ${receipt.revenueType}</p>
        <p><strong>Amount:</strong> ${receipt.amount}</p>
        <p><strong>Date:</strong> ${receipt.issuedAt}</p>
      </body></html>
    `
    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `receipt-${receipt.reference}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (receipt) {
    return (
      <section className="bg-brand-subtle px-4 py-10">
        <div className="mx-auto w-full max-w-xl rounded-xl border-t-4 border-gold bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="size-6 text-brand" />
            <h2 className="text-lg font-bold text-brand">Payment recorded</h2>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Keep the reference number for your records.</p>
          <dl className="mt-5 flex-col gap-3 border-t pt-5">
            {[
              ["Reference", receipt.reference],
              ["Payer", receipt.payerName],
              ["LGA", receipt.lga],
              ["Revenue Type", receipt.revenueType],
              ["Amount", receipt.amount],
              ["Date", receipt.issuedAt],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="text-sm font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
          <button onClick={handleDownloadPDF} className={`mt-4 flex items-center justify-center gap-2 ${buttonClass}`}>
            <Download className="size-4" /> Download Receipt
          </button>
          <button onClick={handleNewPayment} className={`mt-3 ${buttonClass}`}>Make another payment</button>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-brand-subtle px-4 py-10">
      <div className="mx-auto w-full max-w-xl">
        <h2 className="text-xl font-bold text-brand">Register your revenue, tax or levy payment</h2>
        <form onSubmit={handleSubmit} className="mt-7 rounded-xl border-t-4 border-gold bg-card p-5 shadow-sm">
          <div className="flex flex-col gap-5">
            <div>
              <label className={labelClass}>Local Government Area</label>
              <select value={lga} onChange={(e) => setLga(e.target.value)} className={fieldClass}>
                <option value="">-- Choose one of the 31 LGAs --</option>
                {AKWA_IBOM_LGAS.map((name) => <option key={name} value={name}>{name}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Full name / business name</label>
              <input type="text" value={payerName} onChange={(e) => setPayerName(e.target.value)} className={fieldClass} placeholder="e.g. Emem Udo Enterprises" />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Phone number</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={fieldClass} placeholder="080..." />
              </div>
              <div>
                <label className={labelClass}>Email (optional)</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={fieldClass} placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Revenue / tax / levy type</label>
              <select value={revenueType} onChange={(e) => setRevenueType(e.target.value)} className={fieldClass}>
                <option value="">-- Choose a payment type --</option>
                {REVENUE_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Amount (₦)</label>
              <input type="number" min="1" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} className={fieldClass} placeholder="0.00" />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button type="submit" className={buttonClass}>Generate Receipt & Pay</button>
          </div>
        </form>
      </div>
    </section>
  )
}
