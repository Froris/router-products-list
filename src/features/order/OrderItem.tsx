import { formatCurrency } from '../../utils/helpers';
import { CartItem } from '../cart/cartSlice';

// @ts-expect-error for future Component updates
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function OrderItem({
  item,
  isLoadingIngredients,
  ingredients,
}: {
  item: CartItem;
  isLoadingIngredients: boolean;
  ingredients: string[] | undefined;
}) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className='space-y-1 py-3'>
      <div className='flex items-center justify-between gap-4 text-sm'>
        <p>
          <span className='font-bold'>{quantity}&times;</span> {name}
        </p>
        <p className='font-bold'>{formatCurrency(totalPrice)}</p>
      </div>
      <p className='text-sm capitalize italic text-stone-500'>
        {isLoadingIngredients ? 'Loading...' : ingredients?.join(', ')}
      </p>
    </li>
  );
}

export default OrderItem;
