import { getAllPosts } from "@/lib/blog";
import BlogPostCard from "@/components/sections/BlogPostCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { LucideBookOpen } from "lucide-react";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="PROGRAM NOTES"
          title="Blog"
        >
          Technical writings, architectural decisions, and behind-the-scenes notes from the stage.
        </SectionHeading>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <LucideBookOpen className="w-16 h-16 mx-auto text-darkCream/50 mb-4" />
            <h3 className="text-cream font-display text-xl mb-2">No Performances Yet</h3>
            <p className="text-softCream/80">The program notes are being written. Check back soon for technical articles and architectural deep-dives.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}