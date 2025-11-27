'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Copy, Check } from 'lucide-react';

// Social Media Icons as SVG Components
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

interface SocialShareProps {
  title: string;
  url?: string;
  className?: string;
  variant?: 'default' | 'compact';
  size?: 'sm' | 'md' | 'lg';
}

export function SocialShare({
  title,
  url,
  className = '',
  variant = 'default',
  size = 'md'
}: SocialShareProps) {
  const locale = useLocale();
  const [isCopied, setIsCopied] = useState(false);

  // Get current URL if not provided
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  // Social Share Functions
  const handleWhatsAppShare = () => {
    const shareText = `${title} - ${shareUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const handleXShare = () => {
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(xUrl, '_blank', 'width=600,height=400');
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=600');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Size classes
  const sizeClasses = {
    sm: 'p-2 w-4 h-4',
    md: 'p-2.5 w-4 h-4 sm:w-5 sm:h-5',
    lg: 'p-3 w-5 h-5 sm:w-6 sm:h-6'
  };

  const iconSize = sizeClasses[size];
  const padding = size === 'sm' ? 'p-2' : size === 'md' ? 'p-2.5' : 'p-3';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* WhatsApp */}
      <button
        onClick={handleWhatsAppShare}
        className={`${padding} rounded-xl bg-green-500 hover:bg-green-600 text-white transition-all hover:scale-110 shadow-md`}
        title="Share on WhatsApp"
        aria-label="Share on WhatsApp"
      >
        <WhatsAppIcon className={iconSize.split(' ').slice(1).join(' ')} />
      </button>

      {/* Facebook */}
      <button
        onClick={handleFacebookShare}
        className={`${padding} rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all hover:scale-110 shadow-md`}
        title="Share on Facebook"
        aria-label="Share on Facebook"
      >
        <FacebookIcon className={iconSize.split(' ').slice(1).join(' ')} />
      </button>

      {/* X (Twitter) */}
      <button
        onClick={handleXShare}
        className={`${padding} rounded-xl bg-black hover:bg-gray-800 text-white transition-all hover:scale-110 shadow-md`}
        title="Share on X"
        aria-label="Share on X"
      >
        <XIcon className={iconSize.split(' ').slice(1).join(' ')} />
      </button>

      {/* LinkedIn */}
      <button
        onClick={handleLinkedInShare}
        className={`${padding} rounded-xl bg-blue-700 hover:bg-blue-800 text-white transition-all hover:scale-110 shadow-md`}
        title="Share on LinkedIn"
        aria-label="Share on LinkedIn"
      >
        <LinkedInIcon className={iconSize.split(' ').slice(1).join(' ')} />
      </button>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className={`${padding} rounded-xl transition-all hover:scale-110 shadow-md ${
          isCopied
            ? 'bg-green-500 text-white'
            : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
        }`}
        title={isCopied ? (locale === 'id' ? 'Tersalin!' : 'Copied!') : (locale === 'id' ? 'Salin Link' : 'Copy Link')}
        aria-label={isCopied ? (locale === 'id' ? 'Tersalin!' : 'Copied!') : (locale === 'id' ? 'Salin Link' : 'Copy Link')}
      >
        {isCopied ? (
          <Check className={iconSize.split(' ').slice(1).join(' ')} />
        ) : (
          <Copy className={iconSize.split(' ').slice(1).join(' ')} />
        )}
      </button>
    </div>
  );
}
