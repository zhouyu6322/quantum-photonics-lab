import { Publication } from '@/lib/types';
import { journalRank } from '@/lib/journal-rank';

const JOURNAL_BADGE = 'bg-blue-50 text-blue-700 border-blue-200';

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

  const grouped: Record<number, Publication[]> = groupByYear
    ? publications.reduce((acc, pub) => {
        const year = pub.year || 0;
        if (!acc[year]) acc[year] = [];
        acc[year].push(pub);
        return acc;
      }, {} as Record<number, Publication[]>)
    : { 0: publications };

  // 每年内按期刊排名排序
  for (const year of Object.keys(grouped)) {
    grouped[Number(year)].sort((a, b) => journalRank(a.journal) - journalRank(b.journal));
  }

  const years = Object.keys(grouped).map(Number).sort((a, b) => b - a);

  return (
    <div className="space-y-10">
      {years.map((year) => (
        <div key={year}>
          {groupByYear && year > 0 && (
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
              {year}
            </h2>
          )}

          <div className="space-y-4">
            {(grouped[year] || []).map((pub) => (
              <div
                key={pub.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 p-5"
              >
                {/* Journal badge */}
                <div className="mb-2">
                  <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded border ${JOURNAL_BADGE}`}>
                    {pub.journal}{pub.year > 0 ? ` (${pub.year})` : ''}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-gray-900 mb-1.5 leading-snug">
                  {pub.title}
                </h3>

                {/* Authors */}
                {pub.authors && (
                  <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                    {pub.authors}
                  </p>
                )}

                {/* Categories + Links row */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  {pub.category && pub.category.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {pub.category.map((cat, catIdx) => (
                        <span
                          key={catIdx}
                          className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3 ml-auto">
                    {pub.doi && (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                      >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
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
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                        </svg>
                        PDF
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
