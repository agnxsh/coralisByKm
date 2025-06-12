'use client';

import { addToCart, createCart, getCartId } from '@/app/(auth)/_actions/cart';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

interface AddToCartButtonProps {
  variantId: string;
  availableForSale?: boolean;
}

export default function AddToCartButton({ variantId, availableForSale = true }: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAddToCart = async () => {
    if (!availableForSale) {
      toast.error('This product is not available for sale');
      return;
    }

    startTransition(async () => {
      try {
        let cartId = await getCartId();
        let result;

        if (!cartId) {
          // Create a new cart
          result = await createCart([{ merchandiseId: variantId, quantity: 1 }]);
          if (!result.success) {
            throw new Error(result.message);
          }
        } else {
          // Add to existing cart
          result = await addToCart(cartId, variantId, 1);
          if (!result.success) {
            throw new Error(result.message);
          }
        }

        toast.success('Added to cart!');
        router.refresh();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to add to cart');
      }
    });
  };

  return (
    <Button 
      onClick={handleAddToCart}
      disabled={isPending || !availableForSale}
      className="w-full"
    >
      {!availableForSale ? 'Out of Stock' : isPending ? 'Adding...' : 'Add to Cart'}
    </Button>
  );
} 