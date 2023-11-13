import plane from "../../../assets/images/plane.png";
import homeright from "../../../assets/images/home_right_imgs.png";
import './home.css'

const Home = () => {
  return (
    <div className="home">
      <div className="home_left">
        <div className="home_leftt_box_h1">
          <h1 className="home_left_h1">fast</h1>
          <img src={plane} alt="plane" />
        </div>

        <h2 className="home_left_h2">Food Delivery</h2>
        <p className="home_left_p">
          Sed ut perspiciatis unde omnis iste natus sit voluptatem accusantium
          doloremque laudantium
        </p>

        <button className="home_left_button">view more</button>
      </div>

      <div className="home_right">
        <img
          src={homeright}
          alt="home right"
          className="home_right_imgs"
        />
      </div>
    </div>
  );
};

export default Home;
