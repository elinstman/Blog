import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import CreateComment from "./CreateComment";


const Comments = ({ postId, formatDateTime }) => {
    const [comments, setComments] = useState([]);
    const [verifiedUser, setVerifiedUser] = useState(false);

    useEffect(() => {
        fetchComments();
        checkLoginStatus();
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

    const checkLoginStatus = () => {
        const userAccessToken = localStorage.getItem("accessToken");
        if (userAccessToken) {
            setVerifiedUser(true)
        }
    }
    
    const addComment = (newComment) => {
        setComments([...comments, newComment]); // Lägg till den nya kommentaren i kommentarlistan
    };
   

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

        {!verifiedUser && (
            <p>Du måste vara inloggad för att skriva en kommentar.</p>
        )}
        </div>
        {verifiedUser && (
            <CreateComment postId={postId} addComment={addComment}/>
        )}

        </>
    )
}

export default Comments;