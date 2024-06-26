import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart, buyItems } from '../features/cart/cartSlice';
import '../styles/Cart.scss';

const Cart = ({ setProducts }) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items);

    const getTotal = () => {
        return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    };

    const handleClearCart = () => {
        cart.forEach(item => {
            setProducts(prevProducts =>
                prevProducts.map(p =>
                    p.id === item.id ? { ...p, amount: p.amount + item.quantity } : p
                )
            );
        });

        dispatch(clearCart());
    };

    const handleRemoveFromCart = (productId, quantity) => {
        dispatch(removeFromCart({ productId, quantity }));

        setProducts(prevProducts =>
            prevProducts.map(p =>
                p.id === productId ? { ...p, amount: p.amount + quantity } : p
            )
        );
    };

    return (
        <div className="cart-container">
            <h2>Carrito de Compras</h2>
            {cart.length === 0 ? (
                <p>Todavía no agregaste productos</p>
            ) : (
                <>
                    {cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <p>{item.name}</p>
                            <p>
                                {item.quantity} x ${item.price ? item.price.toLocaleString() : 'Precio no disponible'}
                            </p>
                            <button onClick={() => handleRemoveFromCart(item.id, item.quantity)}>
                                Eliminar
                            </button>
                        </div>
                    ))}
                    <div className="cart-total">
                        <p>Total: ${getTotal().toLocaleString()}</p>
                    </div>
                    <div className="button-container">
                        <button className="buy-button" onClick={() => dispatch(buyItems())}>
                            Comprar
                        </button>
                        <button className="clear-button" onClick={handleClearCart}>
                            Vaciar Carrito
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
