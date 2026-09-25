import { MEDIA_BUCKET, supabase } from "@/lib/supabase";

const MAX_DIMENSION = 2000;
const QUALITY = 0.82;

/**
 * Shrinks a photo in the browser before upload (phone photos are often 5–12 MB),
 * converting to WebP. Falls back to the original file if the browser can't decode it.
 */
async function compress(file: File): Promise<Blob> {
  if (file.type === "image/gif") return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", QUALITY),
    );
    return blob && blob.size < file.size ? blob : file;
  } catch {
    return file;
  }
}

/** Uploads an image to the public media bucket and returns its public URL. */
export async function uploadImage(file: File, folder: string): Promise<string> {
  if (!supabase) throw new Error("The content database isn't connected yet.");
  if (!file.type.startsWith("image/")) throw new Error(`${file.name} is not an image.`);

  const blob = await compress(file);
  const ext = blob.type === "image/webp" ? "webp" : (file.name.split(".").pop() ?? "jpg");
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, blob, {
    contentType: blob.type || file.type,
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) throw error;

  return supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
