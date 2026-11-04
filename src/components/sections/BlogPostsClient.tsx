"use client";

import React from "react";
import BlogPostCard from "./BlogPostCard";
import { LucideBookOpen } from "lucide-react";
import { useI18n } from "@/components/providers/I18nProvider";

interface BlogPostsClientProps {
  posts: Array<{
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
  }>;
}

export default function BlogPostsClient({ posts }: BlogPostsClientProps) {
  const { t } = useI18n();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {posts.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <LucideBookOpen className="w-16 h-16 mx-auto text-darkCream/50 mb-4" />
          <h3 className="text-cream font-display text-xl mb-2">{t("blog.empty")}</h3>
          <p className="text-softCream/80">{t("blog.emptyDesc")}</p>
        </div>
      ) : (
        posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))
      )}
    </div>
  );
}