export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  creator: string;
  content: string;
  contentSnippet: string;
  guid: string;
  categories: string[];
  thumbnail?: string;
}

export interface BlogItem {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  image?: string;
  tags: string[];
  mediumUrl: string;
  readTime: number;
  content: string;
  contentSnippet: string;
}

/**
 * Fetch and parse Medium RSS feed
 * Replace 'YOUR_MEDIUM_USERNAME' with your actual Medium username
 */
export async function fetchMediumPosts(): Promise<BlogItem[]> {
  try {
    // Get Medium username from environment variable
    const mediumUsername = process.env.MEDIUM_USERNAME || 'YOUR_MEDIUM_USERNAME';
    const rssFeedUrl = `https://medium.com/feed/${mediumUsername}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssFeedUrl)}`;
    
    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      console.error('Failed to fetch Medium posts');
      return [];
    }
    
    const data = await response.json();
    
    if (data.status !== 'ok') {
      console.error('RSS feed returned an error');
      return [];
    }
    
    return data.items.map((item: any) => {
      // Extract image from content or use thumbnail
      const imgRegex = /<img[^>]+src="([^">]+)"/;
      const imgMatch = item.content?.match(imgRegex);
      const image = imgMatch ? imgMatch[1] : item.thumbnail;
      
      // Generate slug from title
      const slug = item.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      // Extract text content for snippet (remove HTML tags)
      const textContent = item.content?.replace(/<[^>]*>/g, '') || item.description || '';
      const description = textContent.substring(0, 200).trim() + '...';
      
      // Get first 2-3 paragraphs for summary (approximately 500 characters)
      const contentSnippet = textContent.substring(0, 500).trim() + '...';
      
      // Estimate read time (average 200 words per minute)
      const wordCount = textContent.split(/\s+/).length;
      const readTime = Math.max(1, Math.ceil(wordCount / 200));
      
      return {
        title: item.title,
        slug,
        description,
        publishedAt: item.pubDate,
        image,
        tags: item.categories || [],
        mediumUrl: item.link,
        readTime,
        content: item.content || item.description || '',
        contentSnippet,
      };
    });
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    return [];
  }
}

/**
 * Get a single Medium post by slug
 */
export async function getMediumPost(slug: string): Promise<BlogItem | null> {
  const posts = await fetchMediumPosts();
  return posts.find(post => post.slug === slug) || null;
}
