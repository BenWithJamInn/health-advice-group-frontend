import React from 'react';

const Card = (props) => {
    return (
        <div className="w-fit bg-white p-6 rounded-3xl drop-shadow-lg">
            {props.children}
        </div>
    );
};

export default Card;