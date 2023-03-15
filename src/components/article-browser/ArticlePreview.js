import React from 'react';
import Card from "../Card";
import {Link} from "react-router-dom";

const ArticlePreview = (props) => {
    return (
        <Link to={"/articles/viewer/" + props.article.id}>
            <Card>
                <div className="w-48 min-h-[10rem] flex flex-col justify-between">
                    <div className="flex items-center flex-col text-center">
                        <h1 className="text-2xl">{props.article.title}</h1>
                        <p>{props.article.description}</p>
                    </div>
                    <div className="flex flex-row flex-wrap justify-center">{
                        props.article.categories.map(k => {
                            return (<div className="w-fit h-fit m-0.5 pr-2 pl-2 rounded-2xl bg-black text-white">
                                <p>{k}</p>
                            </div>)
                        })
                    }</div>
                </div>
            </Card>
        </Link>
    );
};

export default ArticlePreview;