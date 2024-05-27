export default function Error({ message }: { message: string | undefined }) {
    if (typeof message === 'string') {
        return <span className="input-notice-register">{message}</span>;
    }
}
