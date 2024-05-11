import React from 'react';

type ImgProps = {
    src: string;
    alt: string;
    className?: string;
};

const Img: React.FC<ImgProps> = ({ className, src = 'default.png', alt = 'img alt' }) => {
    return <img className={className} src={src} alt={alt} loading={'lazy'} />;
};
export { Img };
