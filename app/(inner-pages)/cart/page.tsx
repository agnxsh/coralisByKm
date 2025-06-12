import { CartLine, getCart, getCartId } from '@/app/(auth)/_actions/cart';
import { formatPrice } from '@/app/_utils/formatPrice';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import CartItemActions from './CartItemActions';


export default async function CartPage() {
  const cartId = await getCartId();
  const { cart, success } = cartId ? await getCart(cartId) : { cart: null, success: false };

  if (!success || !cart || cart.lines.edges.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-playfair mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Start shopping to add items to your cart</p>
          <Button asChild>
            <Link href="/shop">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-playfair mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.lines.edges.map(({ node: item }: { node: CartLine }) => (
            <Card key={item.id} className="p-4">
              <div className="flex gap-4">
                {item.merchandise.image && (
                  <div className="relative w-24 h-24">
                    <Image
                      src={item.merchandise.image.url}
                      alt={item.merchandise.image.altText || item.merchandise.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{item.merchandise.product.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.merchandise.title}
                      </p>
                      {item.merchandise.selectedOptions.map((option: { name: string; value: string }) => (
                        <p key={option.name} className="text-sm text-muted-foreground">
                          {option.name}: {option.value}
                        </p>
                      ))}
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {formatPrice(parseFloat(item.merchandise.price.amount))}
                      </p>
                      {item.merchandise.compareAtPrice && (
                        <p className="text-sm text-muted-foreground line-through">
                          {formatPrice(parseFloat(item.merchandise.compareAtPrice.amount))}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <CartItemActions 
                    cartId={cart.id}
                    lineId={item.id}
                    quantity={item.quantity}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="text-xl font-playfair mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(parseFloat(cart.cost?.subtotalAmount?.amount || '0'))}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>{formatPrice(parseFloat(cart.cost?.totalTaxAmount?.amount || '0'))}</span>
              </div>

              <Separator />
              
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{formatPrice(parseFloat(cart.cost.totalAmount.amount))}</span>
              </div>

              <Button className="w-full" size="lg" asChild>
                <Link href={cart.checkoutUrl}>
                  Proceed to Checkout
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 