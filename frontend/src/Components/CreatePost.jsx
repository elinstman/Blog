import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/auth.context";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Navigate } from "react-router-dom";

const CreatePost = ({ setShowCreatePost, createPostModalRef, addBlogpost }) => {
    const { userId, userName }= useAuth();
    // const { savedValues, setSavedValues } = useState();
    

   const validationSchema = Yup.object({
    title: Yup.string()
    .min(2, "Too Short")
    .max(35, "Too long")
    .required("Required")
    .matches(/^[\p{L}\p{N}\p{P}\p{Z}]*$/gu, "Emojis are not allowed"),
    summary: Yup.string()
    .min(10, "Too Short")
    .max(80, "Too long")
    .required("Required"),
    content: Yup.string()
    .min(20, "Too Short")
    .max(700, "Too long")
    .required("Required"),
   })

   const formik = useFormik({
    initialValues: {
      title: '',
      summary: '',
      content: '',
      author: userId,
    },
    validationSchema: validationSchema,

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      await createBlogpost(values)
      resetForm()
      console.log(values)
      setSubmitting(false)
    }
  })

  const userAccessToken = localStorage.getItem("accessToken");
//   console.log("detta är accesstoken:", userAccessToken );
    if (!userAccessToken) {
      Navigate("/login");
    }
  


    const createBlogpost = async () => {
        try {
          const { title, summary, content } = formik.values;
          console.log("Creating blogpost with values:", formik.values);
          const newPost = {
            title: title,
            summary: summary,
            content: content,
            author: userId,
        };
          
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL+"/createpost", newPost, {
                    headers: {
                      'Authorization': `Bearer ${userAccessToken}`
                    }
            });
            // {title, summary, content, author });
            console.log("new blogpost ", res.data);
            setShowCreatePost(false);
            
  
      } catch (error) {
        console.error('Error creating blogpost:', error);
      }
    }



    return (
        <>
        <div className="modal-content popup-overlay py-5 text-center">
            <div className="popup-content" ref={createPostModalRef}>
            <div className="modal-header popup-header-container">
            <h2 className="modal-title">Skapa inlägg</h2>
        <p className="lead">Beskrivande text för att skapa blogginlägg</p>
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
                     >Spara blogginlägg</button>
                </div>
                
                

            </form>
    
            </div>
            </div>
        </>
    )
}

export default CreatePost;