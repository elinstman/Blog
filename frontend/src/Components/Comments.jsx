import axios from "axios";
import Header from "./Header"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Comments = () => {
    const [comments, setComments] = useState([]);
    // const postId = useParams().postId;
    const { postId } = useParams();
    console.log("postId: ", postId)

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_BACKEND_URL+`/blogposts/${postId}/comments`);
            if (response.status === 200) {
                setComments(response.data)
            } else {
                console.log("kunde inte hämta kommentarer")
            }
        } catch (error) {
            console.log("error meddelande", error)
        }
    };

    
   


    return (
        <>
        <Header />
        Kommentarer
        {comments.map((comment) => {
            return (
                <div key={comment._id}>
                <h6>{comment.content}</h6>
                <p> {comment.author.userName} </p>

            </div>
            )
           
        })}
        </>
    )
}

export default Comments;