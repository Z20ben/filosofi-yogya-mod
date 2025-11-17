import { Badge } from '@/components/ui/badge';

type Status = 'draft' | 'published' | 'archived';

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    draft: {
      label: 'Draft',
      className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    },
    published: {
      label: 'Published',
      className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    },
    archived: {
      label: 'Archived',
      className: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
    },
  };

  const { label, className } = config[status];

  return <Badge className={className}>{label}</Badge>;
}
