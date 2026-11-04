import { compileMDX } from "next-mdx-remote/rsc";
import fs from "fs";
import path from "path";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string; // raw MDX source for MDXRemote
}

interface Frontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
}

const postsDirectory = path.join(process.cwd(), "src/content/blog");

export async function getAllPosts(): Promise<Omit<BlogPost, "content">[]> {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".mdx"));
  
  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = path.join(postsDirectory, fileName);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      
      const { frontmatter } = await compileMDX<Frontmatter>({
        source: fileContent,
        options: { parseFrontmatter: true },
      });
      
      const slug = fileName.replace(/\.mdx$/, "");
      return {
        slug,
        title: frontmatter.title,
        date: frontmatter.date,
        excerpt: frontmatter.excerpt,
        tags: frontmatter.tags || [],
      };
    })
  );

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  
  // Extract frontmatter and content
  const { frontmatter } = await compileMDX<Frontmatter>({
    source: fileContent,
    options: { parseFrontmatter: true },
  });

  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    excerpt: frontmatter.excerpt,
    tags: frontmatter.tags || [],
    content: fileContent, // raw MDX source
  };
}