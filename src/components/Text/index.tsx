import React from 'react';

export type TextProps = {
    className: string;
    as: keyof typeof tags;
    children: string;
};

const tags = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    p: 'p',
};

const Text: React.FC<TextProps> = ({ children, className = '', as = 'h6' }) => {
    const Component = as;
    return <Component className={`${className}`}>{children}</Component>;
};

export { Text };
