import Quill from "quill";
import React, { useCallback, useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

function TextEditor() {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  const { id: docId } = useParams();

  useEffect(() => {
    if (!socket || !quill) return;
    const intervel = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, 2000);

    return () => {
      clearInterval(intervel);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (!socket || !quill) return;

    socket.once("set-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-document", docId);
  }, [socket, quill, docId]);

  useEffect(() => {
    if (!socket || !quill) return;
    const changeHandler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-change", delta);
    };

    quill.on("text-change", changeHandler);

    return () => {
      quill.off("text-change", changeHandler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (!socket || !quill) return;
    const changeHandler = (delta) => {
      quill.updateContents(delta);
    };

    socket.on("receive-change", changeHandler);

    return () => {
      socket.off("receive-change", changeHandler);
    };
  }, [socket, quill]);

  useEffect(() => {
    const skt = io("http://localhost:3001");

    setSocket(skt);

    return () => {
      skt.disconnect();
    };
  }, []);

  const containerRef = useCallback((container) => {
    if (!container) return;
    container.innerHTML = "";
    const editor = document.createElement("div");
    container.append(editor);
    const qul = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    qul.disable();
    qul.setText("Loading...");
    setQuill(qul);
  }, []);

  return <div className="container" ref={containerRef}></div>;
}

export default TextEditor;
