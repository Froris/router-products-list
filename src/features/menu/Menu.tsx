import { useLoaderData } from 'react-router-dom';
import {
  getMenu,
  MenuItem as MenuItemType,
} from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  const menu = useLoaderData() as MenuItemType[];

  return (
    <ul className='divide-y divide-stone-200 px-2'>
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  return await getMenu();
}

export default Menu;