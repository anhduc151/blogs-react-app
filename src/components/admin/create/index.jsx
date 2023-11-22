import { app } from "../../../firebase";
import React, { useEffect, useState } from "react";
import { message } from "antd";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { storage } from "../../../firebase";
import "./create.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import Navbar from "../../navbar";
import Footer from "../../footer";

const DB = getFirestore(app);
const Blogslist = collection(DB, "blogs");

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  // const imageListRef = ref(storage, "images/");

  const deleteImage = () => {
    setImageUpload(null);
    setImageUrl(null);
  };

  const uploadImage = async () => {
    if (imageUpload == null) {
      message.error("Please upload an image");
      return null; // Trả về null nếu không có ảnh
    }

    try {
      // Upload image to storage
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      await uploadBytes(imageRef, imageUpload);

      // Get image URL
      const imageUrl = await getDownloadURL(imageRef);
      setImageUrl(imageUrl);

      // Display success message
      message.success("Image uploaded successfully");

      // Update state with the image URL
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      message.error("Error uploading image. Please try again.");
      return null; // Trả về null nếu có lỗi khi tải ảnh lên
    }
  };

  const submit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    try {
      // Upload image
      const uploadedImageUrl = await uploadImage();
      console.log(
        "🚀 ~ file: index.jsx:56 ~ submit ~ uploadedImageUrl:",
        uploadedImageUrl
      );

      // Nếu có ảnh, thêm blog vào Firestore
      if (uploadedImageUrl) {
        await addDoc(Blogslist, {
          Title: title,
          Body: body,
          ImageUrl: uploadedImageUrl,
        });

        // Hiển thị thông báo thành công
        message.success("Blog successfully created");

        // clear form
        setTitle("");
        setBody("");
        setImageUpload(null);
        setImageUrl(uploadedImageUrl); // Lưu URL của ảnh để hiển thị sau này
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
          {!imageUrl ? (
            <>
              <input
                type="file"
                onChange={(event) => {
                  setImageUpload(event.target.files[0]);
                }}
              />
              <button type="button" onClick={uploadImage}>
                Upload Image
              </button>
            </>
          ) : (
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
          )}

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />

          <textarea
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
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateBlog;
