import fb from "../../firebase";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const DB = fb.firestore();

const Blogslist = DB.collection("blogs");

const BlogView = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);


  Blogslist.doc(id)
    .get()
    .then((snapshot) => {
      const data = snapshot.data();
      setBlogs(data);
    });
  return (
    <div>
      <p>{blogs.Title}</p>
      <p>{blogs.Body}</p>
    </div>
  );
};

export default BlogView;
