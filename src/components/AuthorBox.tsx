import Image from "next/image";
import { User, Globe, Linkedin } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { type BlogPost } from "@/lib/blog-queries";
import { urlForImage } from "@/lib/sanity-image";
import sanityLoader from "@/lib/sanity-loader";

type Author = NonNullable<BlogPost["author"]>;

type Props = {
  author: Author;
};

export default function AuthorBox({ author }: Props) {
  const imageUrl = author.image ? urlForImage(author.image).url() : null;

  return (
    <div className="bg-muted/30 rounded-lg p-6 border border-border/20">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        {imageUrl && (
          <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
            <Image
              loader={sanityLoader}
              src={imageUrl}
              alt={author.name}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
        )}

        <div className="flex-1">
          {/* Name */}
          <div className="flex items-center gap-2 mb-2">
            <User size={18} className="text-brand-blue" />
            <h3 className="text-lg font-bold text-foreground">{author.name}</h3>
          </div>

          {/* Bio */}
          {author.bio && (
            <div className="text-sm text-muted-foreground mb-3 prose dark:prose-invert prose-sm">
              <PortableText value={author.bio} />
            </div>
          )}

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {author.website && (
              <a
                href={author.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-brand-blue hover:underline"
              >
                <Globe size={14} />
                Website
              </a>
            )}
            {author.linkedin && (
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-brand-blue hover:underline"
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
