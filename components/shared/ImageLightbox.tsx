'use client';

import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageLightboxProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageLightbox({ src, alt, className = '' }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset on close
  const handleClose = () => {
    setIsOpen(false);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Zoom functions
  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 5));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.5, 0.5));
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          handleClose();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
        case '0':
          handleReset();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, scale, position]);

  return (
    <>
      {/* Thumbnail/Preview Image */}
      <div
        className={`cursor-pointer group relative ${className}`}
        onClick={() => setIsOpen(true)}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-white">
            <ZoomIn className="w-8 h-8" />
            <span className="font-medium">Click to enlarge</span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
            onClick={handleClose}
          >
            {/* Control Panel */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="fixed top-4 right-4 flex items-center gap-2 z-[10001]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Zoom Out Button */}
              <button
                onClick={handleZoomOut}
                disabled={scale <= 0.5}
                className="p-3 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:cursor-not-allowed backdrop-blur-lg rounded-lg transition-all text-white border border-white/20"
                title="Zoom Out (-)"
              >
                <ZoomOut className="w-5 h-5" />
              </button>

              {/* Zoom Level Display */}
              <div className="px-4 py-3 bg-white/10 backdrop-blur-lg rounded-lg text-white border border-white/20 min-w-[80px] text-center font-medium">
                {Math.round(scale * 100)}%
              </div>

              {/* Zoom In Button */}
              <button
                onClick={handleZoomIn}
                disabled={scale >= 5}
                className="p-3 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:cursor-not-allowed backdrop-blur-lg rounded-lg transition-all text-white border border-white/20"
                title="Zoom In (+)"
              >
                <ZoomIn className="w-5 h-5" />
              </button>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-lg rounded-lg transition-all text-white border border-white/20"
                title="Reset (0)"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="p-3 bg-red-500/80 hover:bg-red-500 backdrop-blur-lg rounded-lg transition-all text-white border border-red-400/30"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[10001] pointer-events-none"
            >
              <div className="px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full text-white/80 text-sm border border-white/20">
                {scale > 1 ? 'Drag to pan • ' : ''}Scroll to zoom • ESC to close
              </div>
            </motion.div>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
              className="relative max-w-[95vw] max-h-[95vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={src}
                alt={alt}
                className={`max-w-full max-h-[90vh] object-contain select-none ${
                  scale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
                }`}
                style={{
                  transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                  transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={(e) => {
                  e.preventDefault();
                  const delta = e.deltaY > 0 ? -0.1 : 0.1;
                  setScale((prev) => Math.min(Math.max(prev + delta, 0.5), 5));
                }}
                draggable={false}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
