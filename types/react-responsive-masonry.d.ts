declare module 'react-responsive-masonry' {
  import { ReactNode } from 'react';

  export interface MasonryProps {
    columnsCount?: number;
    gutter?: string;
    responsive?: { [key: number]: number };
    children?: ReactNode;
  }

  export interface ResponsiveMasonryProps {
    columnsCountBreakPoints?: { [key: number]: number };
    children?: ReactNode;
  }

  export default function Masonry(props: MasonryProps): JSX.Element;
  export function ResponsiveMasonry(props: ResponsiveMasonryProps): JSX.Element;
}
