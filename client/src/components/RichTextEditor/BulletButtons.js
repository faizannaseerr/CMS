import StyledToggleButtonGroup from "./StyledToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

export default function BulletButtons({ editor }) {
  return (
    <StyledToggleButtonGroup size="small" exclusive aria-label="text alignment">
      <ToggleButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        value="bullettList"
        aria-label="bullettList"
        selected={editor.isActive("bulletList")}
      >
        <FormatListBulletedIcon />
      </ToggleButton>
      <ToggleButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        value="orderedList"
        aria-label="orderedList"
        selected={editor.isActive("orderedList")}
      >
        <FormatListNumberedIcon />
      </ToggleButton>
    </StyledToggleButtonGroup>
  );
}
