import React from 'react';

const Card = (props) => {
    return (
        <div className={"w-fit h-fit bg-white p-6 rounded-xl drop-shadow-lg " + props.classNames}>
            {props.children}
        </div>
    );
};

export default Card;