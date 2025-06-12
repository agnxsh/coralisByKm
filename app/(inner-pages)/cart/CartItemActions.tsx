'use client';

import { removeFromCart, updateCartItemQuantity } from '@/app/(auth)/_actions/cart';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

interface CartItemActionsProps {
  cartId: string;
  lineId: string;
  quantity: number;
}

export default function CartItemActions({ cartId, lineId, quantity }: CartItemActionsProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    
    startTransition(async () => {
      const result = await updateCartItemQuantity(cartId, lineId, newQuantity);
      
      if (result.success) {
        router.refresh();
      } else {
        toast.error(result.message || 'Failed to update quantity');
      }
    });
  };

  const handleRemove = async () => {
    startTransition(async () => {
      const result = await removeFromCart(cartId, lineId);
      
      if (result.success) {
        router.refresh();
        toast.success('Item removed from cart');
      } else {
        toast.error(result.message || 'Failed to remove item');
      }
    });
  };

  return (
    <div className="mt-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => updateQuantity(quantity - 1)}
          disabled={isPending || quantity <= 1}
        >
          -
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => updateQuantity(quantity + 1)}
          disabled={isPending}
        >
          +
        </Button>
      </div>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={handleRemove}
        disabled={isPending}
      >
        Remove
      </Button>
    </div>
  );
} 