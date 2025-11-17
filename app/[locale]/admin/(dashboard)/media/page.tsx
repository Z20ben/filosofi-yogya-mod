'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Upload, Search, Image as ImageIcon, Trash2, Info, Calendar, HardDrive, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockMediaData, MediaFile } from '@/lib/admin/mock-data/media';
import { formatDate } from '@/lib/admin/utils/slug';

export default function MediaPage() {
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const filteredMedia = mockMediaData.filter((media) =>
    media.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
    media.alt_text?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[var(--javanese-brown-text)]">
            {locale === 'id' ? 'Pustaka Media' : 'Media Library'}
          </h2>
          <p className="text-sm text-[var(--javanese-brown-text)]/60 mt-1">
            {locale === 'id' ? 'Kelola file media dan aset digital' : 'Manage media files and digital assets'}
          </p>
        </div>
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-gradient-to-r from-[var(--javanese-brown-bg)] to-[var(--javanese-terracotta)] text-white">
              <Upload className="w-4 h-4 mr-2" />
              {locale === 'id' ? 'Upload Media' : 'Upload Media'}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{locale === 'id' ? 'Upload File Media' : 'Upload Media File'}</DialogTitle>
            </DialogHeader>
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-[var(--javanese-brown-bg)] transition-colors cursor-pointer">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm font-medium text-[var(--javanese-brown-text)] mb-1">
                {locale === 'id' ? 'Klik untuk upload atau drag & drop' : 'Click to upload or drag & drop'}
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, WEBP {locale === 'id' ? 'hingga' : 'up to'} 10MB
              </p>
            </div>
            <p className="text-xs text-center text-muted-foreground mt-4">
              {locale === 'id' ? '🔨 Fitur upload akan terintegrasi dengan backend' : '🔨 Upload feature will be integrated with backend'}
            </p>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--javanese-brown-text)]">{mockMediaData.length}</p>
              <p className="text-xs text-muted-foreground">{locale === 'id' ? 'Total File' : 'Total Files'}</p>
            </div>
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <HardDrive className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--javanese-brown-text)]">
                {(mockMediaData.reduce((sum, m) => sum + m.size, 0) / 1048576).toFixed(1)} MB
              </p>
              <p className="text-xs text-muted-foreground">{locale === 'id' ? 'Total Ukuran' : 'Total Size'}</p>
            </div>
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[var(--javanese-brown-text)]">{new Set(mockMediaData.map((m) => m.uploaded_at.toDateString())).size}</p>
              <p className="text-xs text-muted-foreground">{locale === 'id' ? 'Hari Upload' : 'Upload Days'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder={locale === 'id' ? 'Cari file media...' : 'Search media files...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredMedia.map((media) => (
          <div
            key={media.id}
            className="group relative aspect-square bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setSelectedMedia(media)}
          >
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-muted-foreground" />
            </div>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
              <Eye className="w-6 h-6 text-white" />
              <p className="text-xs text-white text-center line-clamp-2">{media.filename}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Media Details Dialog */}
      {selectedMedia && (
        <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{locale === 'id' ? 'Detail Media' : 'Media Details'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-24 h-24 text-muted-foreground" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">{locale === 'id' ? 'Nama File' : 'Filename'}</p>
                  <p className="font-medium text-[var(--javanese-brown-text)]">{selectedMedia.filename}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">{locale === 'id' ? 'Ukuran' : 'Size'}</p>
                  <p className="font-medium text-[var(--javanese-brown-text)]">{formatFileSize(selectedMedia.size)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">{locale === 'id' ? 'Dimensi' : 'Dimensions'}</p>
                  <p className="font-medium text-[var(--javanese-brown-text)]">
                    {selectedMedia.dimensions ? `${selectedMedia.dimensions.width} x ${selectedMedia.dimensions.height}` : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">{locale === 'id' ? 'Tanggal Upload' : 'Upload Date'}</p>
                  <p className="font-medium text-[var(--javanese-brown-text)]">{formatDate(selectedMedia.uploaded_at)}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground mb-1">{locale === 'id' ? 'Digunakan di' : 'Used in'}</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedMedia.used_in.map((usage) => (
                      <span key={usage} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded">
                        {usage}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Info className="w-4 h-4 mr-2" />
                  {locale === 'id' ? 'Edit Info' : 'Edit Info'}
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  {locale === 'id' ? 'Hapus' : 'Delete'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
