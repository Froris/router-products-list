import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { clearCart, getCart } from './cartSlice';
import EmptyCart from './EmptyCart';
import { getUsername } from '../user/userSlice';

function Cart() {
  const username = useAppSelector(getUsername);
  const dispatch = useAppDispatch();
  const cart = useAppSelector(getCart);

  function handleClearCart() {
    dispatch(clearCart());
  }

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className='px-4 py-3'>
      <LinkButton to='/menu'>&larr; Back to menu</LinkButton>

      <h2 className='mt-7 text-xl font-semibold'>Your cart, {username}</h2>

      <ul className='mt-3 divide-y divide-stone-200 border-b'>
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className='mt-6 space-x-2'>
        <Button to='/order/new' type='primary'>
          Order pizzas
        </Button>

        <Button
          type='secondary'
          disabled={cart.length === 0}
          onClick={handleClearCart}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
