// src/components/ProductList.jsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../features/cart/cartSlice';
import '../styles/ProductList.scss';

const ProductList = ({ products, setProducts }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState({});

    const handleQuantityChange = (id, value) => {
        setQuantity({
            ...quantity,
            [id]: value
        });
    };

    const handleAddToCart = (product) => {
        const quantityToAdd = parseInt(quantity[product.id] || 1);
        dispatch(addToCart({ product, quantity: quantityToAdd }));

        setProducts(prevProducts => 
            prevProducts.map(p => 
                p.id === product.id ? { ...p, amount: p.amount - quantityToAdd } : p
            )
        );
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
        <div className="product-list">
            {products.map(product => (
                <div key={product.id} className="product-item">
                    <h3>{product.name}</h3>
                    <p>Precio: ${product.price}</p>
                    <p>Cantidad disponible: {product.amount}</p>
                    <input
                        type="number"
                        value={quantity[product.id] || 1}
                        min="1"
                        max={product.amount}
                        onChange={e => handleQuantityChange(product.id, e.target.value)}
                    />
                    <button onClick={() => handleAddToCart(product)}>
                        Agregar al Carrito
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
