import React from 'react';

interface TitleProps {
    label: string;
    required?: boolean;
    className?: string;
}

const Title: React.FC<TitleProps> = (props) => (
    <div className={`whitespace-nowrap ${props.className}`}>
        {props.label}
        {props.required && <span className='text-red-500'>*</span>}
    </div>
);

export default Title;
