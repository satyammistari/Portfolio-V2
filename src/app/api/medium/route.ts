import { NextResponse } from 'next/server';
import { parseString } from 'xml2js';
import { promisify } from 'util';

const parseXML = promisify(parseString);

// Remove @ if present in the username
const MEDIUM_USERNAME = (process.env.MEDIUM_USERNAME || '@mistarisatyam').replace('@', '');

export async function GET() {
  try {
    const response = await fetch(`https://medium.com/feed/@${MEDIUM_USERNAME}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      }
    });

    if (!response.ok) {
      console.error('Medium RSS fetch failed:', response.status, response.statusText);
      throw new Error(`Failed to fetch Medium RSS feed: ${response.status}`);
    }

    const xmlData = await response.text();
    const result: any = await parseXML(xmlData);

    if (!result?.rss?.channel?.[0]?.item) {
      console.error('Invalid RSS structure:', result);
      return NextResponse.json({ posts: [] });
    }

    const posts = result.rss.channel[0].item.slice(0, 4).map((item: any) => {
      // Extract first image from content
      const contentEncoded = item['content:encoded']?.[0] || '';
      const imageMatch = contentEncoded.match(/<img[^>]+src="([^">]+)"/);
      const image = imageMatch ? imageMatch[1] : '';

      // Clean description
      const description = item.description?.[0]?.replace(/<[^>]*>/g, '').substring(0, 150) + '...' || '';

      return {
        title: item.title[0],
        link: item.link[0],
        pubDate: item.pubDate[0],
        description,
        image,
        categories: item.category || [],
      };
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Medium posts', posts: [] },
      { status: 200 } // Return 200 to prevent errors in UI
    );
  }
}
