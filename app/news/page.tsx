import { getNews } from '@/lib/notion';
import NewsCard from '@/components/NewsCard';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'News | Quantum Photonics Lab',
  description: 'Latest news and updates from our lab',
};

export default async function NewsPage() {
  const news = await getNews();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            News & Events
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest happenings in our lab
          </p>
        </div>

        {/* News Grid */}
        {news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {news.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📰</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              News Coming Soon
            </h2>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              Lab news and updates will be displayed here once the Notion database is configured.
            </p>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 max-w-2xl mx-auto text-left">
              <h3 className="font-semibold text-purple-900 mb-2">
                Setting up your News Database
              </h3>
              <p className="text-purple-800 text-sm leading-relaxed">
                Create a Notion database with properties: Title, Date, Content, Cover, and Category
                (Award, Publication, Event, Recruitment). Add the database ID to your{' '}
                <code className="bg-purple-100 px-2 py-1 rounded">.env.local</code> file.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
