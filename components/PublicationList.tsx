import Image from 'next/image';
import { Publication } from '@/lib/types';

// Local cover image mapping by DOI
const COVER_IMAGES: Record<string, string> = {
  '10.1021/acsphotonics.4c02574': '/images/covers/acs-photonics-2025.jpg',
  '10.1364/PRJ.525971': '/images/covers/photonics-research-2024.jpg',
};

interface PublicationListProps {
  publications: Publication[];
  groupByYear?: boolean;
}

export default function PublicationList({ publications, groupByYear = true }: PublicationListProps) {
  if (publications.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No publications found.
      </div>
    );
  }

  // Group publications by year if needed
  const grouped: Record<number, Publication[]> = groupByYear
    ? publications.reduce((acc, pub) => {
        const year = pub.year || 0;
        if (!acc[year]) acc[year] = [];
        acc[year].push(pub);
        return acc;
      }, {} as Record<number, Publication[]>)
    : { 0: publications };

  const years = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="space-y-10">
      {years.map((year) => (
        <div key={year}>
          {groupByYear && year > 0 && (
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
              {year}
            </h2>
          )}

          <div className="space-y-6">
            {(grouped[year] || []).map((pub) => {
              const coverImage = pub.doi ? COVER_IMAGES[pub.doi] : undefined;
              return (
                <div
                  key={pub.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
                >
                  <div className="flex gap-4">
                    {/* Cover image thumbnail */}
                    {coverImage && (
                      <div className="flex-shrink-0 hidden sm:block">
                        <Image
                          src={coverImage}
                          alt={`${pub.journal} cover`}
                          width={72}
                          height={96}
                          className="rounded object-cover shadow-sm border border-gray-200"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      {/* Title */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                        {pub.title}
                      </h3>

                      {/* Authors */}
                      {pub.authors && (
                        <p className="text-sm text-gray-700 mb-2">
                          {pub.authors}
                        </p>
                      )}

                      {/* Journal & Year */}
                      <p className="text-sm text-gray-600 mb-3">
                        <span className="italic">{pub.journal}</span>
                        {pub.year > 0 && <span> ({pub.year})</span>}
                      </p>

                      {/* Categories */}
                      {pub.category && pub.category.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {pub.category.map((cat, catIdx) => (
                            <span
                              key={catIdx}
                              className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Links */}
                      <div className="flex flex-wrap gap-4 mt-4">
                        {pub.doi && (
                          <a
                            href={`https://doi.org/${pub.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                            </svg>
                            DOI
                          </a>
                        )}

                        {pub.pdfLink && (
                          <a
                            href={pub.pdfLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                            </svg>
                            PDF
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
