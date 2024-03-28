import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.contex';

import { ShoppingIcon, ItemCount, CartIconContainer } from './cart-icon.styles.jsx'

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon'/>
      <ItemCount as='span'>{cartCount}</ItemCount>
    </CartIconContainer>
  );
} 

export  default CartIcon;