import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {client} from "../App";
import PageBar from "../components/PageBar";
import {ReactComponent as LeftArrow} from "../images/arrow-left-solid.svg"

const ArticleViewer = () => {
    const [article, setArticle] = useState(undefined)
    const {id} = useParams()
    const bodyRef = useRef()
    const navigate = useNavigate();

    async function getArticle() {
        const response = await client.get("/article/data/" + id)
        return response.data
    }

    useEffect(() => {
        getArticle().then(res => setArticle(res))
        if (bodyRef.current) {
            bodyRef.current.innerHTML = article.body
        }
    })

    let content;
    if (article) {
        content = (
            <div>
                <h1 className="text-4xl lg:text-5xl text-bold mb-6">{article.title}</h1>
                <div ref={bodyRef} id="article-body" />
            </div>
        )
    } else {
        content = (
            <div>
                no content
            </div>
        )
    }

    function back() {
        navigate("/articles")
    }

    return (
        <div>
            <PageBar title="ARTICLES"/>
            <div className="max-w-[40rem] pr-6 pl-6 m-auto pt-6">
                <button onClick={back} className="w-20 mb-6 h-10 bg-primary-blue text-white rounded-xl pr-1 pl-1">
                    <div className="flex flex-row items-center justify-around">
                        <div className="w-5">
                            <LeftArrow/>
                        </div>
                        Back
                    </div>
                </button>
                {
                    content
                }
            </div>
        </div>
    );
};

export default ArticleViewer;