import React from 'react';

const PageBar = (props) => {
    return (
        <div className="w-full h-14 bg-primary-blue text-white flex items-center">
            <h1 className="text-3xl ml-6 absolute">{props.title}</h1>
            <div className="w-full flex justify-center">
                {props.children}
            </div>
        </div>
    );
};

export default PageBar;