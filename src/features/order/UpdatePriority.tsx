import Button from '../../ui/Button';
import { ActionFunctionArgs, useFetcher } from 'react-router-dom';
import { updateOrder } from '../../services/apiRestaurant';
import { NewOrder } from './CreateOrder';

function UpdatePriority() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method='PATCH' className='text-right'>
      <Button type='primary'>Update priority</Button>
    </fetcher.Form>
  );
}

export async function action({ params }: ActionFunctionArgs) {
  const data: Partial<NewOrder> = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}

export default UpdatePriority;
