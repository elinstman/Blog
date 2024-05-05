import React, { useState, useEffect } from 'react';
import axios from 'axios';


const BlogPosts = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    // const [author, setAuthor ] = useState();

    useEffect(() => {
        fetchBlogPosts();
    }, []);


    const getAuthor = async (authorId) => {
        try {
            const userResponse = await axios.get(`http://localhost:8000/users/${authorId}`)
            if (userResponse.status === 200) {
                return userResponse.data.userName;
            }
        } catch (error) {
            console.log("fel i att hämta användare", error);
        }
    }

    const fetchBlogPosts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/'); 
            if (response.status === 200) {
                const posts = response.data;
                const updatedPosts = await Promise.all(posts.map(async (post) => {
                    const authorName = await getAuthor(post.author);
                    return { ...post, authorName };
                }));
                setBlogPosts(updatedPosts);
                console.log("här är blogginläggen", blogPosts)
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
                    <span className="blog-post-meta">Användare: {post.author_id}</span>
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