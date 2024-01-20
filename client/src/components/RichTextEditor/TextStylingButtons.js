import StyledToggleButtonGroup from "./StyledToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

export default function TextStylingButtons({ editor }) {
  return (
    <StyledToggleButtonGroup size="small" exclusive aria-label="text alignment">
      <ToggleButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        selected={editor.isActive("bold")}
        value="bold"
        aria-label="bold"
      >
        <FormatBoldIcon />
      </ToggleButton>

      <ToggleButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        value="italic"
        aria-label="italic"
        selected={editor.isActive("italic")}
      >
        <FormatItalicIcon />
      </ToggleButton>
      <ToggleButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        selected={editor.isActive("underline")}
        value="underline"
        aria-label="underline"
      >
        <FormatUnderlinedIcon />
      </ToggleButton>
      <ToggleButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        value="strike"
        aria-label="strike"
        selected={editor.isActive("strike")}
      >
        <FormatStrikethroughIcon />
      </ToggleButton>
      <ToggleButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        value="blockQuote"
        aria-label="blockQuote"
        selected={editor.isActive("blockQuote")}
      >
        <FormatQuoteIcon />
      </ToggleButton>
    </StyledToggleButtonGroup>
  );
}
