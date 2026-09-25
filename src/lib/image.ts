// Image CDN helpers. Most photos on the site come from Pexels or Builder.io, both of which
// resize on the fly; asking for the size we actually render is the single biggest perf win
// (originals are 1–4 MB each and were causing multi-hundred-ms decode stalls while scrolling).

const WIDTHS = [480, 768, 1080, 1440, 1920];

function withParams(url: string, params: Record<string, string | number>) {
  try {
    const u = new URL(url);
    Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, String(v)));
    return u.toString();
  } catch {
    return url;
  }
}

export function resizeImage(url: string | undefined, width: number): string {
  if (!url) return "";
  if (url.includes("images.pexels.com")) {
    return withParams(url, { auto: "compress", cs: "tinysrgb", w: width });
  }
  if (url.includes("cdn.builder.io/api/v1/image")) {
    return withParams(url, { width, format: "webp", quality: 75 });
  }
  if (url.includes("images.unsplash.com")) {
    return withParams(url, { auto: "format", q: 75, w: width });
  }
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    // Cloudinary takes transformations as a path segment right after /upload/
    return url.replace(/\/upload\/(?:[a-z]_[^/]*\/)?/, `/upload/w_${width},c_limit,f_auto,q_auto/`);
  }
  return url;
}

export function imageSrcSet(url: string | undefined, maxWidth = 1920) {
  if (!url || !/pexels|builder\.io|unsplash|cloudinary/.test(url)) return undefined;
  return WIDTHS.filter((w) => w <= maxWidth)
    .map((w) => `${resizeImage(url, w)} ${w}w`)
    .join(", ");
}
