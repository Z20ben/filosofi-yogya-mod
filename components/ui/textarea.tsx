import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none border-2 border-border placeholder:text-muted-foreground focus-visible:border-[var(--javanese-brown-bg)] focus-visible:ring-[var(--javanese-brown-bg)]/20 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-background dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md px-3 py-2 text-base transition-all outline-none focus-visible:ring-4 hover:border-[var(--javanese-brown-bg)]/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
