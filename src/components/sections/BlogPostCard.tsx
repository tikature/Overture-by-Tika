import Link from "next/link";
import { BlogPost } from "@/lib/blog";

interface BlogPostCardProps {
  post: Omit<BlogPost, "content">;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="bg-obsidianBurgundy border border-darkCream/20 rounded-2xl p-6 opera-border-hover flex flex-col">
      <div className="flex items-center gap-2 text-xs font-opera uppercase tracking-wider text-warmCream/70 mb-3">
        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
        {post.tags.length > 0 && (
          <>
            <span aria-hidden="true">•</span>
            <span>{post.tags.join(", ")}</span>
          </>
        )}
      </div>
      <h3 className="text-xl font-bold text-cream font-display mb-2 group-hover:text-darkCream transition-colors">
        {post.title}
      </h3>
      <p className="text-softCream/80 text-sm leading-relaxed font-body mb-4 flex-1">
        {post.excerpt}
      </p>
      <Link
        href={`/blog/${post.slug}`}
        className="inline-flex items-center gap-1.5 text-xs font-opera font-bold text-darkCream hover:text-cream transition-colors"
      >
        <span>Read Program Notes</span>
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 7h10v10"></path>
          <path d="M7 17 17 7"></path>
        </svg>
      </Link>
    </article>
  );
}