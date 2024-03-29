import { formatCurrency } from '../../utils/helpers';
import { CartItem as CartItemType, getCurrentQuantityById } from './cartSlice';
import DeleteButton from '../../ui/DeleteButton';
import UpdateItemQuantity from './UpdateItemQuantity';
import { useAppSelector } from '../../hooks';

function CartItem({ item }: { item: CartItemType }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useAppSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className='py-3 sm:flex sm:items-center sm:justify-between'>
      <p className='mb-1 sm:mb-0'>
        {quantity}&times; {name}
      </p>
      <div className='flex items-center justify-between sm:gap-6'>
        <p className='text-sm font-bold'>{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity id={pizzaId} currentQuantity={currentQuantity} />
        <DeleteButton id={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
