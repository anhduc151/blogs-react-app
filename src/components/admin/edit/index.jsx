import { message } from "antd";
import { app } from "../../../firebase";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc, collection } from "firebase/firestore";

const DB = getFirestore(app);

const Blogslist = collection(DB, "blogs"); // Use 'collection' instead of 'DB.collection'

const BlogEdit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

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
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(Blogslist, id);
      await updateDoc(docRef, {
        Title: title,
        Body: body,
      });
      message.success("Data successfully submitted");
    } catch (error) {
      console.error("Error updating document:", error);
    }
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
