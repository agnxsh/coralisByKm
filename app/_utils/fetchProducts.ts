'use server'
const API_URL = process.env.NEXT_PUBLIC_API_URL!
console.log("API_URL", API_URL)

const gql = String.raw

const productQuery = gql`
query Products {
  products(first: 20) {
    edges {
      node {
        id
        title
        description
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 1) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
              availableForSale
            }
          }
        }
      }
    }
  }
}`

export interface Product {
  id: string
  title: string
  description: string
  handle: string
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  images: {
    edges: {
      node: {
        url: string
        altText: string
      }
    }[]
  }
  variants: {
    edges: {
      node: {
        id: string
        availableForSale: boolean
      }
    }[]
  }
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL || !process.env.NEXT_PUBLIC_ACCESS_KEY) {
      throw new Error('Missing required environment variables: NEXT_PUBLIC_API_URL or NEXT_PUBLIC_ACCESS_KEY')
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_ACCESS_TOKEN!,
      },
      body: JSON.stringify({
        query: productQuery,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log("data", data)

    if (data.errors) {
      throw new Error(`GraphQL Error: ${data.errors[0].message}`)
    }

    if (!data.data?.products?.edges) {
      throw new Error('Invalid response structure')
    }

    return data.data.products.edges.map((edge: any) => edge.node)
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}


