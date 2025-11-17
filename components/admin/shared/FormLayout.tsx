'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe } from 'lucide-react';

interface FormLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function FormLayout({ children, title, description, actions }: FormLayoutProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--javanese-brown-text)]">{title}</h2>
          {description && (
            <p className="text-sm text-[var(--javanese-brown-text)]/60 mt-1">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  );
}

interface BilingualTabsProps {
  children: (locale: 'id' | 'en') => React.ReactNode;
  defaultLocale?: 'id' | 'en';
}

export function BilingualTabs({ children, defaultLocale = 'id' }: BilingualTabsProps) {
  return (
    <Tabs defaultValue={defaultLocale} className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="id" className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Bahasa Indonesia
        </TabsTrigger>
        <TabsTrigger value="en" className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          English
        </TabsTrigger>
      </TabsList>
      <TabsContent value="id" className="mt-6 space-y-4">
        {children('id')}
      </TabsContent>
      <TabsContent value="en" className="mt-6 space-y-4">
        {children('en')}
      </TabsContent>
    </Tabs>
  );
}
