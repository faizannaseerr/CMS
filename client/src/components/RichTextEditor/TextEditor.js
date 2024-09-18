import MenuBar from "./MenuBar";
import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import UnderlineExtension from "@tiptap/extension-underline";
import TypographyExtension from "@tiptap/extension-typography";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import Focus from "@tiptap/extension-focus";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import io from "socket.io-client"
import useAuthContext from "../../hooks/useAuthContext";

export default function TextEditor({ setText, content }) {
  const { user } = useAuthContext()
  const [socket, setSocket] = useState(null)




  useEffect(() => {
    const s = io("http://localhost:4000")
    setSocket(s)
    // const socket = io("http://localhost:4000")
    s.emit("join-main-room", user.username)

    return () => {
      s.disconnect();
    };
  }, [])

  const editor = useEditor({
    content: content,
    extensions: [
      StarterKit,
      TypographyExtension,
      UnderlineExtension,
      Placeholder.configure({
        placeholder: "Content...",
      }),
      Document,
      Paragraph,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Text,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Focus.configure({
        className: "has-focus",
        mode: "all",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl p-2 text-xl outline-gray-700 border-gray-700 rounded-sm",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setText(html);
      if (socket) {
        socket.emit("send-changes", html, "second") // hard coded room name but that is passed down from createBlog
      }
    },
  });

  // useEffect(() => {
  //   if (!editor) {
  //     return
  //   }
  //   editor.on('update', ({ editor }) => {
  //     console.log("form changing")
  //   })

  //   return () => {
  //     editor.off('update', ({ editor }) => {
  //       console.log("form changing")
  //     })
  //   }
  // }, [editor])

  return (
    <>
      {editor && <MenuBar editor={editor} />}
      <EditorContent
        className="mt-4 max-w-[45rem] mx-auto outline"
        editor={editor}
      />
    </>
  );
}
