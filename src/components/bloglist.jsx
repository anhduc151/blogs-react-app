import fb from "../firebase";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { message } from "antd";

const DB = fb.firestore();

const Blogslist = DB.collection("blogs");

const BlogListView = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    // Subscribe to query with onSnapshot
    const unsubscribe = Blogslist.limit(100).onSnapshot((querySnapshot) => {
      // Get all documents from collection - with IDs
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // Update state
      setBlogs(data);
    });

    // Detach listener
    return unsubscribe;
  }, []);

  const DeleteBlog = (id) => {
    Blogslist.doc(id).delete().then(() => {
      message.success("Blog deleted successfully!")
      // alert("Document successfully deleted!");
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
  }

  return (
    <div>
      {blogs.map((data) => (
        <div key={data.id}>
          <p className="title">Title: {data.Title}</p>
          <p className="body">Body: {data.Body}</p>
          <Link to={`/show/${data.id}`}>View</Link>
          <Link to={`/edit/${data.id}`}>Edit</Link>
          <button
            onClick={() => {
              DeleteBlog(data.id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default BlogListView;
