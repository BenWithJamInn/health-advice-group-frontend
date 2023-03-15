import React, {useEffect, useRef} from 'react';

const CategorySelection = (props) => {
    const formRef = useRef()
    const addedListener = useRef(false)

    const categories = [
        "Hayfever",
        "Asthma",
        "Temperature",
        "AirQuality"
    ]

    useEffect(() => {
        if (!addedListener.current) {
            formRef.current.addEventListener("change", () => {
                const categories = []
                for (let i = 0; i < formRef.current.elements.length; i++) {
                    const element = formRef.current.elements[i]
                    if (element.checked) {
                        categories.push(element.id.toLowerCase())
                    }
                }
                props.setCategories(categories)
            })
        }
        addedListener.current = true
    }, [props])

    return (
        <div>
            <form ref={formRef} className="mt-4">
                {
                    categories.map(category => {
                        return (
                            <>
                                <input id={category} type="checkbox" className="hover:cursor-pointer"/>
                                <label htmlFor={category} className="ml-4 text-lg hover:cursor-pointer">{category}</label><br/>
                            </>
                        )
                    })
                }
            </form>
        </div>
    );
};

export default CategorySelection;