import axios from "axios";
import { useState, useRef } from "react";

const CreatePost = ({ setShowCreatePost, createPostModalRef }) => {
   
    const createBlogpost = async (values) => {
        try {
          const { titel, summary, content, author } = values
          console.log("Creating blogpost with values:", values);
            const res = await axios.post("http://localhost:8000/createpost", 
            { titel, summary, content, author });
            console.log("new blogpost ", res.data);
            
  
      } catch (error) {
        console.error('Error creating customer:', error);
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
            onSubmit={createBlogpost}  
            className="needs-validation form-container"
            >
                <div className="">
                    <div className="">
                        <label
                        htmlFor="titel"
                        className="form-label">Titel</label>
                        <input 
                        type="text" 
                        name="titel"
                        className="form-control form-control-sm"
                        />
                        <div className="col-12">
                        <label htmlFor="summary" className="form-label">Kort sammanfattning</label>
                        <input 
                        type="text" 
                        name="summary"
                        className="form-control form-control-sm blogsummary-input"
                        />
                        </div>
                        <div className="col-12">
                        <label htmlFor="content" className="form-label">Inlägg</label>
                        <input 
                        type="text" 
                        name="content"
                        className="form-control form-control-sm blogtext-input"
                        />
                        </div>

                    </div>

                </div>

                <div>
                    <button
                     className="w-60 btn-sm"
                     type="submit"
                     >Spara blogginlägg</button>
                </div>
                
                

            </form>
    
            </div>
            </div>
        </>
    )
}

export default CreatePost;