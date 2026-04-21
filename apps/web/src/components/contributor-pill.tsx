import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface ContributorPillProps {
  author: {
    img: string;
    name: string;
    url: string;
  };
  className?: string;
}

export function ContributorPill({ author, className }: ContributorPillProps) {
  return (
    <Button
      nativeButton={false}
      render={<a href={author.url} target="_blank" rel="noopener noreferrer" />}
      className={`mb-2 inline-flex h-auto items-center gap-2 rounded-[6px] border-transparent bg-docs-surface-raised px-3 py-1.5 text-xs text-docs-text transition-colors hover:border-transparent hover:bg-docs-border hover:text-docs-text-strong ${className ?? ''}`}
    >
      <Avatar className="size-5 after:border-0">
        <img src={author.img} alt={author.name} className="size-full rounded-full object-cover" />
      </Avatar>
      {author.name}
    </Button>
  );
}
