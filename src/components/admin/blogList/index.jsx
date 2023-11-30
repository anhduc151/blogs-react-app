import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Input, message, Pagination } from "antd";
import { app } from "../../../firebase";
import { doc } from "firebase/firestore";
import {
  getFirestore,
  collection,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import Navbar from "../../navbar";
import "./blog-list.css";
import Footer from "../../footer";

const DB = getFirestore(app);

const Blogslist = collection(DB, "blogs"); // Use 'collection' directly

const BlogListView = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 3;

  useEffect(() => {
    // Subscribe to query with onSnapshot
    const unsubscribe = onSnapshot(Blogslist, (querySnapshot) => {
      // Get all documents from collection - with IDs
      const data = querySnapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))

        .filter((blog) =>
          blog.Title.toLowerCase().includes(searchValue.toLowerCase())
        );

      // Update state
      setBlogs(data);
    });

    // Detach listener
    return () => unsubscribe();
  }, [searchValue]);

  const handleSearch = (e) => {
    setCurrentPage(1);
    setSearchValue(e.target.value);
  };

  const deleteBlog = async (id) => {
    try {
      const docRef = doc(Blogslist, id); // Get a reference to the document
      await deleteDoc(docRef);
      message.success("Blog deleted successfully!");
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedBlogs = blogs.slice(startIndex, endIndex);

  useEffect(() => {
    document.title = "Blog List - Slurp";
  }, []);

  return (
    <div>
      <Navbar />
      <div className="blog_list">
        <Input
          placeholder="Search title"
          className="input_search"
          value={searchValue}
          onChange={handleSearch}
        />
        {displayedBlogs.map((data) => (
          <div key={data.id} className="blog_list_key">
            <p className="blog_list_title">
              Title: <span>{data.Title}</span>
            </p>
            <p className="blog_list_description">
              Description:{" "}
              <span dangerouslySetInnerHTML={{ __html: data.Body }} />
            </p>
            <div className="blog_list_button_edit">
              <Link to={`/detail-blog/${data.id}`} className="btn_view">
                View
              </Link>
              <Link to={`/edit/${data.id}`} className="btn_edit">
                Edit
              </Link>
              <button
                className="btn_delete"
                onClick={() => {
                  deleteBlog(data.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <div className="panigation">
          <Pagination
            defaultCurrent={1}
            current={currentPage}
            pageSize={pageSize}
            total={blogs.length}
            onChange={handlePageChange}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogListView;
