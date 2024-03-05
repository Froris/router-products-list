import { useAppSelector } from '../../hooks';
import { getUsername } from './userSlice';

function Username() {
  const userName = useAppSelector(getUsername);
  return (
    <div className='hidden text-sm font-semibold md:block'>{userName}</div>
  );
}

export default Username;
