"use client";

import { PostCard } from "@/components/blog/post-card";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/shared/scroll-reveal";
import type { BlogPost } from "@/types";

interface BlogGridProps {
  posts: BlogPost[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  return (
    <ScrollReveal>
      <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {posts.map((post) => (
          <StaggerItem key={post.slug}>
            <PostCard post={post} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </ScrollReveal>
  );
}
