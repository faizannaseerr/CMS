import StyledToggleButtonGroup from "./StyledToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";

export default function UndoRedoButtons({ editor }) {
  return (
    <StyledToggleButtonGroup size="small" exclusive aria-label="text alignment">
      <ToggleButton
        onClick={() => editor.chain().focus().undo().run()}
        value="undo"
        aria-label="undo"
      >
        <UndoIcon />
      </ToggleButton>
      <ToggleButton
        onClick={() => editor.chain().focus().redo().run()}
        value="redo"
        aria-label="redo"
      >
        <RedoIcon />
      </ToggleButton>
    </StyledToggleButtonGroup>
  );
}
