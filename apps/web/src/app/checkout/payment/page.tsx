'use client'

import { useRouter } from 'next/navigation'
import Navbar from '../../../components/layout/Navbar'
import CheckoutStepper from '../../../components/checkout/CheckoutStepper'
import PaymentForm from '../../../components/checkout/PaymentForm'
import { useCheckoutStore } from '../../../store/useCheckoutStore'

export default function PaymentPage() {
  const router    = useRouter()
  const setOrderId = useCheckoutStore((s) => s.setOrderId)

  const handleSuccess = (orderId: string) => {
    setOrderId(orderId)
    router.push(`/checkout/confirmation?order=${orderId}`)
  }

  return (
    <div className="min-h-screen bg-velore-black">
      <Navbar />
      <div className="pt-28 pb-20 px-6 md:px-12 lg:px-16 max-w-screen-xl mx-auto">
        <div className="mb-10">
          <CheckoutStepper currentStep={3} />
        </div>
        <PaymentForm
          onBack={() => router.push('/checkout/details')}
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  )
}