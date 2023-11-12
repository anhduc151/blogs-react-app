import fb from "../../firebase";
import React, { useState } from "react";
import { message } from "antd"; // Import message from antd

const DB = fb.firestore();

const Blogslist = DB.collection("blogs");

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const submit = (e) => {
    e.preventDefault();
    Blogslist.add({
      Title: title,
      Body: body,
    })
      .then((docRef) => {
        message.success("Data successfully submitted"); // Show success message
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          submit(event);
        }}
      >
        <input
          type="text"
          placeholder="Title"
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
          onChange={(e) => {
            setBody(e.target.value);
          }}
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateBlog;
