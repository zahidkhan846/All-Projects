import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function EditPost() {
  const { token } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageName, setImageName] = useState("Upload a file");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/feed/post/${id}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch post.");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        setTitle(resData.post.title);
        setContent(resData.post.content);
        setImage(resData.post.imageUrl);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
        setLoading(false);
      });
    setLoading(false);
  }, [id]);

  const onFileChange = (e) => {
    setImage(e.target.files[0]);
    setImageName(e.target.files[0].name);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    let url = `http://localhost:8080/feed/post/${id}`;
    let put = "PUT";

    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      method: put,
      body: formData,
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Creating or editing post faild!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        setLoading(false);
      })
      .catch((err) => setError(err.message));
    setLoading(false);
    history.push("/");
    setLoading(false);
  };

  if (!token && !loading) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="form-container">
      <form className="mt-20 p-1" onSubmit={submitFormHandler}>
        <h1 className="text-3xl mb-2 text-green-300">Update Post</h1>
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

export default EditPost;
