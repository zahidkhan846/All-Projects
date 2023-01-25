import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import { FormControlLabel, FormGroup } from "@material-ui/core";
import React, { useState } from "react";
import classes from "./PostForm.module.css";
import ReactDOM from "react-dom";
import ClearIcon from "@material-ui/icons/Clear";
import { useAlert } from "../../../store/AlertContext";
import { Camera, Send } from "@material-ui/icons";
import { uploadFile } from "../../../utils/helperFunctions";
import Label from "./Label";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#04773dfd" },
    secondary: { main: "#04773dfd" },
  },
});

export default function PostForm({ closeModal, post }) {
  const { showAlert } = useAlert();

  const [state, setState] = useState({
    html: false,
    css: false,
    js: false,
    react: false,
    gatsby: false,
    node: false,
    next: false,
    other: false,
  });

  const [isFeatured, setIsFeatured] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [postImage, setPostImage] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    setPostImage(file);
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageData = await uploadFile(postImage);

    setLoading(false);

    let checkedItems = [];

    for (let key in state) {
      if (state[key] === true) {
        checkedItems.push(key);
      }
    }

    const postBody = {
      title: title,
      author: author,
      content: content,
      code: code,
      tags: checkedItems,
      isFeatured: isFeatured,
      createdAt: new Date().toISOString(),
      imageUrl: imageData.url,
    };

    const res = await fetch("/api/posts/add-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody),
    });

    const data = await res.json();

    if (!res.ok) {
      showAlert({
        type: "error",
        desc: data.message || "Something went wrong.",
      });
      setLoading(false);
    } else {
      showAlert({
        type: "success",
        desc: data.message || "Successfully Posted.",
      });
      setLoading(false);
      closeModal();
    }
    setLoading(false);
  };

  return ReactDOM.createPortal(
    <ThemeProvider theme={theme}>
      <section className={classes.addPostContainer}>
        <article className={classes.addPost}>
          <form onSubmit={handleSubmit}>
            <header>
              <h2>Add new post</h2>
              <button className={classes.closeBtn} onClick={closeModal}>
                <ClearIcon />
              </button>
            </header>
            <div className={classes.formTitleAuthor}>
              <div className={classes.formInput}>
                <label htmlFor="post">Post Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Enter Post Title..."
                />
              </div>
              <div className={classes.formInput}>
                <label htmlFor="author">Author Name</label>
                <input
                  type="text"
                  placeholder="Enter Author..."
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
            </div>
            <div className={classes.formInput}>
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                rows="5"
                placeholder="Post Content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <div className={classes.formInput}>
              <label htmlFor="code">Code</label>
              <textarea
                id="code"
                rows="3"
                placeholder="Code Snippets..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
              ></textarea>
            </div>
            <div className={classes.checkBoxes}>
              <label htmlFor="tags">What is this Post about</label>
              <Label state={state} handleChange={handleChange} />
            </div>
            <div className={classes.checkBoxes}>
              <label htmlFor="featured">
                Is this post is includes high priority
              </label>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isFeatured}
                      onChange={(event) => setIsFeatured(event.target.checked)}
                      name="featured"
                    />
                  }
                  label="Is Featured"
                  color="primary"
                />
              </FormGroup>
            </div>
            <div className={classes.buttons}>
              <div className={classes.fileInputContainer}>
                <label htmlFor="file" className={classes.flexItem}>
                  <span>Pick File </span>
                  <Camera />
                </label>
                <input
                  className={classes.fileAddBtn}
                  type="file"
                  name="file"
                  id="file"
                  onChange={handleImage}
                />
              </div>
              <div>
                <button
                  className={`${classes.addPostBtn} ${classes.flexItem}`}
                  type="submit"
                  disabled={loading}
                >
                  <span>Save</span> <Send />
                </button>
              </div>
            </div>
          </form>
        </article>
      </section>
    </ThemeProvider>,
    document.getElementById("portal")
  );
}
