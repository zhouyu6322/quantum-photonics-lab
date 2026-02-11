import Image from 'next/image';
import { NewsItem } from '@/lib/types';

interface NewsCardProps {
  news: NewsItem;
}

const categoryColors = {
  Award: 'bg-yellow-100 text-yellow-800',
  Publication: 'bg-blue-100 text-blue-800',
  Event: 'bg-green-100 text-green-800',
  Recruitment: 'bg-purple-100 text-purple-800',
};

export default function NewsCard({ news }: NewsCardProps) {
  const formattedDate = new Date(news.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Cover Image */}
      {news.cover && (
        <div className="relative w-full aspect-video bg-gray-100">
          <Image
            src={news.cover}
            alt={news.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Category & Date */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[news.category]}`}>
            {news.category}
          </span>
          <time className="text-sm text-gray-500">
            {formattedDate}
          </time>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
          {news.title}
        </h3>

        {/* Content Preview */}
        {news.content && (
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
            {news.content}
          </p>
        )}

        {/* Source */}
        {news.source && (
          <p className="text-xs text-gray-400 mt-3">
            来源 / Source: {news.source}
          </p>
        )}
      </div>
    </article>
  );
}
