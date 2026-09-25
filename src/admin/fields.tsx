import { resizeImage } from "@/lib/image";
import { ReactNode, useRef, useState, KeyboardEvent, DragEvent } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  ImagePlus,
  Loader2,
  Star,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { uploadImage } from "./upload";

export function Field({
  label,
  hint,
  error,
  children,
  className,
  htmlFor,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
  htmlFor?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={htmlFor} className="text-sm font-semibold">
        {label}
      </Label>
      {children}
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : (
        hint && <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}

export function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border bg-white p-5 shadow-sm md:p-6">
      <div className="mb-5">
        <h2 className="text-base font-bold">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

/** Chips input for short lists like features or tags. Enter or comma adds an item. */
export function ListInput({
  value,
  onChange,
  placeholder,
  suggestions = [],
}: {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
}) {
  const [draft, setDraft] = useState("");

  const add = (raw: string) => {
    const item = raw.trim();
    if (!item || value.some((v) => v.toLowerCase() === item.toLowerCase())) return;
    onChange([...value, item]);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      add(draft);
      setDraft("");
    } else if (e.key === "Backspace" && !draft && value.length) {
      onChange(value.slice(0, -1));
    }
  };

  const unused = suggestions.filter((s) => !value.includes(s));

  return (
    <div className="space-y-3">
      <div className="flex min-h-11 flex-wrap items-center gap-2 rounded-md border bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-ring">
        {value.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1 rounded-full bg-neutral-100 py-1 pl-3 pr-1 text-sm"
          >
            {item}
            <button
              type="button"
              onClick={() => onChange(value.filter((v) => v !== item))}
              className="rounded-full p-0.5 text-neutral-500 hover:bg-neutral-200 hover:text-black"
              aria-label={`Remove ${item}`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => {
            add(draft);
            setDraft("");
          }}
          placeholder={value.length ? "" : placeholder}
          className="min-w-[10rem] flex-1 bg-transparent text-sm outline-none"
        />
      </div>
      {unused.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {unused.slice(0, 12).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => add(s)}
              className="rounded-full border border-dashed px-2.5 py-0.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-black"
            >
              + {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function useUploader(folder: string) {
  const [busy, setBusy] = useState(0);
  const upload = async (files: FileList | File[]) => {
    const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!list.length) return [];
    setBusy((n) => n + list.length);
    const results = await Promise.allSettled(list.map((f) => uploadImage(f, folder)));
    setBusy((n) => n - list.length);
    const urls: string[] = [];
    results.forEach((r, i) => {
      if (r.status === "fulfilled") urls.push(r.value);
      else toast.error(`Couldn't upload ${list[i].name}: ${(r.reason as Error).message}`);
    });
    return urls;
  };
  return { busy, upload };
}

/** Multiple photos with drag & drop, reordering, and a cover (first) image. */
export function GalleryField({
  value,
  onChange,
  folder,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  folder: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [urlDraft, setUrlDraft] = useState("");
  const { busy, upload } = useUploader(folder);

  const addFiles = async (files: FileList | File[]) => {
    const urls = await upload(files);
    if (urls.length) onChange([...value, ...urls]);
  };

  const move = (from: number, to: number) => {
    if (to < 0 || to >= value.length) return;
    const next = [...value];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-4">
      {value.length > 0 && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {value.map((url, i) => (
            <li
              key={url + i}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg border bg-neutral-100"
            >
              <img src={resizeImage(url, 480)} alt="" className="h-full w-full object-cover" />
              {i === 0 && (
                <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[11px] font-semibold text-black">
                  <Star className="h-3 w-3" /> Cover
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 flex justify-between gap-1 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                <div className="flex gap-1">
                  <IconBtn label="Move left" onClick={() => move(i, i - 1)} disabled={i === 0}>
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </IconBtn>
                  <IconBtn
                    label="Move right"
                    onClick={() => move(i, i + 1)}
                    disabled={i === value.length - 1}
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </IconBtn>
                  {i !== 0 && (
                    <IconBtn label="Make cover photo" onClick={() => move(i, 0)}>
                      <Star className="h-3.5 w-3.5" />
                    </IconBtn>
                  )}
                </div>
                <IconBtn
                  label="Remove photo"
                  onClick={() => onChange(value.filter((_, j) => j !== i))}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </IconBtn>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors",
          dragging ? "border-primary bg-primary/5" : "border-neutral-300",
        )}
      >
        {busy > 0 ? (
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        ) : (
          <ImagePlus className="h-6 w-6 text-neutral-400" />
        )}
        <p className="text-sm">
          {busy > 0 ? (
            `Uploading ${busy} photo${busy > 1 ? "s" : ""}…`
          ) : (
            <>
              Drag photos here, or{" "}
              <button
                type="button"
                className="font-semibold text-black underline decoration-primary decoration-2 underline-offset-4"
                onClick={() => inputRef.current?.click()}
              >
                browse
              </button>
            </>
          )}
        </p>
        <p className="text-xs text-muted-foreground">
          JPG, PNG or WebP. Large photos are resized automatically. The first photo is the cover.
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      <div className="flex gap-2">
        <Input
          value={urlDraft}
          onChange={(e) => setUrlDraft(e.target.value)}
          placeholder="…or paste an image link (https://…)"
          className="text-sm"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            if (/^https?:\/\//.test(urlDraft.trim())) {
              onChange([...value, urlDraft.trim()]);
              setUrlDraft("");
            } else {
              toast.error("Paste a full link starting with https://");
            }
          }}
        >
          Add link
        </Button>
      </div>
    </div>
  );
}

/** A single image (e.g. blog cover or author photo). */
export function ImageField({
  value,
  onChange,
  folder,
  aspect = "aspect-[16/9]",
}: {
  value: string;
  onChange: (next: string) => void;
  folder: string;
  aspect?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { busy, upload } = useUploader(folder);

  const pick = async (files: FileList | null) => {
    if (!files?.length) return;
    const [url] = await upload([files[0]]);
    if (url) onChange(url);
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50",
        aspect,
      )}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        pick(e.dataTransfer.files);
      }}
    >
      {value ? (
        <>
          <img src={resizeImage(value, 800)} alt="" className="h-full w-full object-cover" />
          <div className="absolute right-2 top-2 flex gap-2">
            <Button type="button" size="sm" variant="secondary" onClick={() => inputRef.current?.click()}>
              <Upload className="mr-1.5 h-3.5 w-3.5" /> Replace
            </Button>
            <Button type="button" size="sm" variant="secondary" onClick={() => onChange("")}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-full w-full flex-col items-center justify-center gap-2 text-sm text-muted-foreground hover:text-black"
        >
          {busy ? (
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          ) : (
            <ImagePlus className="h-6 w-6" />
          )}
          {busy ? "Uploading…" : "Click or drop an image"}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          pick(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  disabled,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="rounded-md bg-white/90 p-1.5 text-black shadow-sm transition hover:bg-white disabled:opacity-30"
    >
      {children}
    </button>
  );
}
