import { useEffect } from 'react';
import { clientBuilder } from './BuildClient';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/login/login';
import Home from './components/home/home';
import Registration from './components/registration/registration';
import NotFound from './components/notFound/notFound';
import './index.css';

// Главный компонент внутри которого будут распологаться остальные компоненты

function NotFoundRedirect() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/404');
    }, [navigate]);
    return null;
}

function App() {
    clientBuilder('auth')
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
