import Button from './Button';
import { deleteItem } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';

interface Props {
  id: number;
}

function DeleteButton({ id }: Props) {
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(deleteItem(id));
  }

  return (
    <Button type='small' onClick={handleDelete}>
      Delete
    </Button>
  );
}

export default DeleteButton;
