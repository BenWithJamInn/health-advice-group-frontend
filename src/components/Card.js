import React from 'react';

const Card = (props) => {
    return (
        <div className={"w-fit h-fit bg-white p-6 rounded-3xl drop-shadow-lg " + props.classNames}>
            {props.children}
        </div>
    );
};

export default Card;