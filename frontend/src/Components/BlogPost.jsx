import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditPost from './EditPost';
import { useVerifiedLogin } from "../Context/auth.context";
import Comments from './Comments';


const BlogPosts = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [showEditBlogpost, setShowEditBlogpost] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    // const [selectedPostId, setSelectedPostId] = useState(null);
    const editPostModalRef = useRef();
    const isVerified = useVerifiedLogin();
    console.log("valda blogginlägget", selectedPost);


    useEffect(() => {
        fetchBlogPosts();
    }, []);

    const fetchBlogPosts = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_BACKEND_URL+"/blogposts"); 
            if (response.status === 200) {
                setBlogPosts(response.data);
            } else {
                console.error('Failed to fetch blog posts:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        }
    };
   

    const toggleEditPostModal = () => {
        // setSelectedPostId();
        setShowEditBlogpost((prevState) => !prevState);
      };

      useEffect(() => {
        const handleClickOutside = (event) => {
          if (
            editPostModalRef.current &&
            !editPostModalRef.current.contains(event.target)
          ) {
            setShowEditBlogpost(false);
          }
        };
      
        document.addEventListener("mousedown", handleClickOutside);
      
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, []);


        const handlePostClick = (postId) => {
            if (selectedPost === postId) {
                setSelectedPost(null); // Stäng kommentarerna
            } else {
                setSelectedPost(postId);
            }
        };


    return (
        <> 
        {blogPosts.map((post) => {
            return (
                <div className="col-md-8 blog-post-container" key={post._id}>
                    <h2 className="border-bottom display-5 mb-1">{post.title}</h2>
                    <div className='blogpost-info'>
                    <span className="blog-post-meta">Skrivet av: {post.author.userName}</span>
                
                        <a onClick={() => handlePostClick(post._id)}>Kommentarer</a>
                    
                    </div>
                    <div className="blog-text-container"> 
                        <h4 className=''>{post.summary}</h4>
                    </div>
                    <div className="blog-text-container ">
                        <p className='border-bottom'>{post.content}</p>
                        <div className='blogpost-info'> 
                        <span>Publicerad: {post.createdAt}</span>
                        {isVerified && (
                            <Link
                        className=''
                        to={`/${post._id}/`}
                        onClick={toggleEditPostModal}                  
                        >Redigera inlägg</Link>
                        )}
                        
                        
                        </div>
                    </div>
                    {selectedPost === post._id && (
                        <div className='comments-container'>
                        <Comments postId={post._id} />
                        </div>
                    )}

                    
                    
                </div>
               
            );
        })}
         {showEditBlogpost && (
                    <div>
                        <EditPost 
                        toggleEditPostModal={toggleEditPostModal}
                        setShowEditBlogpost={setShowEditBlogpost} 
                        editPostModalRef={editPostModalRef} 
                        fetchBlogPosts={fetchBlogPosts} 
                        />
                    </div>
                )}
        </>
    )

    
}

export default BlogPosts;