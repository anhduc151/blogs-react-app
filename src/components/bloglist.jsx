import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { message } from "antd";
import { app } from "../firebase";
import { doc } from "firebase/firestore";
import { getFirestore, collection, onSnapshot, deleteDoc } from "firebase/firestore";

const DB = getFirestore(app);

const Blogslist = collection(DB, "blogs"); // Use 'collection' directly

const BlogListView = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Subscribe to query with onSnapshot
    const unsubscribe = onSnapshot(Blogslist, (querySnapshot) => {
      // Get all documents from collection - with IDs
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // Update state
      setBlogs(data);
    });

    // Detach listener
    return () => unsubscribe();
  }, []);

  const deleteBlog = async (id) => {
    try {
      const docRef = doc(Blogslist, id); // Get a reference to the document
      await deleteDoc(docRef);
      message.success("Blog deleted successfully!");
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  return (
    <div>
      {blogs.map((data) => (
        <div key={data.id}>
          <p className="title">Title: {data.Title}</p>
          <p className="body">Body: {data.Body}</p>
          <Link to={`/detail-jobs/${data.id}`}>View</Link>
          <Link to={`/edit/${data.id}`}>Edit</Link>
          <button
            onClick={() => {
              deleteBlog(data.id);
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
