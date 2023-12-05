import React, { useEffect, useState } from "react";
import "./contact.css";
// import Navbar from "../../navbar";
// import Footer from "../../footer";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { app } from "../../../firebase";
import { Link } from "react-router-dom";

const DB = getFirestore(app);

const Blogslist = collection(DB, "blogs");

const Contact = () => {
  useEffect(() => {
    document.title = "Contact - Slurp";
  }, []);

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(Blogslist, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBlogs(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <div className="home_foot_pad">
        <h2 className="home_foot_pad_h2">All Blogs</h2>

        <div className="home_grid">
          {blogs.map((data) => (
            <Link
              to={`/detail-blog/${data.id}`}
              key={data.id}
              className="grid_box"
            >
              <div className="grid_box_top">
                {data.ImageUrl && (
                  <img src={data.ImageUrl} alt="blog" className="grid_imgs" />
                )}
              </div>
              <div className="grid_box_foot">
                <p className="grid_box_foot_titles">{data.Title}</p>
                <p className="grid_box_foot_description">{data.Body}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default Contact;
