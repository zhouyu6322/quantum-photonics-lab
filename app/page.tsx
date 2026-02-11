import Link from 'next/link';
import Image from 'next/image';
import { getTeamMembers, getNews, getPublications } from '@/lib/notion';
import TeamMemberCard from '@/components/TeamMemberCard';
import NewsCard from '@/components/NewsCard';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [teamMembers, news, recentPublications] = await Promise.all([
    getTeamMembers('Active').catch(() => []),
    getNews(3).catch(() => []),
    getPublications(undefined, 5).catch(() => []),
  ]);

  const pi = teamMembers.filter(m => m.role === 'PI');

  return (
    <div className="min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Left: text */}
            <div className="flex-1 max-w-2xl">
              <p className="text-blue-300 text-sm font-semibold tracking-widest uppercase mb-4">
                Harbin Institute of Technology, Shenzhen
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Quantum Photonics Lab
              </h1>
              <p className="text-xl text-blue-200 mb-6">量子光子学课题组</p>
              <p className="text-base md:text-lg text-slate-300 mb-8 leading-relaxed">
                We develop <span className="text-white font-medium">integrated silicon carbide photonic quantum chips</span> and
                <span className="text-white font-medium"> color center-based quantum sensing</span> technologies,
                pushing the boundaries of scalable quantum information systems.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-8 mb-10 text-center">
                {[
                  { value: '16+', label: 'Publications' },
                  { value: '4×', label: 'Nature Comms' },
                  { value: 'PRL', label: 'Phys. Rev. Lett.' },
                  { value: 'LPR', label: 'Laser & Photonics Rev.' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-blue-300">{stat.value}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/research"
                  className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Our Research
                </Link>
                <Link
                  href="/publications"
                  className="border border-slate-500 hover:border-blue-400 text-slate-200 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Publications
                </Link>
              </div>
            </div>

            {/* Right: cover art */}
            <div className="flex-shrink-0 w-full lg:w-[480px] xl:w-[540px]">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/50">
                <Image
                  src="/images/cover-art-sic-ring.jpg"
                  alt="Integrated SiC photonic quantum chip — microring resonator with color center"
                  width={540}
                  height={540}
                  className="w-full object-cover"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-xs text-white/80">
                    SiC microring resonator with evanescently coupled color center · <span className="italic">Laser &amp; Photonics Reviews</span> 2025
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Research Directions ───────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            Research Directions
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            Two interconnected pillars: on-chip quantum photonics and defect-based sensing
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Direction 1 */}
            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="8" strokeWidth="1.5"/>
                  <path strokeLinecap="round" strokeWidth="1.5" d="M12 4C8 4 4 8 4 12M12 4c4 0 8 4 8 8"/>
                  <circle cx="12" cy="12" r="2" fill="currentColor" strokeWidth="0"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Integrated SiC Photonic Quantum Chips
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                We design and fabricate integrated silicon carbide (SiC) photonic devices — microring resonators,
                waveguides, and grating couplers — that deterministically couple to single color center emitters.
                Key achievements include near-unity nuclear spin polarization in waveguides and scalable
                entangled photon pair generation on chip.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['Microring Resonator', 'Grating Coupler', 'Photon Entanglement', 'Spin–Photon Interface'].map(t => (
                  <span key={t} className="text-xs bg-white text-blue-700 border border-blue-200 px-2 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </div>

            {/* Direction 2 */}
            <div className="rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Color Center-Based Quantum Sensing
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                We exploit the exceptional spin coherence properties of SiC and diamond color centers for
                precision sensing. Using strain engineering, we have demonstrated room-temperature spin
                readout contrast exceeding 60% in SiC membranes — a record for solid-state quantum sensors.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['Strain Engineering', 'Spin Readout', 'Thermometry', 'Room-Temperature Sensing'].map(t => (
                  <span key={t} className="text-xs bg-white text-purple-700 border border-purple-200 px-2 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/research" className="inline-block text-blue-600 hover:text-blue-800 font-semibold">
              Explore Research in Detail →
            </Link>
          </div>
        </div>
      </section>

      {/* ── PI Preview ────────────────────────────────────────── */}
      {pi.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Principal Investigator
            </h2>
            <div className="max-w-md mx-auto">
              <TeamMemberCard member={pi[0]} />
            </div>
            <div className="text-center mt-10">
              <Link href="/team" className="inline-block text-blue-600 hover:text-blue-800 font-semibold">
                View Full Team →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Recent Publications ───────────────────────────────── */}
      {recentPublications.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Recent Publications
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {recentPublications.slice(0, 3).map((pub) => (
                <div
                  key={pub.id}
                  className="bg-gray-50 rounded-lg p-5 hover:bg-gray-100 transition-colors border border-gray-100"
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-block flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded border bg-blue-50 text-blue-700 border-blue-200 mt-0.5">
                      {pub.journal}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1 leading-snug">
                        {pub.title}
                      </h3>
                      <p className="text-sm text-gray-500">{pub.authors}</p>
                    </div>
                    {pub.doi && (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto flex-shrink-0 text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        DOI →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/publications" className="inline-block text-blue-600 hover:text-blue-800 font-semibold">
                View All Publications →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Latest News ───────────────────────────────────────── */}
      {news.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Latest News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {news.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/news" className="inline-block text-blue-600 hover:text-blue-800 font-semibold">
                View All News →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Research Group</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            We are looking for motivated PhD students, postdocs, and undergraduate researchers
            passionate about quantum photonics and quantum sensing.
          </p>
          <Link
            href="/about"
            className="inline-block bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>

    </div>
  );
}
