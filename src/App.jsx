import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import AddProduct from './pages/AddProduct';
import Modal from './components/Modal';
import './styles/App.scss';
import modeToggle from './assets/svg/modeToggle.svg';
import cartSVG from './assets/svg/cart.svg';
import addProductSVG from './assets/svg/addProduct.svg';
import productsData from './assets/products.json';
import { selectTotalQuantity } from './features/cart/cartSelectors';

const App = () => {
    const dispatch = useDispatch();
    const totalQuantity = useSelector(selectTotalQuantity);

    const [darkMode, setDarkMode] = useState(false);
    const [isCartVisible, setIsCartVisible] = useState(false);
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [products, setProducts] = useState(productsData.products);

    const closeModal = () => {
        setIsAddProductModalOpen(false);
        document.body.classList.remove('modal-open');
    };

    const openModal = () => {
        setIsAddProductModalOpen(true);
        document.body.classList.add('modal-open');
    };

    const handleAddProduct = (newProduct) => {
        setProducts([...products, newProduct]);
    };

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.keyCode === 27) {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleEscape);

        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, []);

    return (
        <div className={darkMode ? 'App dark-mode' : 'App'}>
            <header className="header">
                <h1>N5 Store</h1>
                <div className="header-icons">
                    <img
                        src={modeToggle}
                        alt="Toggle Dark/Light Mode"
                        onClick={() => setDarkMode(!darkMode)}
                    />
                    <div
                        className="cart-icon-container"
                        onMouseEnter={() => setIsCartVisible(true)}
                        onMouseLeave={() => setIsCartVisible(false)}
                        onClick={() => setIsCartVisible(!isCartVisible)}
                    >
                        <img
                            src={cartSVG}
                            alt="Cart"
                        />
                        {isCartVisible && (
                            <div className="cart-popup">
                                <Cart setProducts={setProducts} />
                            </div>
                        )}
                        <div className="cart-counter">{totalQuantity}</div>
                    </div>
                </div>
            </header>
            <main className="main-content">
                <ProductList products={products} setProducts={setProducts} />
            </main>
            <div className="add-product-button">
                <img
                    src={addProductSVG}
                    alt="Add Product"
                    onClick={openModal}
                />
            </div>
            {isAddProductModalOpen && (
                <Modal onClose={closeModal}>
                    <AddProduct addProduct={handleAddProduct} onClose={closeModal} />
                </Modal>
            )}
        </div>
    );
};

export default App;
