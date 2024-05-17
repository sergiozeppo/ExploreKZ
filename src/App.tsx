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
            .products()
            .get()
            .execute()
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
    }

    return (
        <>
            <GlobalProvider>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/registration" element={<Registration />} />
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </GlobalProvider>
        </>
    );
}

export default App;
