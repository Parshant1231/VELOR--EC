'use client'

import { useRouter } from 'next/navigation'
import Navbar from '../../../components/layout/Navbar'
import CheckoutStepper from '../../../components/checkout/CheckoutStepper'
import ShippingForm from '../../../components/checkout/ShippingForm'

export default function DetailsPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-velore-black">
      <Navbar />
      <div className="pt-28 pb-20 px-6 md:px-12 lg:px-16 max-w-screen-xl mx-auto">
        <div className="mb-10">
          <CheckoutStepper currentStep={2} />
        </div>
        <ShippingForm
          onNext={() => router.push('/checkout/payment')}
          onBack={() => router.push('/cart')}
        />
      </div>
    </div>
  )
}