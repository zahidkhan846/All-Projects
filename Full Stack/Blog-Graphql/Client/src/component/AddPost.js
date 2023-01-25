import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function AddPost() {
  const { token } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageName, setImageName] = useState("Upload a file");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const onFileChange = (e) => {
    setImage(e.target.files[0]);
    setImageName(e.target.files[0].name);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    fetch("http://localhost:4000/post-image", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const imageUrl = data.filePath.replace("\\", "/");
        console.log(imageUrl);

        const graphqlQuery = {
          query: `
            mutation {
              createPost(postInput: {title: "${title}", content: "${content}", imageUrl: "${imageUrl}"}) {
                _id
              }
            }
            `,
        };
        return fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(graphqlQuery),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data.errors) {
              throw new Error("Add post failed!");
            }
            history.push("/posts");
          });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="form-container">
      <form className="mt-20 p-1" onSubmit={submitFormHandler}>
        <h1 className="text-3xl mb-2 text-green-300">Add Post</h1>
        {error && <p className="mb-1 text-red-500">{error}</p>}
        <label
          htmlFor="title"
          className="block text-m font-medium text-gray-700 mb-1"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="mb-5 h-7 flex-1 block w-full border-2 border-yellow-500 rounded sm:text-sm"
        />

        <label
          htmlFor="content"
          className="block text-m font-medium text-gray-700 mb-1"
        >
          Content
        </label>
        <div className="mt-1">
          <textarea
            id="content"
            name="content"
            rows="5"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="mb-5 flex-1 block w-full border-2 border-yellow-500 rounded sm:text-sm"
          />
        </div>

        <div className="flex text-m text-gray-600">
          <label
            htmlFor="file-upload"
            className="mb-5 relative cursor-pointer rounded font-medium"
          >
            <span className="text-red-400 hover:text-green-400">
              {imageName}
            </span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              onChange={onFileChange}
            />
          </label>
          <p className="pl-2">JPEG & PNG file type supported only.</p>
        </div>

        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-m font-medium rounded-md text-white bg-green-500 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default AddPost;
