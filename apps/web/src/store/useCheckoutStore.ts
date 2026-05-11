import { create } from 'zustand'

export interface ShippingAddress {
  fullName:  string
  email:     string
  phone:     string
  address:   string
  city:      string
  zip:       string
  country:   string
}

export type DeliveryMethod = 'standard' | 'express'
export type PaymentMethod  = 'card' | 'apple_pay' | 'google_pay' | 'paypal' | 'upi' | 'wallet'
export type CheckoutStep   = 'bag' | 'details' | 'payment' | 'confirmation'

interface CheckoutStore {
  step:           CheckoutStep
  shipping:       ShippingAddress | null
  delivery:       DeliveryMethod
  payment:        PaymentMethod
  orderId:        string | null
  saveInfo:       boolean

  setStep:        (step: CheckoutStep) => void
  setShipping:    (data: ShippingAddress) => void
  setDelivery:    (method: DeliveryMethod) => void
  setPayment:     (method: PaymentMethod) => void
  setOrderId:     (id: string) => void
  setSaveInfo:    (v: boolean) => void
  reset:          () => void
}

const DEFAULT_SHIPPING: ShippingAddress = {
  fullName: '', email: '', phone: '',
  address: '', city: '', zip: '', country: 'United States',
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  step:     'bag',
  shipping: null,
  delivery: 'standard',
  payment:  'card',
  orderId:  null,
  saveInfo: false,

  setStep:     (step)     => set({ step }),
  setShipping: (shipping) => set({ shipping }),
  setDelivery: (delivery) => set({ delivery }),
  setPayment:  (payment)  => set({ payment }),
  setOrderId:  (orderId)  => set({ orderId }),
  setSaveInfo: (saveInfo) => set({ saveInfo }),
  reset: () => set({
    step: 'bag', shipping: null, delivery: 'standard',
    payment: 'card', orderId: null, saveInfo: false,
  }),
}))