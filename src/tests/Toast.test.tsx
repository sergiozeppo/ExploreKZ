import '@testing-library/jest-dom';
import { toast } from 'react-toastify';
import { CustomToast } from '../components/Toast';

describe('CustomToast', () => {
    it('must calls toast.success with the correct arguments', () => {
        const toastSpy = jest.spyOn(toast, 'success');
        const message = 'Hello, world!';
        CustomToast('success', message);
        expect(toastSpy).toHaveBeenCalledWith(message, {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    });
});
