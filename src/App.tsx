import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Registration from './pages/registration';
import NotFound from './pages/notFound';
import './styles/index.css';
import './styles/font.css';
import { anonUser } from './apiSdk/anonimClient';
import { tokenClient } from './apiSdk/TokenClient';
import Header from './components/Header';
import { GlobalProvider } from './context/Global';
import { CustomToastContainer } from './components/Toast';
import { Profile } from './pages/profile/Profile';
import About from './pages/about/About';
import Catalog from './pages/catalog/Catalog';
import Cart from './pages/cart/Cart';
import Product from './pages/product/Product';
import ChangePassword from './pages/changePassword';
// import Footer from './components/Footer/Footer';

// Главный компонент внутри которого будут распологаться остальные компоненты

function App() {
    if (localStorage.getItem('isLogin')) {
        console.log('token flow');
        tokenClient()
            .me()
            .get()
            .execute()
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.error(err));
    } else {
        console.log('anonim flow');
        anonUser()
            .get()
            .execute()
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
    }

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
                        <Route path="/products/*" element={<Product />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/changePassword" element={<ChangePassword />} />
                    </Routes>
                    {/* <Footer /> */}
                </BrowserRouter>
            </GlobalProvider>
        </>
    );
}

export default App;
