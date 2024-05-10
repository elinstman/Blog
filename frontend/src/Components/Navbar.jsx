import axios from 'axios';
import { useState, useEffect } from "react";
const Navbar = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  
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

useEffect(() => {
  fetchBlogPosts();
}, []);

const latestBlogPosts = blogPosts.slice(0, 3);


    return (
        <div className="p-3">
        <div className="position-sticky" >
            <div>
          <h4 className="fst-italic">Recent posts</h4>
          <ul className="list-unstyled">
            {latestBlogPosts.map((latest) => (
              <li key={latest._id}>
            <a className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top" href="#">
            <svg className="bd-placeholder-img" width="100%" height="96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"></rect></svg>
            <div className="col-lg-8">
                    <h6 className="mb-0">{latest.title}</h6>
                    <p>{latest.summary}</p>
                    <small className="text-body-secondary">{new Date(latest.createdAt).toLocaleDateString()}</small>
                  </div>
                  </a>


              </li>
            ))}
          </ul>
        </div>
        </div>
        </div>
    )
}

export default Navbar;