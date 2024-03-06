import CreateUser from '../features/user/CreateUser';
import { useAppSelector } from '../hooks.ts';
import { getUsername } from '../features/user/userSlice.ts';
import Button from './Button.tsx';

function Home() {
  const username = useAppSelector(getUsername);

  return (
    <div className='my-10 px-4 text-center sm:my-16'>
      <h1 className='mb-8  text-xl font-semibold md:text-3xl'>
        The best pizza.
        <br />
        <span className='text-yellow-500'>
          Straight out of the oven, straight to you.
        </span>
      </h1>
 
      {username.length > 0 ? (
        <Button disabled={false} type='primary' to='/menu'>
          Continue ordering, {username}
        </Button>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default Home;
