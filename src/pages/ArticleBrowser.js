import React, {useEffect, useState} from 'react';
import {client} from "../App";
import ArticlePreview from "../components/article-browser/ArticlePreview";

import CategorySelection from "../components/article-browser/CategorySelection";
import Card from "../components/Card";
import PageBar from "../components/PageBar";

const ArticleBrowser = () => {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);

    async function getArticles() {
        const response = await client.post("/article/filter", {
            categories: categories
        })
        return response.data
    }
    useEffect(() => {
        console.log(categories)
        getArticles().then(res => {
            setArticles(res)
        })
    }, [categories])

    console.log(articles)

    return (
        <div>
            <PageBar title="ARTICLES" />
            <div className="flex flex-col lg:flex-row items-center lg:items-start">
                <div className="m-5">
                    <Card classNames="!w-full">
                        <div className="w-full lg:w-40">
                            <h1 className="text-xl">Filter by Categories</h1>
                            <CategorySelection setCategories={setCategories}/>
                        </div>
                    </Card>
                </div>
                <div className="flex justify-center lg:justify-start flex-wrap">
                    {
                        articles.map(article => {
                            return (
                                <div className="m-5" key={article.id}>
                                    <ArticlePreview article={article}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default ArticleBrowser;