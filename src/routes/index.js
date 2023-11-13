import Home from "../components/pages/Home";
import CreateBlog from "../components/blogs/create";
import BlogListView from "../components/bloglist";
import BlogView from "../components/blogs/show";
import BlogEdit from "../components/blogs/edit";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/create", component: CreateBlog },
  { path: "/edit/:id", component: BlogEdit },
  { path: "/show/:id", component: BlogView },
  { path: "/list", component: BlogListView },
//   { path: "/sign-up", component: SignUp, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
