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

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
        const commentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const addComment = async () => {
    try {
      const author = commentAuthor || "Anonymous";

      const avatar =
        "https://secure.gravatar.com/avatar/99d2389865f459916f961890c7946abb?s=64&d=identicon&r=g";

      const commentData = {
        content: newComment,
        author: author,
        avatar: avatar,
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

  // const deleteComment = async (commentId) => {
  //   try {
  //     // Xoá bình luận từ Firestore
  //     await deleteDoc(doc(DB, "comments", commentId));

  //     // Cập nhật trạng thái local bằng cách lọc bỏ bình luận đã xoá
  //     setComments((prevComments) =>
  //       prevComments.filter((comment) => comment.id !== commentId)
  //     );
  //   } catch (error) {
  //     console.error("Error deleting comment:", error);
  //   }
  // };

  return (
    <div>
      <div className="details">
        <h1 className="details_h1">{blog.Title}</h1>
        <p
          className="details_p"
          dangerouslySetInnerHTML={{ __html: blog.Body }}
        ></p>

        <div className="comment_section">
          <div className="add_comment">
            {/* <textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            /> */}

            <ReactQuill
              theme="snow"
              placeholder="Please input your comment ..."
              value={newComment}
              onChange={(newComment) => {
                setNewComment(newComment);
              }}
            />
            <input
              type="text"
              placeholder="Your name"
              className="add_comment_input"
              value={commentAuthor}
              onChange={(e) => setCommentAuthor(e.target.value)}
            />
            <button onClick={addComment} className="add_comment_btn">Add Comment</button>
          </div>

          <div className="comments_list">
            {comments.map((comment, index) => (
              <div key={index} className="comment">
                <div className="comment_box">
                  <div className="comment_box_left">
                    <img
                      src={comment.avatar}
                      alt={`${comment.author}'s avatar`}
                      className="comment_imgs"
                    />
                  </div>

                  <div className="comment_box_right">
                    <span className="comment_box_right_authur">
                      {comment.author}
                    </span>
                    <p dangerouslySetInnerHTML={{ __html: comment.content }} />
                  </div>
                </div>
                {/* <button onClick={() => deleteComment(comment.id)}>
                  Delete
                </button> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogView;
