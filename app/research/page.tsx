import Image from 'next/image';
import Link from 'next/link';
import { getResearchAreas } from '@/lib/notion';
import { ResearchArea } from '@/lib/types';
import { T } from '@/components/T';
import { t } from '@/lib/translations';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Research | Quantum Photonics Lab',
  description: 'Integrated SiC photonic quantum chips and color center-based quantum sensing',
};

// Fallback if Notion is unavailable
const FALLBACK: ResearchArea[] = [
  {
    id: '1',
    title: 'Integrated SiC Photonic Quantum Chips',
    description:
      'Silicon carbide (SiC) is an exceptional host for quantum emitters — its color centers possess long spin coherence times at room temperature and emit in the telecom band.\n\n' +
      'We design and fabricate SiC integrated photonic circuits that deterministically couple single color center emitters to guided modes: microring resonators, apodized grating couplers, and on-chip beam splitters.\n\n' +
      'In 2025, we demonstrated near-unity nuclear spin polarization of a single color center evanescently coupled inside an SiC waveguide.',
    order: 1,
    color: 'blue',
    keywords: ['Microring Resonator', 'Grating Coupler', 'On-chip Beam Splitter', 'Photon Entanglement', 'Spin–Photon Interface', 'Purcell Enhancement', 'Telecom Wavelength'],
    metrics: '~100% Nuclear spin polarization | On-chip Entangled photon pairs | Scalable Deterministic coupling',
  },
  {
    id: '2',
    title: 'Color Center-Based Quantum Sensing',
    description:
      'The spin states of color centers are exquisitely sensitive to magnetic fields, strain, and temperature — making them ideal nanoscale sensors.\n\n' +
      'Using strain engineering in SiC thin membranes, we boosted room-temperature spin readout contrast to >60% — far exceeding bulk material values.\n\n' +
      'We also develop all-optical thermometry using SiC color centers, exploiting zero-phonon line temperature dependence.',
    order: 2,
    color: 'purple',
    keywords: ['Strain Engineering', 'Spin Readout Contrast', 'Divacancy', 'NV Center', 'Thermometry', 'Magnetic Field Sensing', 'Room-Temperature Operation'],
    metrics: '>60% Spin readout contrast at RT | Strain Engineered enhancement | All-optical Non-contact thermometry',
  },
];

// Per-direction static images and publication lists (not in Notion, stays in code)
const DIRECTION_META: Record<number, {
  image?: string;
  imageCaption?: string;
  publications: { title: string; journal: string; year: number }[];
}> = {
  1: {
    publications: [
      { title: 'Deterministic and Scalable Coupling of a Single Color Center to a Photonic Integrated Circuit', journal: 'Laser & Photonics Reviews', year: 2025 },
      { title: 'Quantum Register Based on Nuclear Spins in an SiC Quantum Network Node', journal: 'Nature Communications', year: 2024 },
      { title: 'Integrated SiC Beam Splitter', journal: 'Optics Letters', year: 2025 },
    ],
  },
  2: {
    image: '/images/divacancy-sic-structure.jpg',
    imageCaption: 'SiC divacancy (V\u1D04V\u209B\u1D35) color center crystal structure',
    publications: [
      { title: 'Strain-Enhanced Spin Readout Contrast in Silicon Carbide Membranes', journal: 'Physical Review Letters', year: 2025 },
      { title: 'All-Optical Thermometry Based on SiC Color Centers', journal: 'Photonics Research', year: 2024 },
      { title: 'SiC Networks for Tunable Quantum Sensing', journal: 'Applied Physics Reviews', year: 2025 },
    ],
  },
};

const BADGE_STYLES: Record<string, { card: string; metric: string; tag: string; dot: string; link: string }> = {
  blue:   { card: 'bg-blue-50 border-blue-100',     metric: 'bg-blue-50 border-blue-100 text-blue-700',   tag: 'bg-white text-blue-700 border-blue-200',   dot: 'text-blue-400',   link: 'text-blue-600 hover:text-blue-800' },
  purple: { card: 'bg-purple-50 border-purple-100', metric: 'bg-purple-50 border-purple-100 text-purple-700', tag: 'bg-white text-purple-700 border-purple-200', dot: 'text-purple-400', link: 'text-purple-600 hover:text-purple-800' },
};
const DEFAULT_STYLE = BADGE_STYLES.blue;

function parseMetrics(raw: string) {
  return raw.split('|').map(s => {
    const parts = s.trim().split(' ');
    return { value: parts[0], label: parts.slice(1).join(' ') };
  }).filter(m => m.value);
}

export default async function ResearchPage() {
  const areas = (await getResearchAreas().catch(() => []));
  const directions = areas.length > 0 ? areas : FALLBACK;

  return (
    <div className="min-h-screen bg-white">

      {/* Hero banner */}
      <div className="relative h-72 md:h-96 bg-slate-900 overflow-hidden">
        <Image
          src="/images/cover-art-sic-ring.jpg"
          alt="SiC photonic quantum chip"
          fill
          className="object-cover object-center opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">Research</h1>
          <p className="text-blue-200 text-base md:text-lg max-w-xl">
            <T {...t.research.hero_subtitle} />
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-5xl">

        {directions.map((area, idx) => {
          const style = BADGE_STYLES[area.color] ?? DEFAULT_STYLE;
          const meta = DIRECTION_META[area.order] ?? { publications: [] };
          const metrics = parseMetrics(area.metrics);
          const isLast = idx === directions.length - 1;

          return (
            <div key={area.id}>
              <section className="mb-20">
                {/* Section header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${area.color === 'purple' ? 'bg-purple-600' : 'bg-blue-600'}`}>
                    <span className="text-white font-bold text-sm">0{area.order}</span>
                  </div>
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-widest ${area.color === 'purple' ? 'text-purple-500' : 'text-blue-500'}`}>
                      <T {...t.research.direction} /> {String(area.order).padStart(2, '0')}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{area.title}</h2>
                  </div>
                </div>

                {/* Optional image */}
                {meta.image && (
                  <div className="mb-8 flex justify-center">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-xs w-full">
                      <Image
                        src={meta.image}
                        alt={meta.imageCaption ?? area.title}
                        width={320}
                        height={320}
                        className="w-full object-contain"
                      />
                      {meta.imageCaption && (
                        <p className="text-xs text-gray-400 text-center mt-3">{meta.imageCaption}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="md:flex gap-10 items-start">
                  {/* Description */}
                  <div className="flex-1 space-y-4 text-gray-700 leading-relaxed">
                    {area.description.split('\n\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>

                  {/* Metrics */}
                  {metrics.length > 0 && (
                    <div className="mt-8 md:mt-0 md:w-60 flex-shrink-0 space-y-3">
                      {metrics.map((m) => (
                        <div key={m.value} className={`border rounded-xl p-4 ${style.metric}`}>
                          <div className="text-xl font-bold">{m.value}</div>
                          <div className="text-sm text-gray-600 mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Keywords */}
                {area.keywords.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {area.keywords.map(k => (
                      <span key={k} className={`text-xs border px-3 py-1 rounded-full ${style.tag}`}>{k}</span>
                    ))}
                  </div>
                )}

                {/* Publications */}
                {meta.publications.length > 0 && (
                  <div className="mt-8 p-5 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3"><T {...t.research.key_pubs} /></p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {meta.publications.map((p) => (
                        <li key={p.title} className="flex items-start gap-2">
                          <span className={`mt-0.5 ${style.dot}`}>▸</span>
                          <span>{p.title} · <em>{p.journal}</em> {p.year}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/publications" className={`inline-block mt-3 text-xs font-medium ${style.link}`}>
                      <T {...t.research.view_all_pubs} />
                    </Link>
                  </div>
                )}
              </section>

              {!isLast && <div className="border-t border-gray-200 mb-20" />}
            </div>
          );
        })}

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl p-10 text-white text-center">
          <h2 className="text-2xl font-bold mb-3"><T {...t.research.collab_title} /></h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            <T {...t.research.collab_body} />
          </p>
          <Link href="/about" className="inline-block bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            <T {...t.research.get_in_touch} />
          </Link>
        </div>

      </div>
    </div>
  );
}
