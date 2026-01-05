import BlurFade from "@/components/magicui/blur-fade";
import { fetchMediumPosts } from "@/lib/medium-service";
import { BlogCard } from "@/components/blog-card";

export const metadata = {
  title: "Blog",
  description: "My thoughts on ML research, software development, and more.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await fetchMediumPosts();

  return (
    <section className="max-w-[800px] mx-auto">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter" style={{ fontFamily: "var(--font-geist-mono)" }}>
          Blog
        </h1>
      </BlurFade>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post, id) => (
          <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
            <BlogCard
              title={post.title}
              description={post.description}
              date={new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
              image={post.image}
              tags={post.tags}
              slug={post.slug}
              readTime={post.readTime}
            />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
