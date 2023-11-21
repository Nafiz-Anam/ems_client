import JoditEditor from "jodit-react";
import React, { useRef, useState } from "react";
const Editor = ({ content, setContent, name }) => {
  const editor = useRef(null);
  return (
    <div className="my-5">
      <JoditEditor
        className="h-96"
        ref={editor}
        value={content?.value}
        onChange={(newContent) => setContent({ name, value: newContent })}
      />
    </div>
  );
};
export default Editor;