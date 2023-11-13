import React from "react";
import "./global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from './routes'


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
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index)=> {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />}></Route>
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
