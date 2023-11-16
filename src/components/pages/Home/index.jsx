import React from "react";
import plane from "../../../assets/images/plane.png";
import homeright from "../../../assets/images/home_right_imgs.png";
import "./home.css";
import { Link } from "react-router-dom";
import blogsview from "../../../assets/images/blogs_view.jpg";

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="home_left">
          <div className="home_leftt_box_h1">
            <h1 className="home_left_h1">fast</h1>
            <img src={plane} alt="plane" className="home_left_plane_imgs" />
          </div>

          <h2 className="home_left_h2">Food Delivery</h2>
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

      <div className="home_blog_list">
        <div className="home_blog_list_box">
          <div className="home_blog_list_box_top1">
            <img
              src={blogsview}
              alt="blog"
              className="home_blog_list_box_top1_imgs"
            />
          </div>

          <div className="home_blog_list_box_bottom">
            
          </div>
        </div>

        <div className="home_blog_list_box"></div>
        <div className="home_blog_list_box"></div>
        <div className="home_blog_list_box"></div>
        <div className="home_blog_list_box"></div>
        <div className="home_blog_list_box"></div>
      </div>
    </>
  );
};

export default Home;
