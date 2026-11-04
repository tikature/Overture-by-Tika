import { getPost, getAllPosts } from "@/lib/blog";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { LucideArrowLeft, LucideCalendar, LucideTag } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | Program Notes`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-opera font-bold text-darkCream hover:text-cream transition-colors mb-8"
      >
        <LucideArrowLeft className="w-3 h-3" />
        <span>Back to Program Notes</span>
      </Link>

      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-3 text-xs font-opera uppercase tracking-wider text-warmCream/70 mb-4">
          <time dateTime={post.date}>
            <LucideCalendar className="w-3 h-3 inline mr-1" />
            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </time>
          {post.tags.map((tag) => (
            <span key={tag} className="flex items-center gap-1">
              <LucideTag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cream font-display leading-tight">
          {post.title}
        </h1>
      </header>

      <div className="prose prose-invert max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}