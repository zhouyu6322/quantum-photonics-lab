import { getPublications } from '@/lib/notion';
import PublicationList from '@/components/PublicationList';

export const revalidate = 3600; // ISR: 每小时重新生成

export const metadata = {
  title: 'Publications | Quantum Photonics Lab',
  description: 'Our research publications and papers',
};

export default async function PublicationsPage() {
  const publications = await getPublications();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Publications
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our research contributions to the field of quantum photonics
          </p>
          {publications.length > 0 && (
            <p className="text-lg text-gray-500 mt-4">
              Total: {publications.length} publications
            </p>
          )}
        </div>

        {/* Publications List */}
        {publications.length > 0 ? (
          <div className="max-w-5xl mx-auto">
            <PublicationList publications={publications} groupByYear={true} />
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📚</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Publications Coming Soon
            </h2>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              Our publication list will be available here once the Notion database is configured.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 max-w-2xl mx-auto text-left">
              <h3 className="font-semibold text-blue-900 mb-2">
                Setting up your Publications Database
              </h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                To populate this page, create a Notion database with the following properties:
                Title, DOI, Journal, Year, Authors, PDF Link, and Category. Then add the database ID
                to your <code className="bg-blue-100 px-2 py-1 rounded">.env.local</code> file.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
