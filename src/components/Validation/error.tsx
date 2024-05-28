export default function CustomError({ message }: { message: string | undefined }) {
    if (typeof message === 'string') {
        return <span className="input-notice-register">{message}</span>;
    }
}
