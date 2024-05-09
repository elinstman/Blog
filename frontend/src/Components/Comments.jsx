import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const Comments = ({ postId, formatDateTime }) => {
    const [comments, setComments] = useState([]);
    // const postId = useParams().postId;
    // const { postId } = useParams();
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


    // const createdAt = new Date(post.createdAt); // Skapa ett nytt Date-objekt från post.createdAt
    // const formattedDate = createdAt.toISOString().slice(0, 19).replace('T', ' '); // Formatera datumet

    
   


    return (
        <>
        <div className="comment-header">
            <h4>Kommentarer</h4>
            </div>
        <div className="comments-list">
        {comments.map((comment) => {
            return (
                <div className="comment" key={comment._id}>
                <p> Kommentar av:  @{comment.author.userName} den {formatDateTime(comment.createdAt)} </p>
                <h6>{comment.content}</h6>

            </div>
            )
           
        })}
        </div>
        </>
    )
}

export default Comments;