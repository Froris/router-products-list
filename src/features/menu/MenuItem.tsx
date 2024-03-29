import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addItem, CartItem, getCurrentQuantityById } from '../cart/cartSlice';
import DeleteButton from '../../ui/DeleteButton';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';

export type MenuItemType = {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
};

function MenuItem({ menuItem }: { menuItem: MenuItemType }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = menuItem;

  const currentQuantity = useAppSelector(getCurrentQuantityById(id));
  const isInCart: boolean = currentQuantity > 0;

  const dispatch = useAppDispatch();

  function handleAddToCart() {
    const newItem: CartItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
  }

  return (
    <li className='flex gap-4 py-2'>
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className='flex grow flex-col pt-0.5'>
        <p className='font-medium'>{name}</p>
        <p className='text-sm capitalize italic text-stone-500'>
          {ingredients.join(', ')}
        </p>
        <div className='mt-auto flex items-center justify-between'>
          {!soldOut ? (
            <p className='text-sm'>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className='text-sm font-medium uppercase text-stone-500'>
              Sold out
            </p>
          )}

          <div className='flex items-center gap-3 sm:gap-8'>
            {isInCart && (
              <UpdateItemQuantity id={id} currentQuantity={currentQuantity} />
            )}

            {isInCart && <DeleteButton id={id} />}
          </div>

          {!soldOut && !isInCart && (
            <Button type='small' onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
