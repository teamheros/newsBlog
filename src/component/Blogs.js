import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {selectUserInput, setBlogData} from "../features/userSlice";
import {useState,useEffect} from 'react';
import '../styling/blog.css';

import axios from 'axios';

const Blogs = () => {

    const searchInput = useSelector(selectUserInput);
    const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=4bffa39ff0f62f7a1ecc1c37181a3cb4`

    const dispatch = useDispatch();
    const [blogs, setblogs] = useState();
    const [loading, setloading] = useState(true);

    useEffect(() => {
        axios
        .get(blog_url)
        .then((response) => {
            dispatch(setBlogData(response.data));
            setblogs(response.data);
            setloading(false);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [searchInput]);

    return (
        <div className="blog__page">
            <h1 className="blog__page-header">News</h1>
            {loading ? <h1>Loading...</h1> : ""}
            <div className="blogs">
                {blogs?.articles?.map((blog) => (
                    <a className="blog" target="_blank" href={blog.url}>
                        <img src={blog.image} />
                        <div>
                            <h3 className="sourceName">
                                <span>{blog.source.name}</span>
                                <span>{blog.publishedAt}</span>
                            </h3>
                            <h4>{blog.source.name}</h4>
                            <h4>{blog.description}</h4>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default Blogs
