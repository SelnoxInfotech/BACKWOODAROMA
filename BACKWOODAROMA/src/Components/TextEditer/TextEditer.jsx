import React, { useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function App() {
    const [editorState, setEditorState] = useState(""
        // () => EditorState.createEmpty(),
      );


      console.log(editorState)



   return (
      <Editor
      editorState={editorState}
        onEditorStateChange={setEditorState}
         toolbarClassName="toolbarClassName"
         wrapperClassName="wrapperClassName"
         editorClassName="editorClassName"
         wrapperStyle={{ width: 800, border: "1px solid black" }}
      />
   );
}