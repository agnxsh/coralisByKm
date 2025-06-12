'use server';

import { cookies } from 'next/headers';
import { addToCartMutation, createCartMutation, getCartQuery, removeFromCartMutation, updateCartLinesMutation } from './queries';

const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_API_ACCESS_TOKEN;
const endpoint = process.env.NEXT_PUBLIC_API_URL!;

//----------------------------------------------------//
//                Get Cart Details                    //
//----------------------------------------------------//
export async function getCart(cartId: string) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
      body: JSON.stringify({
        query: getCartQuery,
        variables: { cartId },
      }),
    });

    const result = await response.json();

    if (result.data?.cart) {
      return { 
        success: true, 
        cart: result.data.cart 
      };
    } else {
      return { 
        success: false, 
        message: 'Cart not found' 
      };
    }
  } catch (error) {
    console.error('Error fetching cart details:', error);
    return { 
      success: false, 
      message: 'An error occurred while fetching cart details' 
    };
  }
}

// Types for cart response
export type Money = {
  amount: string;
  currencyCode: string;
};

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    availableForSale: boolean;
    price: Money;
    compareAtPrice?: Money;
    image?: {
      url: string;
      altText?: string;
      width: number;
      height: number;
    };
    product: {
      handle: string;
      title: string;
      id: string;
    };
    selectedOptions: {
      name: string;
      value: string;
    }[];
  };
  attributes: {
    key: string;
    value: string;
  }[];
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: {
    edges: {
      node: CartLine;
    }[];
  };
  attributes: {
    key: string;
    value: string;
  }[];
  cost: {
    totalAmount: Money;
    subtotalAmount: Money;
    totalTaxAmount: Money;
  };
  buyerIdentity: {
    email?: string;
    phone?: string;
    customer?: {
      id: string;
      email: string;
      firstName?: string;
      lastName?: string;
      displayName?: string;
    };
    countryCode?: string;
  };
};

//----------------------------------------------------//
//                GET Cart ID                         //
//----------------------------------------------------//
export async function getCartId() {
  const cookieStore = await cookies();
  return cookieStore.get('cartId')?.value;
}

//----------------------------------------------------//
//                Create Cart                         //
//----------------------------------------------------//
export async function createCart(lines: { merchandiseId: string; quantity: number }[]) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
      body: JSON.stringify({
        query: createCartMutation,
        variables: {
          input: {
            lines,
          },
        },
      }),
    });

    const result = await response.json();

    if (result.data?.cartCreate?.cart) {
      // Store cart ID in cookies
      const cookieStore = await cookies();
      cookieStore.set('cartId', result.data.cartCreate.cart.id);
      return { success: true, cart: result.data.cartCreate.cart };
    } else {
      return { success: false, message: 'Failed to create cart' };
    }
  } catch (error) {
    console.error('Error creating cart:', error);
    return { success: false, message: 'An error occurred while creating the cart' };
  }
}

//----------------------------------------------------//
//                Add to Cart                         //
//----------------------------------------------------//
export async function addToCart(cartId: string, merchandiseId: string, quantity: number) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
      body: JSON.stringify({
        query: addToCartMutation,
        variables: {
          cartId,
          lines: [
            {
              merchandiseId,
              quantity,
            },
          ],
        },
      }),
    });

    const result = await response.json();

    console.log(result, merchandiseId, quantity);

    if (result.data?.cartLinesAdd?.cart) {
      return { success: true, cart: result.data.cartLinesAdd.cart };
    } else {
      return { success: false, message: 'Failed to add item to cart' };
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    return { success: false, message: 'An error occurred while adding to cart' };
  }
}

//----------------------------------------------------//
//                Update Cart Quantity                //
//----------------------------------------------------//
export async function updateCartItemQuantity(cartId: string, lineId: string, quantity: number) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
      body: JSON.stringify({
        query: updateCartLinesMutation,
        variables: {
          cartId,
          lines: [
            {
              id: lineId,
              quantity,
            },
          ],
        },
      }),
    });

    const result = await response.json();

    if (result.data?.cartLinesUpdate?.cart) {
      return { success: true, cart: result.data.cartLinesUpdate.cart };
    } else {
      return { success: false, message: 'Failed to update cart quantity' };
    }
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    return { success: false, message: 'An error occurred while updating cart quantity' };
  }
}

//----------------------------------------------------//
//                Remove from Cart                    //
//----------------------------------------------------//
export async function removeFromCart(cartId: string, lineId: string) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
      body: JSON.stringify({
        query: removeFromCartMutation,
        variables: {
          cartId,
          lineIds: [lineId],
        },
      }),
    });

    const result = await response.json();

    if (result.data?.cartLinesRemove?.cart) {
      return { success: true, cart: result.data.cartLinesRemove.cart };
    } else {
      return { success: false, message: 'Failed to remove item from cart' };
    }
  } catch (error) {
    console.error('Error removing from cart:', error);
    return { success: false, message: 'An error occurred while removing from cart' };
  }
} 