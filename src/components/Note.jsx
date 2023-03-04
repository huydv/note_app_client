import React, { useEffect, useState } from "react";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

export default function Note() {
  const note = {
    id: 999,
    content: "<p>Detail note content</p>",
  };

  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });
  const [rawHtml, setRawHtml] = useState(note.content);

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
