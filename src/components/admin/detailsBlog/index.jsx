import { app, auth } from "../../../firebase";
import "./detail-blog.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const DB = getFirestore(app);
const Blogslist = collection(DB, "blogs");

const BlogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");

  useEffect(() => {
    document.title = "Details Blog - Slurp";

    const fetchData = async () => {
      try {
        // Fetch blog data
        const blogDoc = doc(Blogslist, id);
        const blogSnapshot = await getDoc(blogDoc);
        if (blogSnapshot.exists()) {
          setBlog(blogSnapshot.data());
        } else {
          console.error("Blog document not found");
        }

        // Fetch comments data
        const commentsQuery = query(
          collection(DB, "comments"),
          where("blogId", "==", id),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(commentsQuery);
        const commentsData = querySnapshot.docs.map((doc) => doc.data());
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const addComment = async () => {
    try {
      const author = commentAuthor || "Anonymous"; // Sử dụng commentAuthor nếu có, nếu không thì sử dụng "Anonymous"
  
      const commentData = {
        content: newComment,
        author: author,
        timestamp: new Date(),
        blogId: id,
      };
  
      // Add comment to Firestore
      const docRef = await addDoc(collection(DB, "comments"), commentData);
  
      // Lấy id của comment từ kết quả trả về
      const commentWithId = { id: docRef.id, ...commentData };
  
      // Update local state with new comment
      setComments((prevComments) => [commentWithId, ...prevComments]);
      setNewComment("");
      setCommentAuthor(""); // Reset trường nhập tên
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      // Xoá bình luận từ Firestore
      await deleteDoc(doc(DB, "comments", commentId));
  
      // Cập nhật trạng thái local bằng cách lọc bỏ bình luận đã xoá
      setComments((prevComments) => prevComments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div>
      <div className="details">
        <h1 className="details_h1">{blog.Title}</h1>
        <p
          className="details_p"
          dangerouslySetInnerHTML={{ __html: blog.Body }}
        ></p>
      </div>
      <div className="comment-section">
        <h2>Comments</h2>
        <div className="comments-list">
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <p>{comment.content}</p>
              <span>By {comment.author}</span>
              <button onClick={() => deleteComment(comment.id)}>Delete</button>
            </div>
          ))}
        </div>
        <div className="add-comment">
          <input
            type="text"
            placeholder="Your name"
            value={commentAuthor}
            onChange={(e) => setCommentAuthor(e.target.value)}
          />
          <textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
      </div>
    </div>
  );
};

export default BlogView;
