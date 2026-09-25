import { escapeHtml, fetchRows, previewImage, siteOrigin } from "./_lib.js";

// Social apps (WhatsApp, Facebook, X, LinkedIn…) don't run JavaScript, so a shared property or
// article link would otherwise show the site's generic preview. vercel.json routes crawler
// requests for those URLs here; we return the normal index.html with the listing's own
// title, description and photo filled in. Real visitors never hit this function.

interface PropertyRow {
  title: string;
  description: string;
  image_url: string;
  images: string[];
  price: number;
  status: string;
  location: string;
  bedrooms: number | null;
}

interface PostRow {
  title: string;
  excerpt: string;
  image_url: string;
  author: string;
}

async function lookup(params: URLSearchParams) {
  const type = params.get("type");
  if (type === "property") {
    const id = Number(params.get("id"));
    if (!Number.isInteger(id)) return null;
    const [p] = await fetchRows<PropertyRow>(
      "properties",
      `select=title,description,image_url,images,price,status,location,bedrooms&id=eq.${id}&published=eq.true`,
    );
    if (!p) return null;
    const price = `₦${Number(p.price).toLocaleString("en-NG")}${p.status === "For Rent" ? "/year" : ""}`;
    return {
      path: `/properties/${id}`,
      title: `${p.title} · ${price}`,
      description: `${p.status} in ${p.location}${p.bedrooms ? ` · ${p.bedrooms} bedrooms` : ""}. ${p.description}`,
      image: previewImage(p.image_url || p.images?.[0]),
      type: "website",
    };
  }
  if (type === "blog") {
    const slug = params.get("slug") ?? "";
    if (!/^[a-z0-9-]{1,120}$/.test(slug)) return null;
    const [post] = await fetchRows<PostRow>(
      "blog_posts",
      `select=title,excerpt,image_url,author&slug=eq.${slug}&published=eq.true`,
    );
    if (!post) return null;
    return {
      path: `/blog/${slug}`,
      title: post.title,
      description: post.excerpt,
      image: previewImage(post.image_url),
      type: "article",
    };
  }
  return null;
}

function setMeta(html: string, attr: "name" | "property", key: string, value: string) {
  const tag = `<meta ${attr}="${key}" content="${escapeHtml(value)}" />`;
  const pattern = new RegExp(`<meta ${attr}="${key}"[^>]*>`);
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

export async function GET(request: Request) {
  const origin = siteOrigin(request);
  const indexRes = await fetch(`${origin}/index.html`);
  let html = await indexRes.text();

  const page = await lookup(new URL(request.url).searchParams).catch(() => null);
  if (page) {
    const title = `${page.title} | Da'sayonce Real Estate`;
    const description = page.description.length > 200 ? `${page.description.slice(0, 197)}…` : page.description;
    const url = `${origin}${page.path}`;

    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
    html = setMeta(html, "name", "description", description);
    html = setMeta(html, "property", "og:title", title);
    html = setMeta(html, "property", "og:description", description);
    html = setMeta(html, "property", "og:type", page.type);
    html = setMeta(html, "property", "og:url", url);
    html = setMeta(html, "name", "twitter:title", title);
    html = setMeta(html, "name", "twitter:description", description);
    if (page.image) {
      html = setMeta(html, "property", "og:image", page.image);
      html = setMeta(html, "name", "twitter:image", page.image);
    }
    html = html.replace("</head>", `    <link rel="canonical" href="${escapeHtml(url)}" />\n  </head>`);
  }

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400",
    },
  });
}
