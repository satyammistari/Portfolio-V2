"use client";

import { useEffect, useState } from "react";
import { BlogCard } from "@/components/blog-card";

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  image: string;
  categories: string[];
}

export function MediumBlogCard() {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/medium")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch Medium posts:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-[#0c0c0c] dark:bg-[#0c0c0c] light:bg-white rounded-lg border border-white/10 dark:border-white/10 light:border-zinc-200 h-64 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-white/60 dark:text-white/60 light:text-zinc-500">
        <p>No Medium posts found. Check your configuration.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.slice(0, 4).map((post) => (
        <a
          key={post.link}
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <BlogCard
            title={post.title}
            description={post.description}
            date={new Date(post.pubDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            image={post.image || "/placeholder.png"}
            tags={post.categories.slice(0, 2)}
            slug={post.link}
          />
        </a>
      ))}
    </div>
  );
}
