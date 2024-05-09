import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/auth.context";
// import { useFormik } from "formik";
// import * as Yup from "yup";
import { useParams, Navigate, Link } from "react-router-dom";
import Header from "./Header";
import HomePage from "../Pages/HomePage";


const EditPost = ({ toggleEditPostModal, editPostModalRef, fetchBlogPosts }) => {
    const { userId, userName }= useAuth();
    const { id } = useParams();
    const [post, setPost] = useState({ });
    const [successEdit, setSuccessEdit ] = useState(false);
    const [ userIdentified, setUserIdentified ] = useState(false);
     
   

    const [formValues, setFormValues] = useState({
        title: "",
        summary: "",
        content: ""
    });

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_BACKEND_URL+ `/blogposts/${id}`, 
            {headers: {
                'Authorization': `Bearer ${userAccessToken}`
              }} );

              if (response.status === 200) {
                setUserIdentified(true);
                setPost(response.data);
                setFormValues({
                    title: response.data.title,
                    summary: response.data.summary,
                    content: response.data.content,
                    id: response.data.id
                });
              } else {
                console.error('Failed to fetch post:', response.statusText);
              }

        } catch (error) {
            if (error.response && error.response.status === 403) {
                // Om användaren inte är auktoriserad
                setUserIdentified(false);
            } else {
                console.error('Error fetching post:', error);
            }
            
        }
    };

    const updateBlogPost = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(import.meta.env.VITE_BACKEND_URL+`/blogposts/${id}`, 
            {
                title: formValues.title,
                summary: formValues.summary,
                content: formValues.content,
                author:  post.author._id
            }
        );
            console.log("Updated blog post:", res.data);
            setSuccessEdit(true);
            
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    if (successEdit) {
        return <Navigate to={'/'} />
       
    }
  

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

  

    const userAccessToken = localStorage.getItem("accessToken");
    //   console.log("detta är accesstoken:", userAccessToken );
        if (!userAccessToken) {
          return <Navigate to={"/login"} />
        }
  




    return (
        <>
        <Header />
        <HomePage />
        {!userIdentified && (
            <div className="popup-overlay"> 
            <div className="modal d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100"
            tabIndex={-1}
            role="dialog"
            id="modalSheet"
            >
                <div className="modal-dialog">
            <div className="modal-content modal-warn rounded-3 shadow">
                <div className="modal-body py-0">
                    <h5 className="mb-0 font-bold">AJABAJA, DIN FILUR</h5>
                    <p className="mb-0">Detta är inte ditt inlägg.</p>
                    <p className="mb-0">Du kan ENBART redigera de inlägg du själv skrivit.</p>
                </div>
                <div className="modal-footer border-top-0 flex-column align-items-stretch w-100">
                    <Link to={"/"}
                        onClick={toggleEditPostModal}   className="button btn-lg" data-bs-dismiss="modal">Stäng</Link>

                </div>

            </div>
            </div>
            </div>
            </div>
        )}

        {userIdentified && (
 <div className="modal-content popup-overlay py-5 text-center">
 <div className="popup-content" ref={editPostModalRef}>
 <div className="modal-header popup-header-container">
 <h2 className="modal-title">Redigera bloggpost</h2>
<p className="lead">Beskrivande text för att redigera blogginlägg</p>
 </div>
 <div className="col-md-7 col-lg-8">

 </div>
 <form  
 className="needs-validation form-container"   
 onSubmit={updateBlogPost}        
 >
     <div className="">
         <div className="">
             <label
             htmlFor="title"
             className="form-label"
             >Titel</label>
             <input 
             value={formValues.title}
             onChange={handleInputChange}
             type="text" 
             name="title"
             className={`form-control form-control-sm`} 
             />
             <div className="col-12">
             <label htmlFor="summary" className="form-label">Kort sammanfattning</label>
             <input 
             type="text" 
             value={formValues.summary}
             onChange={handleInputChange}
             name="summary"
             className={`form-control form-control-sm blogsummary-input`}
             />                        
             </div>
             <div className="col-12">
             <label htmlFor="content" className="form-label">Inlägg</label>
             <input 
             type="text" 
             name="content"   
             value={formValues.content}
             onChange={handleInputChange}                    
             className={`form-control form-control-sm blogtext-input`}
             />                    
             </div>

         </div>

     </div>

     <div>
         <button
          className="w-60 btn-sm"
          type="submit"
          >Uppdatera blogginlägg</button>
     </div>
     
     

 </form>

 </div>
 </div>
        )}
       
        </>
    )
}

export default EditPost;