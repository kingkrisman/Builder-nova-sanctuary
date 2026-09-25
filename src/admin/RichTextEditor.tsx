import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  Bold,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Undo2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { uploadImage } from "./upload";

/** WYSIWYG editor for blog articles. Stores HTML, the same format the site renders. */
export function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: { openOnClick: false, autolink: true },
      }),
      Image,
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-neutral max-w-none min-h-[420px] px-5 py-4 focus:outline-none prose-headings:font-bold prose-a:text-black prose-a:decoration-primary",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  // Keep in sync when the form loads an existing post after mount
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, value]);

  return (
    <div className="overflow-hidden rounded-xl border bg-white focus-within:ring-2 focus-within:ring-ring">
      {editor && <Toolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const addLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link address (leave empty to remove)", prev ?? "https://");
    if (url === null) return;
    if (url === "") editor.chain().focus().unsetLink().run();
    else editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const id = toast.loading("Uploading image…");
      try {
        const url = await uploadImage(file, "blog");
        editor.chain().focus().setImage({ src: url }).run();
        toast.success("Image added", { id });
      } catch (e) {
        toast.error((e as Error).message, { id });
      }
    };
    input.click();
  };

  const btn = (
    label: string,
    icon: JSX.Element,
    run: () => void,
    active = false,
  ) => (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      onClick={run}
      className={cn(
        "rounded-md p-2 text-neutral-600 transition hover:bg-neutral-100 hover:text-black",
        active && "bg-neutral-900 text-white hover:bg-neutral-800 hover:text-white",
      )}
    >
      {icon}
    </button>
  );

  const s = "h-4 w-4";
  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 border-b bg-neutral-50/95 px-2 py-1.5 backdrop-blur">
      {btn("Heading", <Heading2 className={s} />, () => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive("heading", { level: 2 }))}
      {btn("Subheading", <Heading3 className={s} />, () => editor.chain().focus().toggleHeading({ level: 3 }).run(), editor.isActive("heading", { level: 3 }))}
      <span className="mx-1 h-5 w-px bg-neutral-200" />
      {btn("Bold", <Bold className={s} />, () => editor.chain().focus().toggleBold().run(), editor.isActive("bold"))}
      {btn("Italic", <Italic className={s} />, () => editor.chain().focus().toggleItalic().run(), editor.isActive("italic"))}
      {btn("Link", <Link2 className={s} />, addLink, editor.isActive("link"))}
      <span className="mx-1 h-5 w-px bg-neutral-200" />
      {btn("Bulleted list", <List className={s} />, () => editor.chain().focus().toggleBulletList().run(), editor.isActive("bulletList"))}
      {btn("Numbered list", <ListOrdered className={s} />, () => editor.chain().focus().toggleOrderedList().run(), editor.isActive("orderedList"))}
      {btn("Quote", <Quote className={s} />, () => editor.chain().focus().toggleBlockquote().run(), editor.isActive("blockquote"))}
      {btn("Insert image", <ImagePlus className={s} />, addImage)}
      <span className="ml-auto" />
      {btn("Undo", <Undo2 className={s} />, () => editor.chain().focus().undo().run())}
      {btn("Redo", <Redo2 className={s} />, () => editor.chain().focus().redo().run())}
    </div>
  );
}
