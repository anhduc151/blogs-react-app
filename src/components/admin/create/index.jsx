// Import the specific named exports from the firebase file
import { app } from "../../../firebase";
import React, { useEffect, useState } from "react";
import { message } from "antd";

// Access the firestore method from the initialized app
import { getFirestore, collection, addDoc } from "firebase/firestore";

const DB = getFirestore(app);

const Blogslist = collection(DB, "blogs");

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    // set title
    document.title = "Create Blog - Slurp";
  }, []);

  const submit = (e) => {
    e.preventDefault();
    addDoc(Blogslist, {
      Title: title,
      Body: body,
    })
      .then((docRef) => {
        message.success("Data successfully submitted");
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
