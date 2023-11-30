import { app } from "../../../firebase";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { storage } from "../../../firebase";
import "./create.css";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import Navbar from "../../navbar";
import Footer from "../../footer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const DB = getFirestore(app);
const Blogslist = collection(DB, "blogs");

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const deleteImage = () => {
    setImageUpload(null);
    setImageUrl(null);
  };

  const uploadImage = async () => {
    if (imageUpload == null) {
      message.error("Please upload an image");
      return null;
    }

    try {
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      await uploadBytes(imageRef, imageUpload);

      const imageUrl = await getDownloadURL(imageRef);
      setImageUrl(imageUrl);

      message.success("Image uploaded successfully");

      return imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      message.error("Error uploading image. Please try again.");
      return null;
    }
  };

  const submit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    try {
      // Tải lên ảnh trước khi đăng blog
      const uploadedImageUrl = await uploadImage();

      // Nếu có ảnh, thêm blog vào Firestore
      if (uploadedImageUrl) {
        await addDoc(Blogslist, {
          Title: title,
          Body: body,
          ImageUrl: uploadedImageUrl,
        });

        // Hiển thị thông báo thành công
        message.success("Blog successfully created");

        // Clear form và state
        setTitle("");
        setBody("");
        setImageUpload(null);
        setImageUrl(null);
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      message.error("Error creating blog. Please try again.");
    }
  };

  useEffect(() => {
    document.title = "Create Blog - Slurp";
  }, []);

  return (
    <>
      <Navbar />
      <div className="create">
        <form
          className="create_form"
          onSubmit={(event) => {
            submit(event);
          }}
        >
          {!imageUrl && (
            <>
              <input
                type="file"
                onChange={(event) => {
                  setImageUpload(event.target.files[0]);
                }}
              />
            </>
          )}

          {imageUrl ? (
            <div className="image-preview">
              <img
                src={imageUrl}
                alt="uploaded"
                className="create_uploaded_image"
              />
              <div className="image-actions">
                <button type="button" onClick={deleteImage}>
                  Delete
                </button>
              </div>
            </div>
          ) : null}

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />

          {/* <textarea
            name="content"
            type="text"
            placeholder="Write your content here"
            rows="10"
            cols="150"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
            required
          ></textarea> */}
          <ReactQuill
            theme="snow"
            value={body}
            onChange={(value) => {
              setBody(value);
            }}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateBlog;
