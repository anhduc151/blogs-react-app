import React, { useEffect, useState } from "react";
import plane from "../../../assets/images/plane.png";
import homeright from "../../../assets/images/blog_views.png";
import "./home.css";
import { Link } from "react-router-dom";
import { app } from "../../../firebase";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import Navbar from "../../navbar";
import Footer from "../../footer";

const DB = getFirestore(app);
const Blogslist = collection(DB, "blogs");

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    document.title = "Slurp";
  }, []);

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
      <Navbar />
      <div className="home">
        <div className="home_left">
          <div className="home_leftt_box_h1">
            <h1 className="home_left_h1">Infinite </h1>
            <img src={plane} alt="plane" className="home_left_plane_imgs" />
          </div>

          <h2 className="home_left_h2">Code, Infinite Solutions</h2>
          <p className="home_left_p">
            Sed ut perspiciatis unde omnis iste natus sit voluptatem accusantium
            doloremque laudantium
          </p>

          <Link to="/blog-list">
            <button className="home_left_button">view more</button>
          </Link>
        </div>

        <div className="home_right">
          <img src={homeright} alt="home right" className="home_right_imgs" />
        </div>
      </div>

      {/* Home Foot */}
      <div className="home_foot_pad">
        <h2 className="home_foot_pad_h2">Most Viewed</h2>

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
                <p className="grid_box_foot_description" dangerouslySetInnerHTML={{ __html: data.Body }}></p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
