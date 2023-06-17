import { HTMLProps } from 'react';
import React from 'react';

const style = 'border border-primary-300 rounded p-4 ';

const hoverStyle = 'hover:border-2 hover:bg-primary-200';

const ListItemContainer: React.FC<
    Pick<HTMLProps<HTMLDivElement>, 'className' | 'children'> & {
        hoverStyle?: boolean;
    }
> = (props) => {
    return (
        <div
            className={`${style} ${props.hoverStyle ? hoverStyle : ''} ${
                props.className
            }`}
        >
            {props.children}
        </div>
    );
};

export default ListItemContainer;
