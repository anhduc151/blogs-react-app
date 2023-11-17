import Home from "../components/pages/Home";
import CreateBlog from "../components/admin/create";
import BlogListView from "../components/bloglist";
import BlogView from "../components/admin/detailsJob";
import BlogEdit from "../components/admin/edit";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/create", component: CreateBlog },
  { path: "/edit/:id", component: BlogEdit },
  { path: "/detail-jobs/:id", component: BlogView },
  { path: "/blog-list", component: BlogListView },
  { path: "/sign-in", component: SignIn },
  { path: "/sign-up", component: SignUp },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
