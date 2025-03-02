"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    name: "Hydrating Facial Cleanser",
    price: 24.99,
    image: "/placeholder.svg?height=100&width=100",
    quantity: 1,
  },
  {
    id: 5,
    name: "Hyaluronic Acid Serum",
    price: 42.99,
    image: "/placeholder.svg?height=100&width=100",
    quantity: 2,
  },
  {
    id: 9,
    name: "Mineral Sunscreen SPF 50",
    price: 32.99,
    image: "/placeholder.svg?height=100&width=100",
    quantity: 1,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setPromoApplied(true)
    }
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const discount = promoApplied ? subtotal * 0.1 : 0
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal - discount + shipping

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      +
                    </Button>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => removeItem(item.id)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6">
              <Input
                type="text"
                placeholder="Promo Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="mb-2"
              />
              <Button onClick={applyPromoCode} className="w-full">
                Apply Promo Code
              </Button>
            </div>

            <Button className="w-full mt-4" size="lg">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl mb-4">Your cart is empty</p>
          <Button>Continue Shopping</Button>
        </div>
      )}
    </div>
  )
}

