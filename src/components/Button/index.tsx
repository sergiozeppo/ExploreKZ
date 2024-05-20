import React from 'react';

type ButtonProps = {
    className: string;
    children: string;
    onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ className = '', children }) => {
    return <button className={`${className} button`}>{children}</button>;
};

export { Button };
