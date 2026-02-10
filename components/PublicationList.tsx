import Image from 'next/image';
import { Publication } from '@/lib/types';

// Journal cover images (priority over PDF thumbnails)
const COVER_IMAGES: Record<string, string> = {
  '10.1021/acsphotonics.4c02574': '/images/covers/acs-photonics-2025.jpg',
  '10.1364/PRJ.525971':           '/images/covers/photonics-research-2024.jpg',
};

// PDF first-page thumbnails by DOI
const PDF_THUMBS: Record<string, string> = {
  '10.1002/lpor.202502377':         '/images/papers/lpr-2025-bullseye.jpg',
  '10.1021/acsphotonics.4c02574':   '/images/papers/acsp-2025-tunable-cavity.jpg',
  '10.1063/5.0247215':              '/images/papers/apr-2025-sic-networks.jpg',
  '10.1038/s41467-024-54625-3':     '/images/papers/natcomm-2024-quantum-register.jpg',
  '10.1364/PRJ.525971':             '/images/papers/pr-2024-thermometry.jpg',
  '10.1103/tdb3-tqfv':             '/images/papers/prl-2025-strain.jpg',
  '10.1364/OL.567850':              '/images/papers/ol-2025-beamsplitter.jpg',
  '10.1364/OL.522770':              '/images/papers/ol-2024-siv-enhancement.jpg',
  '10.1021/acsphotonics.2c01658':   '/images/papers/acsp-2023-perovskite.jpg',
  '10.1038/s41467-021-26205-y':     '/images/papers/natcomm-2021-parametric-reset.jpg',
  '10.1002/adom.202000495':         '/images/papers/aom-2020-spectral-jumps.jpg',
  '10.1038/s41467-018-06605-3':     '/images/papers/natcomm-2018-sic-spe.jpg',
  '10.1126/sciadv.aar3580':         '/images/papers/sciadv-2018-telecom.jpg',
  '10.1038/ncomms14451':            '/images/papers/natcomm-2017-siv-coherent.jpg',
};

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
            {(grouped[year] || []).map((pub) => {
              const doi = pub.doi || '';
              const thumbnail = COVER_IMAGES[doi] || PDF_THUMBS[doi];

              return (
                <div
                  key={pub.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden"
                >
                  <div className="flex">
                    {/* Thumbnail — always same size for visual consistency */}
                    <div className="flex-shrink-0 w-24 sm:w-28 bg-gray-50 border-r border-gray-100">
                      {thumbnail ? (
                        <div className="relative w-full h-full min-h-[120px]">
                          <Image
                            src={thumbnail}
                            alt={pub.title}
                            fill
                            className="object-cover object-top"
                            sizes="112px"
                          />
                        </div>
                      ) : (
                        <div className="w-full min-h-[120px] flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 p-4">
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
