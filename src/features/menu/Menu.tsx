import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem, { MenuItemType } from './MenuItem';

function Menu() {
  const menu = useLoaderData() as MenuItemType[];

  return (
    <ul className='divide-y divide-stone-200 px-2'>
      {menu.map((menuItem) => (
        <MenuItem menuItem={menuItem} key={menuItem.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  return await getMenu();
}

export default Menu;
