import React, { Fragment } from "react";
import "./global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import DarkMode from "./components/DarkMode";
import DefaultLayout from "./layout/DefaultLayout";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route exact path="/" element={<BlogListView />}></Route>
    //     <Route exact path="/create" element={<CreateBlog />}></Route>
    //     <Route exact path="/show/:id" element={<BlogView />}></Route>
    //     <Route exact path="/edit/:id" element={<BlogEdit />}></Route>
    //   </Routes>
    // </Router>
    <Router>
      <div>
        <DarkMode />
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                // element={<Page />}
                element={
                  <Layout>
                    <Navbar />
                    <Page />
                    <Footer />
                  </Layout>
                }
              ></Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
