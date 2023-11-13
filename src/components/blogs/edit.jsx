import { message } from "antd";
import fb from "../../firebase";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DB = fb.firestore();

const Blogslist = DB.collection("blogs");

const BlogEdit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    Blogslist.doc(id)
      .get()
      .then((snapshot) => {
        const data = snapshot.data();
        setTitle(data.Title);
        setBody(data.Body);
      });
  }, [id]);

  const submit = (e) => {
    e.preventDefault();
    Blogslist.doc(id).update({
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
          value={title}
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
          value={body}
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BlogEdit;
