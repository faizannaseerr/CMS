import React from "react";

import { Paper, Divider } from "@mui/material";

import HeadingButtons from "./HeadingButtons";
import TextStylingButtons from "./TextStylingButtons";
import BulletButtons from "./BulletButtons";
import UndoRedoButtons from "./UndoRedoButtons";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }
  return (
    <>
      <Paper
        className="max-w-fit mx-auto items-center justify-center"
        elevation={1}
        sx={{
          display: "flex",
          border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: "wrap",
          mb: 2,
          position: "sticky",
          top: 10,
          z: 9999,
        }}
      >
        <HeadingButtons editor={editor} />
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <TextStylingButtons editor={editor} />
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <BulletButtons editor={editor} />
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <UndoRedoButtons editor={editor} />
      </Paper>
    </>
  );
};

export default MenuBar;
