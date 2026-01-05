import { getMediumPost, fetchMediumPosts } from "@/lib/medium-service";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink, Calendar, Clock, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams() {
  const posts = await fetchMediumPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  let post = await getMediumPost(params.slug);

  if (!post) return;

  let ogImage = post.image || `${DATA.url}/og?title=${post.title}`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      url: `${DATA.url}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  let post = await getMediumPost(params.slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <section id="blog" className="max-w-[800px] mx-auto pb-16">
      {/* Hero Banner Image */}
      {post.image && (
        <div className="relative w-full h-64 md:h-96 -mx-6 mb-8 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6" style={{ fontFamily: "var(--font-geist-mono)" }}>
        {post.title}
      </h1>

      {/* Information Box */}
      <div className="bg-[#0c0c0c] border border-white/10 rounded-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-2 text-white/70">
          <Calendar className="w-4 h-4" />
          <div>
            <p className="text-[10px] text-white/50" style={{ fontFamily: "var(--font-geist-mono)" }}>Published</p>
            <p className="text-xs font-medium" style={{ fontFamily: "var(--font-geist-mono)" }}>{formattedDate}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-white/70">
          <Clock className="w-4 h-4" />
          <div>
            <p className="text-[10px] text-white/50" style={{ fontFamily: "var(--font-geist-mono)" }}>Read Time</p>
            <p className="text-xs font-medium" style={{ fontFamily: "var(--font-geist-mono)" }}>{post.readTime} minutes</p>
          </div>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex items-center gap-2 text-white/70">
            <Tag className="w-4 h-4" />
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-[10px] px-2 py-0.5 bg-white/5 border-white/10 uppercase"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Short Summary Content */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-geist-mono)" }}>Summary</h2>
        <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line" style={{ fontFamily: "var(--font-geist-mono)" }}>
          {post.contentSnippet}
        </p>
      </div>

      {/* Read Full Article on Medium */}
      <Link
        href={post.mediumUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors group"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
        </svg>
        <span>Read Full Post on Medium</span>
        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </section>
  );
}
