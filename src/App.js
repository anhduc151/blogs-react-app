import React from "react";
import "./global.css";
import CreateBlog from "./components/blogs/create";
import BlogListView from "./components/bloglist";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogView from "./components/blogs/show";
import BlogEdit from "./components/blogs/edit";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<BlogListView />}></Route>
        <Route exact path="/create" element={<CreateBlog />}></Route>
        <Route exact path="/show/:id" element={<BlogView />}></Route>
        <Route exact path="/edit/:id" element={<BlogEdit />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
