import type { BlogPost } from "@/types";

// In-memory cache
let cachedPosts: BlogPost[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

const DEFAULT_FEED_URL = process.env.NEXT_PUBLIC_SUBSTACK_FEED_URL || "https://example.substack.com/feed";

function parseDate(dateStr: string): string {
  try {
    return new Date(dateStr).toISOString();
  } catch {
    return new Date().toISOString();
  }
}

function extractText(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`, "i");
  const match = xml.match(regex);
  return match ? match[1].trim() : "";
}

function extractAttribute(xml: string, tag: string, attr: string): string {
  const regex = new RegExp(`<${tag}[^>]*${attr}="([^"]*)"`, "i");
  const match = xml.match(regex);
  return match ? match[1] : "";
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function parseItems(xml: string): BlogPost[] {
  const items: BlogPost[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];

    const title = extractText(itemXml, "title");
    const link = extractText(itemXml, "link");
    const content = extractText(itemXml, "content:encoded") || extractText(itemXml, "description");
    const pubDate = extractText(itemXml, "pubDate");
    const author = extractText(itemXml, "dc:creator") || extractText(itemXml, "author") || "Awaken Visuals";

    // Extract cover image from content or enclosure
    let coverImage = extractAttribute(itemXml, "enclosure", "url");
    if (!coverImage) {
      const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
      coverImage = imgMatch ? imgMatch[1] : undefined!;
    }

    // Generate excerpt from content
    const plainText = stripHtml(content);
    const excerpt = plainText.length > 200 ? plainText.substring(0, 200) + "..." : plainText;

    items.push({
      title,
      slug: slugify(title),
      excerpt,
      content,
      coverImage: coverImage || undefined,
      publishedAt: parseDate(pubDate),
      author,
      link,
    });
  }

  return items;
}

export async function fetchSubstackPosts(feedUrl?: string): Promise<BlogPost[]> {
  const url = feedUrl || DEFAULT_FEED_URL;

  // Return cached data if still valid
  if (cachedPosts && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return cachedPosts;
  }

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent": "AwakenVisuals/1.0",
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch Substack feed: ${response.status}`);
      return [];
    }

    const xml = await response.text();
    const posts = parseItems(xml);

    // Update cache
    cachedPosts = posts;
    cacheTimestamp = Date.now();

    return posts;
  } catch (error) {
    console.error("Error fetching Substack feed:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string, feedUrl?: string): Promise<BlogPost | null> {
  const posts = await fetchSubstackPosts(feedUrl);
  return posts.find((post) => post.slug === slug) || null;
}
