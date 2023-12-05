import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

function DefaultLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
