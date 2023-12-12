import { app } from "../../../firebase";
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
  const [replyTo, setReplyTo] = useState(null);
  const [newReply, setNewReply] = useState("");
  const [replyAuthor, setReplyAuthor] = useState("");

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

  const handleRandomAvatar = () => {
    const avatarUrls = [
      "https://secure.gravatar.com/avatar/99d2389865f459916f961890c7946abb?s=64&d=identicon&r=g",
      "https://secure.gravatar.com/avatar/9853e0f8ebe61e512b35a2bdfeee9859?s=56&d=identicon&r=g",
      "https://secure.gravatar.com/avatar/fd4e7be5050ffa5516246558a7939f85?s=64&d=identicon&r=g",
      "https://secure.gravatar.com/avatar/05d992e5e8473d2bb5c7536335325b88?s=64&d=identicon&r=g",
      "https://secure.gravatar.com/avatar/a8f6f5f12d7da8fdf2fa24ac692ea136?s=56&d=identicon&r=g",
      "https://secure.gravatar.com/avatar/05d992e5e8473d2bb5c7536335325b88?s=64&d=identicon&r=g",
      "https://secure.gravatar.com/avatar/65e199a07a604eed244d5ac924db86b9?s=64&d=identicon&r=g",
    ];

    const randomIndex = Math.floor(Math.random() * avatarUrls.length);
    return avatarUrls[randomIndex];
  };

  const addComment = async () => {
    try {
      const author = commentAuthor || "Anonymous";
      const avatar = handleRandomAvatar();

      if (replyTo === null) {
        // Thêm comment
        const commentData = {
          content: newComment,
          author: author,
          avatar: avatar,
          timestamp: new Date(),
          blogId: id,
        };

        const docRef = await addDoc(collection(DB, "comments"), commentData);
        const commentWithId = { id: docRef.id, ...commentData };

        setComments((prevComments) => [commentWithId, ...prevComments]);
        setNewComment("");
        setCommentAuthor("");
      } else {
        // Thêm reply
        const replyData = {
          content: newReply,
          author: replyAuthor || "Anonymous",
          avatar: avatar,
          timestamp: new Date(),
          blogId: id,
          parentId: replyTo,
        };

        const docRef = await addDoc(collection(DB, "comments"), replyData);
        const replyWithId = { id: docRef.id, ...replyData };

        setComments((prevComments) => {
          // Tìm comment cần thêm reply
          const updatedComments = prevComments.map((comment) =>
            comment.id === replyTo
              ? {
                  ...comment,
                  replies: Array.isArray(comment.replies)
                    ? [replyWithId, ...comment.replies]
                    : [replyWithId],
                }
              : comment
          );

          // Nếu comment không tồn tại trong danh sách cũ, thêm vào cuối danh sách
          if (!updatedComments.some((comment) => comment.id === replyTo)) {
            updatedComments.push(replyWithId);
          }

          return updatedComments;
        });

        setNewReply("");
        setReplyAuthor("");
      }

      setReplyTo(null);
    } catch (error) {
      console.error("Error adding comment or reply:", error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      // Xoá bình luận từ Firestore
      await deleteDoc(doc(DB, "comments", commentId));

      // Cập nhật trạng thái local bằng cách lọc bỏ bình luận đã xoá
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
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
              value={replyTo === null ? newComment : newReply}
              onChange={(text) => {
                replyTo === null ? setNewComment(text) : setNewReply(text);
              }}
            />
            <input
              type="text"
              placeholder="Your name"
              className="add_comment_input"
              value={commentAuthor}
              onChange={(e) => setCommentAuthor(e.target.value)}
            />
            <button onClick={addComment} className="add_comment_btn">
              {replyTo === null ? "Add Comment" : "Add Reply"}
            </button>
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
                    {/* <button onClick={() => setReplyTo(comment.id)}>
                      Reply
                    </button> */}
                    <i className='bx bx-reply' onClick={() => setReplyTo(comment.id)}></i>
                    {replyTo === comment.id && (
                      <div className="reply_form">
                        <ReactQuill
                          theme="snow"
                          placeholder="Please input your comment ..."
                          value={replyTo === null ? newComment : newReply}
                          onChange={(text) => {
                            replyTo === null
                              ? setNewComment(text)
                              : setNewReply(text);
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Your name"
                          className="add_comment_input"
                          value={replyTo === null ? commentAuthor : replyAuthor} 
                          onChange={(e) =>
                            replyTo === null
                              ? setCommentAuthor(e.target.value)
                              : setReplyAuthor(e.target.value)
                          }
                        />
                        <button
                          onClick={addComment}
                          className="add_comment_btn"
                        >
                          {replyTo === null ? "Add Comment" : "Add Reply"}
                        </button>
                      </div>
                    )}

                    {/* Hiển thị replies */}
                    {Array.isArray(comment.replies) &&
                      comment.replies.map((reply, idx) => (
                        <div key={idx} className="comment_reply">
                          <div className="comment_box_left">
                            <img
                              src={reply.avatar}
                              alt={`${reply.author}'s avatar`}
                              className="comment_imgs"
                            />
                          </div>
                          <div className="comment_box_right">
                            <span className="comment_box_right_authur">
                              {reply.author}
                            </span>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: reply.content,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <button onClick={() => deleteComment(comment.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogView;
