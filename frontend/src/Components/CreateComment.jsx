import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../Context/auth.context";
import { useState } from "react";

const CreateComment = ({ postId, addComment }) => {
    const { userId, userName }= useAuth();
    const [userC, setUserC] = useState("")

    const validationSchema = Yup.object({
        content: Yup.string()
        .min(3, "Too Short")
        .max(250, "Too long")
        .required("Required")
       })

       const formik = useFormik({
        initialValues: {
            content: "",
            author: userId,
            post: postId,
       }, 
       validationSchema: validationSchema,

       onSubmit: async (values, { setSubmitting, resetForm }) => {
        setUserC(userName);
        setSubmitting(true)
       await writeComment(values);
       resetForm()
       console.log("values from form",values)
       setSubmitting(false)
       }
    })

    const userAccessToken = localStorage.getItem("accessToken");

    const writeComment = async () => {
        try {
            const {content, author } = formik.values;
            console.log("creating comment with values:", formik.values);

            const newComment = {
                content: content,
                author: author,
                post: postId,
            };
            console.log("postId i write comment", postId)
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL+`/blogposts/${postId}/comments`, newComment, {
                headers: {
                    'Authorization': `Bearer ${userAccessToken}`
                  }
            });
            addComment(response.data);
            console.log("new comment ", response.data);

           


        } catch (error) {
            console.error('Error creating comment:', error);
        }
    }

    return (
        <>
        
        <div> 
        
        <form 
        noValidate
        onSubmit={formik.handleSubmit}
        className="needs-validation form-container">
            <div className="write-comment-info">
            <p className="form-label" htmlFor="content">Skriv en kommentar! </p> 
            </div>
            <input 
            type="text"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="content"
            className={`form-control form-control-sm ${formik.touched.content ? formik.errors.content ? "is-invalid" : "is-valid" : ""}`}
             />
             {formik.touched.content && formik.errors.content ? (
                     <div className="invalid-feedback">
                     {formik.errors.content}
                         </div>
                         ) : null}
             <div className="button-container">
             <p className="user-comment-info">Inloggad som: {userName}</p>
             <button 
             type="submit"
             onClick={formik.handleSubmit}
             disabled={formik.isSubmitting}
             className="w-50 btn-sm">Skicka</button>
             </div>
        </form>
        </div>
        </>
    )
}



export default CreateComment;