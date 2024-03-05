import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getCartTotalQuantity, getTotalCartPrice } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  const totalPrice = useAppSelector(getTotalCartPrice);
  const totalQuantity = useAppSelector(getCartTotalQuantity);

  return (
    <div className='flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base'>
      <p className='space-x-4 font-semibold text-stone-300 sm:space-x-6'>
        <span>
          {totalQuantity} {`pizza${totalQuantity > 1 ? 's' : ''}`}
        </span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to='/cart'>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
