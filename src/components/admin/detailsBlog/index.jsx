import { app } from "../../../firebase";
import "./detail-blog.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";

const DB = getFirestore(app);
const Blogslist = collection(DB, "blogs");

const BlogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    document.title = "Details Blog - Slurp";
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogDoc = doc(Blogslist, id);
        const snapshot = await getDoc(blogDoc);
        if (snapshot.exists()) {
          setBlog(snapshot.data());
        } else {
          console.error("Document not found");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchBlog();
  }, [id]);

  return (
    <div>
      <div className="details">
        <h1 className="details_h1">{blog.Title}</h1>
        <p className="details_p">{blog.Body}</p>
      </div>
    </div>
  );
};

export default BlogView;
