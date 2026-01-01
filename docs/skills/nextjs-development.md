# Filosofi Yogya - Next.js Development Skill

## Project Context
**Project Name:** filosofi-yogya-mod  
**Purpose:** Cultural heritage website showcasing Yogyakarta's Philosophical Axis (Sumbu Filosofi)  
**Repository:** https://github.com/Z20ben/filosofi-yogya-mod  
**Production URL:** https://filosofi.fredika.web.id  
**Primary Language:** Indonesian (content), English (code)

---

## Tech Stack (DETECTED FROM PROJECT)

### Core Framework
- **Next.js** with App Router (TypeScript)
- **React** (latest version with Server Components)
- **TypeScript** with strict type checking
- **Tailwind CSS** for styling

### Key Dependencies Detected
- `next-intl` or similar for i18n (Indonesian/English support)
- Custom hooks in `/hooks` directory
- React Context API in `/contexts` directory
- Type definitions in `/types` directory

---

## Project Structure (MANDATORY PATTERN)

```
filosofi-yogya-mod/
├── app/                    # Next.js App Router (REQUIRED)
│   ├── [locale]/          # Likely locale-based routing
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── features/         # Feature-specific components
├── config/               # Configuration files
├── contexts/             # React Context providers
├── hooks/                # Custom React hooks
├── i18n/                 # i18n configuration
├── lib/                  # Utility functions
├── messages/             # i18n message files
│   ├── en.json          # English translations
│   └── id.json          # Indonesian translations
├── public/              # Static assets (images, fonts, etc.)
├── types/               # TypeScript type definitions
└── middleware.ts        # Next.js middleware (likely for i18n)
```

### CRITICAL RULES FOR STRUCTURE
- **NEVER** mix API routes with page routes
- **ALWAYS** place reusable components in `/components`
- **ALWAYS** place utility functions in `/lib`
- **REQUIRED:** Type definitions go in `/types` directory
- **i18n:** All user-facing text MUST use i18n system

---

## File Naming Conventions (MANDATORY)

### Components
```typescript
// Filename: PascalCase.tsx
// Component names: PascalCase
// Example: /components/HeroSection.tsx

export default function HeroSection() {
  return <section>...</section>
}
```

### Utilities
```typescript
// Filename: camelCase.ts
// Example: /lib/formatDate.ts

export function formatDate(date: Date): string {
  // implementation
}
```

### Types
```typescript
// Filename: PascalCase.types.ts
// Example: /types/Heritage.types.ts

export interface HeritageData {
  id: string;
  title: string;
  // ...
}
```

### API Routes
```typescript
// Filename: route.ts
// Example: /app/api/heritage/route.ts

export async function GET(request: Request) {
  // implementation
}
```

---

## Component Patterns (DETECTED & ENFORCED)

### Server Components (DEFAULT)
```typescript
// NO 'use client' directive = Server Component
// This is the DEFAULT and PREFERRED approach

interface PageProps {
  params: { locale: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params, searchParams }: PageProps) {
  // Can fetch data directly
  const data = await fetchData();
  
  return (
    <div className="container mx-auto">
      {/* Server-rendered content */}
    </div>
  );
}

// MUST export metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  return {
    title: 'Page Title',
    description: 'Page description',
  }
}
```

### Client Components (ONLY WHEN NEEDED)
```typescript
'use client'; // ONLY add if component needs:
// - useState, useEffect, or other React hooks
// - Event handlers (onClick, onChange, etc.)
// - Browser-only APIs
// - Context consumers

import { useState } from 'react';

interface ComponentProps {
  initialValue: string;
}

export default function InteractiveComponent({ initialValue }: ComponentProps) {
  const [value, setValue] = useState(initialValue);
  
  return (
    <button onClick={() => setValue('new value')}>
      {value}
    </button>
  );
}
```

### Component Structure (MANDATORY ORDER)
```typescript
'use client'; // 1. Directive (if needed)

// 2. Imports - grouped by source
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

import type { ComponentProps } from '@/types/Component.types';
import { formatDate } from '@/lib/utils';

import styles from './Component.module.css'; // if using CSS modules

// 3. Type definitions (if not in separate file)
interface LocalState {
  // ...
}

// 4. Component definition
export default function ComponentName({ prop1, prop2 }: ComponentProps) {
  // 4a. Hooks (in consistent order)
  const t = useTranslations();
  const [state, setState] = useState<LocalState>();
  
  useEffect(() => {
    // side effects
  }, []);
  
  // 4b. Event handlers
  const handleClick = () => {
    setState(/* ... */);
  };
  
  // 4c. Computed values
  const computedValue = state ? transform(state) : null;
  
  // 4d. Render
  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
}
```

---

## Styling Guidelines (TAILWIND CSS)

### MANDATORY RULES
- **ALWAYS** use Tailwind utility classes
- **NEVER** use inline styles (`style={{}}`)
- **NO** custom CSS unless absolutely necessary
- **USE** Tailwind's design system (spacing, colors, etc.)

### Responsive Design Pattern
```typescript
// Mobile-first approach
<div className="
  w-full              // mobile (default)
  md:w-1/2           // tablet
  lg:w-1/3           // desktop
  px-4               // mobile padding
  md:px-6            // tablet padding
  lg:px-8            // desktop padding
">
  Content
</div>
```

### Color Scheme (Cultural Heritage Theme)
```typescript
// Based on Yogyakarta heritage aesthetics
// Primary: Earthy browns, golds
// Secondary: Traditional batik colors

<div className="
  bg-amber-50        // Light background
  text-stone-800     // Dark text
  border-amber-600   // Accent borders
">
```

### Custom Classes (ONLY IN globals.css)
```css
/* Only for reusable patterns NOT covered by Tailwind */
@layer components {
  .heritage-card {
    @apply rounded-lg shadow-md border border-amber-200 p-6;
  }
}
```

---

## Internationalization (i18n) - CRITICAL

### Language Support
- **Indonesian (id):** Primary language for content
- **English (en):** Secondary language

### Usage Pattern (MANDATORY)
```typescript
'use client';

import { useTranslations } from 'next-intl';

export default function Component() {
  const t = useTranslations('namespace');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

### Message File Structure
```json
// messages/id.json
{
  "HomePage": {
    "title": "Sumbu Filosofi Yogyakarta",
    "description": "Menjelajahi makna filosofis kota..."
  },
  "Heritage": {
    "location": "Lokasi",
    "history": "Sejarah"
  }
}

// messages/en.json
{
  "HomePage": {
    "title": "Yogyakarta's Philosophical Axis",
    "description": "Exploring the philosophical meaning..."
  },
  "Heritage": {
    "location": "Location",
    "history": "History"
  }
}
```

### NEVER Hardcode Text
```typescript
// ❌ WRONG
<h1>Sumbu Filosofi Yogyakarta</h1>

// ✅ CORRECT
<h1>{t('HomePage.title')}</h1>
```

---

## TypeScript Guidelines (STRICT MODE)

### MANDATORY RULES
- **TypeScript strict mode ENABLED**
- **NO `any` types** - use `unknown` if type is truly unknown
- **ALL props MUST be typed**
- **ALL API responses MUST be typed**

### Type Definition Pattern
```typescript
// types/Heritage.types.ts

// Export all types/interfaces
export interface HeritageLocation {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  images: string[];
  description: {
    id: string;  // Indonesian
    en: string;  // English
  };
  historicalSignificance: {
    id: string;
    en: string;
  };
}

export interface HeritageResponse {
  success: boolean;
  data: HeritageLocation[];
  error?: string;
}

export type HeritageCategory = 'monument' | 'palace' | 'temple' | 'market';
```

### Function Typing
```typescript
// ALWAYS type function parameters and return values
async function fetchHeritage(id: string): Promise<HeritageLocation | null> {
  try {
    const response = await fetch(`/api/heritage/${id}`);
    const data: HeritageResponse = await response.json();
    return data.success ? data.data[0] : null;
  } catch (error) {
    console.error('Failed to fetch heritage:', error);
    return null;
  }
}
```

---

## API Routes Pattern (CONSISTENT STRUCTURE)

### Response Format (MANDATORY)
```typescript
// ALWAYS return this structure
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Success response
return Response.json({
  success: true,
  data: result
});

// Error response
return Response.json({
  success: false,
  error: 'Error message'
}, { status: 400 });
```

### API Route Template
```typescript
// app/api/heritage/route.ts

import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // 1. Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get('locale') || 'id';
    
    // 2. Validate input
    if (!['id', 'en'].includes(locale)) {
      return Response.json({
        success: false,
        error: 'Invalid locale'
      }, { status: 400 });
    }
    
    // 3. Fetch data
    const data = await fetchHeritageData(locale);
    
    // 4. Return success response
    return Response.json({
      success: true,
      data
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
```

---

## Custom Hooks Pattern

### Location: `/hooks` directory

### Hook Naming: `use[Feature].ts`

```typescript
// hooks/useHeritage.ts

import { useState, useEffect } from 'react';
import type { HeritageLocation } from '@/types/Heritage.types';

interface UseHeritageReturn {
  heritage: HeritageLocation[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useHeritage(locale: string = 'id'): UseHeritageReturn {
  const [heritage, setHeritage] = useState<HeritageLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/heritage?locale=${locale}`);
      const result = await response.json();
      
      if (result.success) {
        setHeritage(result.data);
      } else {
        setError(result.error || 'Failed to fetch data');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [locale]);
  
  return {
    heritage,
    loading,
    error,
    refetch: fetchData
  };
}
```

---

## Context Pattern

### Location: `/contexts` directory

```typescript
// contexts/LocaleContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface LocaleContextType {
  locale: 'id' | 'en';
  setLocale: (locale: 'id' | 'en') => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<'id' | 'en'>('id');
  
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return context;
}
```

---

## SEO & Metadata (MANDATORY FOR ALL PAGES)

### Page Metadata
```typescript
// app/[locale]/about/page.tsx

import { Metadata } from 'next';

export async function generateMetadata({ 
  params 
}: { 
  params: { locale: string } 
}): Promise<Metadata> {
  // Can be dynamic based on locale
  const titles = {
    id: 'Tentang Sumbu Filosofi',
    en: 'About the Philosophical Axis'
  };
  
  return {
    title: titles[params.locale as 'id' | 'en'],
    description: 'Exploring Yogyakarta\'s cultural heritage',
    openGraph: {
      title: titles[params.locale as 'id' | 'en'],
      description: 'Exploring Yogyakarta\'s cultural heritage',
      images: ['/og-image.jpg'],
    },
  };
}
```

---

## Image Optimization (MANDATORY)

### ALWAYS use next/image
```typescript
import Image from 'next/image';

// ✅ CORRECT
<Image
  src="/heritage/keraton.jpg"
  alt="Keraton Yogyakarta"
  width={800}
  height={600}
  className="rounded-lg"
  priority // for above-the-fold images
/>

// ❌ WRONG
<img src="/heritage/keraton.jpg" alt="Keraton" />
```

---

## Environment Variables

### Required Variables (from project context)
```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.filosofi.fredika.web.id
NEXT_PUBLIC_SITE_URL=https://filosofi.fredika.web.id

# Add others as discovered in project
```

### Usage
```typescript
// ALWAYS use NEXT_PUBLIC_ prefix for client-side vars
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

---

## Development Commands (STANDARD)

```bash
# Development
npm run dev              # Start dev server (localhost:3000)

# Build
npm run build           # Production build
npm run start           # Start production server

# Code Quality
npm run lint            # ESLint check
npm run type-check      # TypeScript check (if script exists)

# Local Docker
docker-compose up       # Run with docker-compose
```

---

## Content-Specific Guidelines

### Heritage Data Structure
```typescript
// Cultural heritage content MUST include:
interface HeritageContent {
  // Bilingual titles
  title: {
    id: string;
    en: string;
  };
  
  // Bilingual descriptions
  description: {
    id: string;
    en: string;
  };
  
  // Location data
  location: {
    name: string;
    coordinates: { lat: number; lng: number };
  };
  
  // Images array (ALWAYS optimized)
  images: Array<{
    url: string;
    alt: { id: string; en: string };
    caption?: { id: string; en: string };
  }>;
  
  // Historical context
  history: {
    id: string;
    en: string;
  };
  
  // Cultural significance
  significance: {
    id: string;
    en: string;
  };
}
```

---

## CRITICAL RULES - NEVER VIOLATE

### ❌ FORBIDDEN
1. **NO** inline styles
2. **NO** `any` types in TypeScript
3. **NO** hardcoded text (use i18n)
4. **NO** `<img>` tags (use `<Image>` from next/image)
5. **NO** mixing Server and Client Component patterns incorrectly
6. **NO** committing `.env` files
7. **NO** CSS modules unless absolutely necessary

### ✅ MANDATORY
1. **ALWAYS** type all functions and components
2. **ALWAYS** use Tailwind for styling
3. **ALWAYS** provide bilingual content (id + en)
4. **ALWAYS** optimize images with next/image
5. **ALWAYS** use Server Components by default
6. **ALWAYS** export metadata for SEO
7. **ALWAYS** use consistent API response format
8. **ALWAYS** validate user input
9. **ALWAYS** handle errors gracefully
10. **ALWAYS** follow the established project structure

---

## Testing Checklist

Before considering a feature complete:
- [ ] TypeScript compiles with no errors (`npm run build`)
- [ ] ESLint passes with no warnings (`npm run lint`)
- [ ] Component works in both languages (id & en)
- [ ] Images are optimized (using next/image)
- [ ] Metadata is properly configured
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] Tailwind classes are used (no inline styles)
- [ ] API responses follow standard format
- [ ] Error handling is implemented
- [ ] Accessibility attributes present (alt text, ARIA labels)

---

## Quick Reference

### Import Aliases (from tsconfig.json pattern)
```typescript
import Component from '@/components/Component'     // /components
import { util } from '@/lib/utils'                // /lib
import type { Type } from '@/types/Type.types'    // /types
```

### Common Patterns
```typescript
// Locale-aware page
export default async function Page({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}) {
  // Use locale for fetching
}

// Client component with i18n
'use client';
import { useTranslations } from 'next-intl';
// ...

// API route with validation
export async function POST(request: Request) {
  const body = await request.json();
  // validate, process, return standard format
}
```

---

## Notes
- This skill is derived from the actual project structure at https://github.com/Z20ben/filosofi-yogya-mod
- Patterns are based on detected conventions in the repository
- Follow these guidelines for consistency across the project
- Update this skill as new patterns emerge

**Last Updated:** Based on repository analysis January 2026
