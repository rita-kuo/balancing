import React from 'react';

const style = 'font-bold text-lg';
const Logo: React.FC<{ className?: string }> = (props) => (
    <div className={`${style} ${props.className}`}>BritaD</div>
);

export default Logo;
