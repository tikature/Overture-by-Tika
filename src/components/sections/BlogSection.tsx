import { getAllPosts } from "@/lib/blog";
import SectionHeading from "@/components/ui/SectionHeading";
import BlogPostsClient from "./BlogPostsClient";

export default async function BlogSection() {
  const posts = await getAllPosts();

  return (
    <section id="blog" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="PROGRAM NOTES"
          title="Blog"
        >
          Technical writings, architectural decisions, and behind-the-scenes notes from the stage.
        </SectionHeading>

        <BlogPostsClient posts={posts} />
      </div>
    </section>
  );
}