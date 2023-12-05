import Home from "../components/pages/Home";
import CreateBlog from "../components/admin/create";
import BlogListView from "../components/admin/blogList/index";
import BlogView from "../components/admin/detailsBlog";
import BlogEdit from "../components/admin/edit";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import Contact from "../components/pages/contact/index";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const publicRoutes = [
  { path: "/", component: Home, layout: null },
  { path: "/create", component: CreateBlog, layout: null },
  { path: "/edit/:id", component: BlogEdit, layout: null },
  { path: "/detail-blog/:id", component: BlogView, layout: null },
  { path: "/blog-list", component: BlogListView, layout: null },
  { path: "/sign-in", component: SignIn, layout: null },
  { path: "/sign-up", component: SignUp, layout: null },
  { path: "/contact", component: Contact, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
