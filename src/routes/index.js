import Home from "../components/pages/Home";
import CreateBlog from "../components/admin/create";
import BlogListView from "../components/admin/blogList/index";
import BlogView from "../components/admin/detailsBlog";
import BlogEdit from "../components/admin/edit";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import Contact from "../components/pages/contact/index";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/create", component: CreateBlog },
  { path: "/edit/:id", component: BlogEdit },
  { path: "/detail-blog/:id", component: BlogView },
  { path: "/blog-list", component: BlogListView },
  { path: "/sign-in", component: SignIn, layout: null },
  { path: "/sign-up", component: SignUp, layout: null },
  { path: "/contact", component: Contact },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
