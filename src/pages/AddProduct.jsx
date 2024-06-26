import React, { useState } from 'react';
import '../styles/AddProduct.scss';

const AddProduct = ({ addProduct, onClose, products }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validaciones
        if (!name || !price || !amount) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        if (amount < 1 || price < 0) {
            alert('La cantidad y el precio deben ser mayores a cero.');
            return;
        }

        if (name.length < 2) {
            alert('El nombre del producto debe tener al menos dos caracteres.');
            return;
        }

        const productExists = products.some((product) => product.name.toLowerCase() === name.toLowerCase());

        if (productExists) {
            alert('El producto ya se encuentra en la lista.');
        } else {
            addProduct({ name, price: Number(price), amount: Number(amount) });
            setName('');
            setPrice('');
            setAmount('');
            onClose();
        }
    };

    const handleClear = () => {
        setName('');
        setPrice('');
        setAmount('');
        onClose();
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            onClose();
        }
    };

    return (
        <div className="add-product-modal" onClick={handleClear}>
            <div className="add-product-container" onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyDown}>
                <h2>Agregar Producto</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Nombre del Producto</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label htmlFor="price">Precio</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />

                    <label htmlFor="amount">Cantidad</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />

                    <div className="button-container">
                        <button type="submit" className="submit-button">Agregar</button>
                        <button type="button" className="clear-button" onClick={handleClear}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
