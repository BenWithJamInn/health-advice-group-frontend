import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {client} from "../App";
import PageBar from "../components/PageBar";
import {ReactComponent as LeftArrow} from "../images/arrow-left-solid.svg"
import Card from "../components/Card";

const ArticleViewer = () => {
    const [article, setArticle] = useState(undefined)
    const {id} = useParams()
    const bodyRef = useRef()
    const navigate = useNavigate();

    async function getArticle() {
        const response = await client.get("/article/data/" + id)
        return response.data
    }

    (async () => {
        if (article === undefined) {
            setArticle(await getArticle())
        }
    })()

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.innerHTML = article.body
        }
    }, [article])

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
            <div className="max-w-[60rem] w-full m-auto pt-6 pr-6 pl-6">
                <Card classNames="w-full">
                    <div className="w-full">
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
                </Card>
            </div>
        </div>
    );
};

export default ArticleViewer;