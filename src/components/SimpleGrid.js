import React from 'react';

const SimpleGrid = (props) => {
    const elements = []
    for (let i = 0; i < props.children.length; i++) {
        elements.push(props.children[i])
        if (i < props.children.length - 1) {
            elements.push(<div className="w-[1px] h-14 lg:w-14 lg:h-[1px] bg-black mr-4 ml-4 lg:mt-4 lg:mb-4" />)
        }
    }
    return (
        <div className={"flex flex-row lg:flex-col justify-center items-center text-center " + props.classNames}>
            {elements}
        </div>
    );
};

export default SimpleGrid;