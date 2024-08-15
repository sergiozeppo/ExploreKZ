import { toast, ToastContainer, Bounce } from 'react-toastify';

const CustomToastContainer = () => (
    <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
    />
);

const CustomToast = (type: 'success' | 'warn' | 'error' | 'info', msg: string) => {
    toast[type](msg, {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
};

export { CustomToast, CustomToastContainer };
