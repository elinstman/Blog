import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/auth.context";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";


const EditPost = ({ createPostModalRef }) => {
    const { userId, userName }= useAuth();
    const { id } = useParams();
    const [post, setPost] = useState({
        title: '',
        summary: '',
        content: ''
      });
    // const { savedValues, setSavedValues } = useState();
    
    useEffect(() => {
        // Hämta det valda blogginlägget för redigering
        fetchPost();
      }, []);
  

//   const userAccessToken = localStorage.getItem("accessToken");
// //   console.log("detta är accesstoken:", userAccessToken );
//     if (!userAccessToken) {
//       navigate("/login");
//     }
  




    return (
        <>
        <div className="modal-content popup-overlay py-5 text-center">
            <div className="popup-content" ref={createPostModalRef}>
            <div className="modal-header popup-header-container">
            <h2 className="modal-title">Redigera inlägg</h2>
        <p className="lead">Beskrivande text för att redigera blogginlägg</p>
            </div>
       
        

            <div className="col-md-7 col-lg-8">

            </div>
            <form  
            className="needs-validation form-container"
            onSubmit={formik.handleSubmit}
            noValidate
            >
                <div className="">
                    <div className="">
                        <label
                        htmlFor="title"
                        className="form-label"
                        >Titel</label>
                        <input 
                        type="text" 
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="title"
                        className={`form-control form-control-sm ${formik.touched.title ? formik.errors.title ? "is-invalid" : "is-valid" : ""}`} 
                        />
                        {formik.touched.title && formik.errors.title ? (
                     <div className="invalid-feedback">
                     {formik.errors.title}
                         </div>
                         ) : null}
                        <div className="col-12">
                        <label htmlFor="summary" className="form-label">Kort sammanfattning</label>
                        <input 
                        type="text" 
                        value={formik.values.summary}
                        name="summary"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`form-control form-control-sm blogsummary-input ${formik.touched.summary ? formik.errors.summary ? "is-invalid" : "is-valid" : ""}`}
                        />
                        {formik.touched.summary && formik.errors.summary ? (
                     <div className="invalid-feedback">
                     {formik.errors.summary}
                         </div>
                         ) : null}
                        </div>
                        <div className="col-12">
                        <label htmlFor="content" className="form-label">Inlägg</label>
                        <input 
                        type="text" 
                        value={formik.values.content}
                        name="content"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`form-control form-control-sm blogtext-input ${formik.touched.content ? formik.errors.content ? "is-invalid" : "is-valid" : ""}`}
                        />
                        {formik.touched.content && formik.errors.content ? (
                     <div className="invalid-feedback">
                     {formik.errors.content}
                         </div>
                         ) : null}
                        </div>

                    </div>

                </div>

                <div>
                    <button
                     className="w-60 btn-sm"
                     type="submit"
                     onClick={formik.handleSubmit}
                     disabled={formik.isSubmitting}
                     >Uppdatera blogginlägg</button>
                </div>
                
                

            </form>
    
            </div>
            </div>
        </>
    )
}

export default EditPost;