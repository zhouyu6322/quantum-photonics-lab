import Image from 'next/image';
import { NewsItem } from '@/lib/types';

// Local PDF links for news items that only have PDFs (no web URL)
const LOCAL_PDF_LINKS: Record<string, string> = {
  '碳化硅集成光量子纠缠器件领域研究获突破': '/news-pdfs/keji-daily-2025-01-16.pdf',
  'Strain Engineering Enhances Spin Readout in Quantum Technologies': '/news-pdfs/physorg-2025-10-10.pdf',
};

// Local thumbnails for news items
const LOCAL_THUMBS: Record<string, string> = {
  '碳化硅集成光量子纠缠器件领域研究获突破': '/images/news/keji-daily-2025-01-16.jpg',
  'Strain Engineering Enhances Spin Readout in Quantum Technologies': '/images/news/physorg-2025-10-10.jpg',
};

const categoryColors: Record<string, string> = {
  Award: 'bg-yellow-100 text-yellow-800',
  Publication: 'bg-blue-100 text-blue-800',
  Event: 'bg-green-100 text-green-800',
  Recruitment: 'bg-purple-100 text-purple-800',
};

interface NewsCardProps {
  news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
  const formattedDate = new Date(news.date + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const link = news.url || LOCAL_PDF_LINKS[news.title] || '';
  const thumbnail = news.cover || LOCAL_THUMBS[news.title] || '';
  const isExternal = link.startsWith('http');

  const inner = (
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      {/* Thumbnail */}
      {thumbnail ? (
        <div className="relative w-full h-44 bg-gray-100 flex-shrink-0">
          <Image
            src={thumbnail}
            alt={news.title}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={thumbnail.startsWith('http')}
          />
        </div>
      ) : (
        <div className="w-full h-24 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center flex-shrink-0">
          <svg className="w-10 h-10 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 2v6h6M9 13h6M9 17h4" />
          </svg>
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category & Date */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[news.category] ?? 'bg-gray-100 text-gray-700'}`}>
            {news.category}
          </span>
          <time className="text-sm text-gray-400">{formattedDate}</time>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug flex-1">
          {news.title}
        </h3>

        {/* Content preview */}
        {news.content && (
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-3">
            {news.content}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          {news.source && (
            <span className="text-xs text-gray-400">{news.source}</span>
          )}
          {link && (
            <span className="text-xs font-medium text-blue-600 flex items-center gap-1 ml-auto">
              {isExternal ? '阅读全文' : '查看 PDF'}
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </span>
          )}
        </div>
      </div>
    </article>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
        {inner}
      </a>
    );
  }

  return <div className="h-full">{inner}</div>;
}
