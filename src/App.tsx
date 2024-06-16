import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Registration from './pages/registration';
import NotFound from './pages/notFound';
import './styles/index.css';
import './styles/font.css';
import Header from './components/Header';
import { GlobalProvider } from './context/Global';
import { CustomToastContainer } from './components/Toast';
import { Profile } from './pages/profile/Profile';
import About from './pages/about/About';
import Catalog from './pages/catalog/Catalog';
import Cart from './pages/cart/Cart';
import Product from './pages/product/Product';
import ChangePassword from './pages/changePassword';
import Footer from './components/Footer/Footer';
// import { initCartState } from './apiSdk/Cart';

// Главный компонент внутри которого будут распологаться остальные компоненты

function App() {
    return (
        <>
            <GlobalProvider>
                <BrowserRouter>
                    <CustomToastContainer />
                    <Header />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/registration" element={<Registration />} />
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route path="/catalog/:category" element={<Catalog />} />
                        <Route path="/catalog/:category/:subcategory" element={<Catalog />} />
                        {/* <Route path="/products/*" element={<Product />} /> */}
                        <Route path="/catalog/:category/:subcategory/*" element={<Product />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/changePassword" element={<ChangePassword />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </GlobalProvider>
        </>
    );
}

export default App;
