import React, { useState, useEffect } from 'react';
import axios from 'axios';


const BlogPosts = () => {
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        fetchBlogPosts();
    }, []);

    const fetchBlogPosts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/blogposts'); 
            if (response.status === 200) {
                setBlogPosts(response.data);
                // console.log('Blog posts fetched successfully:', response.data);
            } else {
                console.error('Failed to fetch blog posts:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        }
    };

    return (
        <>
        <div className="col-md-8 blog-post-container">
            <h2 className="border-bottom display-5 mb-1">Titel</h2>
            <span className="blog-post-meta">Av: Användarnamn </span>
            <div className="blog-text-container">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis odio blanditiis sapiente, id porro iste deserunt enim temp.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, praesentium nemo error dolore animi laudantium porro, saepe 
                expedita doloribus assumenda mollitia a, quisquam recusandae. Fuga repudiandae laboriosam voluptate nobis obcaecati!
            </p>
            <span>Publicerad: 2024-04-26</span>
            </div>
            
        </div>

    
        </>
    )
}

export default BlogPosts;