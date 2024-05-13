import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Registration from './pages/registration';
import NotFound from './pages/notFound';
import './styles/index.css';
import './styles/font.css';
import { anonUser } from './apiSdk/anonimClient';

// Главный компонент внутри которого будут распологаться остальные компоненты

function NotFoundRedirect() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/404');
    }, [navigate]);
    return null;
}

function App() {
    anonUser()
        .products()
        .get()
        .execute()
        .then((res) => console.log(res))
        .catch((err) => console.error(err));

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<NotFoundRedirect />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
