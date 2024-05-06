import React, { useState, useEffect } from 'react';
import axios from 'axios';


const BlogPosts = () => {
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        fetchBlogPosts();
    }, []);

    const fetchBlogPosts = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_BACKEND_URL+"/blogposts"); 
            if (response.status === 200) {
                console.log("här är blogginläggen", blogPosts)
                setBlogPosts(response.data);
            } else {
                console.error('Failed to fetch blog posts:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        }
    };
   

   



    return (
        <> 
        {blogPosts.map((post, i) => {
            return (
                <div className="col-md-8 blog-post-container" key={i}>
                    <h2 className="border-bottom display-5 mb-1">{post.title}</h2>
                    <span className="blog-post-meta">Skrivet av: {post.author.userName}</span>
                    <div className="blog-text-container"> 
                        <p>{post.summary}</p>
                    </div>
                    <div className="blog-text-container">
                        <p>{post.content}</p>
                        <span>Publicerad: {post.createdAt}</span>
                    </div>
                </div>
            );
        })}
        </>
    )

    
}

export default BlogPosts;