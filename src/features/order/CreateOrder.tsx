import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from 'react-router-dom';
import Button from '../../ui/Button';
import { formatCurrency, FormErrors, isFormError } from '../../utils/helpers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  CartItem,
  clearCart,
  getCart,
  getTotalCartPrice,
} from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import { createOrder } from '../../services/apiRestaurant';
import store, { RootState } from '../../store';
import { useState } from 'react';
import { fetchAddress } from '../user/userSlice';

const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );
const isValidName = (str: string) => /^[A-Za-zА-Яа-яЁё]{2,}$/u.test(str);

type RawNewOrder = {
  address: string;
  phone: string;
  customer: string;
  priority: string;
  cart: string;
};

export type NewOrder = {
  address: string;
  customer: string;
  priority: boolean;
  phone: string;
  cart: CartItem[];
};

function CreateOrder() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const cart = useAppSelector(getCart);
  const {
    userName: username,
    address,
    position,
    status: addressStatus,
    error: addressError,
  } = useAppSelector((state: RootState) => state.user);
  const totalCartPrice = useAppSelector(getTotalCartPrice);
  const [withPriority, setWithPriority] = useState(false);

  const formErrors = useActionData() as FormErrors | Response;

  const isSubmitting = navigation.state === 'submitting';
  const isPositionLoading = addressStatus === 'loading';

  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className='px-4 py-6'>
      <h2 className='mb-8 text-xl font-semibold'>Ready to order? Let's go!</h2>

      <Form method='post'>
        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>First Name</label>
          <input
            className='input grow'
            type='text'
            name='customer'
            defaultValue={username}
            required
          />
          {isFormError(formErrors) && formErrors.customer && (
            <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
              {formErrors.customer}
            </p>
          )}
        </div>

        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Phone number</label>
          <div className='grow'>
            <input className='input w-full' type='tel' name='phone' required />
            {isFormError(formErrors) && formErrors.phone && (
              <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className='relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input
              className='input w-full'
              type='text'
              name='address'
              disabled={isPositionLoading}
              defaultValue={address}
              required
            />

            {addressError.length > 0 && (
              <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
                {addressError}
              </p>
            )}
          </div>

          {!position.latitude && !position.longitude && (
            <div className='absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]'>
              <Button
                disabled={isPositionLoading}
                type='small'
                onClick={(e) => {
                  e?.preventDefault();
                  dispatch(fetchAddress(null));
                }}>
                Get position
              </Button>
            </div>
          )}
        </div>

        <div className='mb-12 flex items-center gap-5'>
          <input
            className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
            type='checkbox'
            name='priority'
            id='priority'
            value={withPriority ? 'true' : 'false'}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor='priority' className='font-medium'>
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting || isPositionLoading} type='primary'>
            {isSubmitting
              ? 'Placing order....'
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const rawData = {
    ...(Object.fromEntries(formData) as unknown as RawNewOrder),
  };

  const data: NewOrder = {
    ...rawData,
    cart: JSON.parse(rawData.cart),
    priority: rawData.priority === 'true',
  };

  const errors: FormErrors = {
    phone: '',
    customer: '',
    address: '',
  };

  if (!isValidPhone(data.phone)) {
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.';
  }

  if (!isValidName(data.customer)) {
    errors.phone =
      'Please enter a valid name. It should contain only letters and be at least 2 characters long.';
  }

  const hasErrors = Object.values(errors).some((value) => value !== '');
  if (hasErrors) return errors;

  const newOrder = await createOrder(data);

  // Do NOT overuse
  store.dispatch(clearCart());

  // If action returns request, react-router automatically redirects us
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
