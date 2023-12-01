import { Input, message } from "antd";
import { app } from "../../../firebase";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc, collection } from "firebase/firestore";
import "./edit.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import Navbar from "../../navbar";
import Footer from "../../footer";

const DB = getFirestore(app);
const Blogslist = collection(DB, "blogs");

const BlogEdit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const storage = getStorage(app);

  const uploadImage = async () => {
    if (imageUpload == null) {
      return imageUrl;
    }

    try {
      const imageRef = storageRef(storage, `images/${imageUpload.name}`);
      await uploadBytes(imageRef, imageUpload);

      const newImageUrl = await getDownloadURL(imageRef);
      setImageUrl(newImageUrl);

      message.success("Image uploaded successfully");

      return newImageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      message.error("Error uploading image. Please try again.");
      return null;
    }
  };

  useEffect(() => {
    document.title = "Edit Blog - Slurp";
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(Blogslist, id);
        const snapshot = await getDoc(docRef);
        const data = snapshot.data();
        setTitle(data.Title);
        setBody(data.Body);
        setImageUrl(data.ImageUrl);
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleFileChange = (event) => {
    setImageUpload(event.target.files[0]);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const uploadedImageUrl = await uploadImage();
  
      const docRef = doc(Blogslist, id);
      await updateDoc(docRef, {
        Title: title,
        Body: body,
        ImageUrl: uploadedImageUrl || imageUrl,
      });
  
      message.success("Data successfully submitted");
    } catch (error) {
      console.error("Error updating document:", error);
      message.error("Error updating document. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="edit">
        <form
          onSubmit={(event) => {
            submit(event);
          }}
        >
          <div className="file-input-container">
            <input
              type="file"
              id="customFileInput"
              onChange={handleFileChange}
              className="custom-file-input"
            />
            <label htmlFor="customFileInput" className="custom-file-label">
              {imageUpload ? imageUpload.name : "Choose a file"}
            </label>
          </div>

          {imageUrl && (
            <div className="image-preview">
              <img
                src={imageUrl}
                alt="existing"
                className="create_uploaded_image"
              />
            </div>
          )}

          <p className="edit_p">Title</p>
          <Input
            type="text"
            placeholder="Title"
            onChange={handleTitleChange}
            className="edit_input"
            required
            value={title}
          />

          <p className="edit_p">Details</p>

          <ReactQuill
            theme="snow"
            value={body}
            onChange={(value) => {
              setBody(value);
            }}
          />

          <button type="submit" className="btn-submit">Submit</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default BlogEdit;
