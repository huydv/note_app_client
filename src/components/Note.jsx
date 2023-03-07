import React, { useEffect, useMemo, useState } from "react";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { useLoaderData, useLocation, useSubmit } from "react-router-dom";
import { debounce } from "@mui/material";

export default function Note() {
  // const note = {
  //   id: 999,
  //   content: "<p>Detail note content</p>",
  // };
  const { note } = useLoaderData();

  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });
  const [rawHtml, setRawHtml] = useState(note.content);
  const submit = useSubmit();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    setRawHtml(note.content);
  }, [note.content]);

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(note.content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
  }, [note.id]);

  useEffect(() => {
    debounceMemoried(rawHtml, note, location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawHtml, location.pathname]);

  const debounceMemoried = useMemo(() => {
    return debounce((rawHtml, note, pathname) => {
      if (rawHtml === note.content) return;
      submit(
        {
          ...note,
          content: rawHtml,
        },
        {
          method: "POST",
          action: location.pathname,
        }
      );
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleOnChange = (e) => {
    setEditorState(e);
    setRawHtml(draftToHtml(convertToRaw(e.getCurrentContent())));
  };
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      placeholder="Write note"
    ></Editor>
  );
}
