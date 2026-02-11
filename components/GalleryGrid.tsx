'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface GalleryItem {
  src: string;
  caption: string;
}

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<number | null>(null);

  // 键盘关闭 / 左右切换
  useEffect(() => {
    if (active === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowRight') setActive((i) => (i! + 1) % items.length);
      if (e.key === 'ArrowLeft')  setActive((i) => (i! - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [active, items.length]);

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <button
            key={item.src}
            onClick={() => setActive(idx)}
            className="group relative rounded-xl overflow-hidden shadow-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <div className="relative w-full aspect-[4/3] bg-gray-100">
              <Image
                src={item.src}
                alt={item.caption}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
              <p className="text-white text-xs leading-snug">{item.caption}</p>
            </div>
            {/* 放大图标 */}
            <div className="absolute top-2 right-2 bg-black/40 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setActive(null)}
        >
          {/* 关闭 */}
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
            onClick={() => setActive(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 上一张 */}
          <button
            className="absolute left-4 text-white/70 hover:text-white p-2"
            onClick={(e) => { e.stopPropagation(); setActive((active - 1 + items.length) % items.length); }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* 图片 */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={items[active].src}
              alt={items[active].caption}
              width={1400}
              height={900}
              className="object-contain w-full max-h-[80vh] rounded-lg"
              priority
            />
            <p className="text-center text-white/80 text-sm mt-3">{items[active].caption}</p>
            <p className="text-center text-white/40 text-xs mt-1">{active + 1} / {items.length}</p>
          </div>

          {/* 下一张 */}
          <button
            className="absolute right-4 text-white/70 hover:text-white p-2"
            onClick={(e) => { e.stopPropagation(); setActive((active + 1) % items.length); }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
