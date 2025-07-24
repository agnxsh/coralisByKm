import { Metadata } from "next"

import { listCartOptions, retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { StoreCartShippingOption } from "@medusajs/types"
import CartMismatchBanner from "@modules/layout/components/cart-mismatch-banner"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import FreeShippingPriceNudge from "@modules/shipping/components/free-shipping-price-nudge"
import { siteConfig } from "app/_utils/siteConfig"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: siteConfig().title,
    description: siteConfig().description,
    openGraph: {
      title: siteConfig().title,
      description: siteConfig().description,
      type: 'website',
      url: siteConfig().baseUrl,
      images: [
        {
          url: siteConfig().ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig().name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig().title,
      description: siteConfig().description,
      images: [siteConfig().ogImage],
      creator: siteConfig().twitter,
    },
  };
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  const customer = await retrieveCustomer()
  const cart = await retrieveCart()
  let shippingOptions: StoreCartShippingOption[] = []

  if (cart) {
    const { shipping_options } = await listCartOptions()

    shippingOptions = shipping_options
  }

  return (
    <>
      <Nav />
      {customer && cart && (
        <CartMismatchBanner customer={customer} cart={cart} />
      )}

      {cart && (
        <FreeShippingPriceNudge
          variant="popup"
          cart={cart}
          shippingOptions={shippingOptions}
        />
      )}
      {props.children}
      <Footer />
    </>
  )
}
