import Link from 'next/link';
import Image from 'next/image';
import { getTeamMembers, getNews, getPublications } from '@/lib/notion';
import { sortPublications } from '@/lib/journal-rank';
import { T } from '@/components/T';
import { t } from '@/lib/translations';
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
  const sortedPublications = sortPublications(recentPublications);

  return (
    <div className="min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Left: text */}
            <div className="flex-1 max-w-2xl">
              <p className="text-blue-300 text-sm font-semibold tracking-widest uppercase mb-4">
                <T {...t.home.hero_institution} />
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                <T {...t.home.hero_title} />
              </h1>
              <p className="text-xl text-blue-200 mb-6"><T {...t.home.hero_subtitle} /></p>
              <p className="text-base md:text-lg text-slate-300 mb-8 leading-relaxed">
                <T {...t.home.hero_body} />
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-8 mb-10 text-center">
                {[
                  { value: '30+', labelKey: 'stats_pubs' },
                  { value: '4×',  labelKey: 'stats_nc' },
                  { value: 'PRL', labelKey: 'stats_prl' },
                  { value: 'Sci. Adv.', labelKey: 'stats_sa' },
                ].map((stat) => (
                  <div key={stat.labelKey}>
                    <div className="text-2xl font-bold text-blue-300">{stat.value}</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      <T {...(t.home as any)[stat.labelKey]} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/research"
                  className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  <T {...t.home.btn_research} />
                </Link>
                <Link
                  href="/publications"
                  className="border border-slate-500 hover:border-blue-400 text-slate-200 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  <T {...t.home.btn_publications} />
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
                    <T {...t.home.cover_caption} />
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
            <T {...t.home.research_title} />
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            <T {...t.home.research_sub} />
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
                <T {...t.home.dir1_title} />
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                <T {...t.home.dir1_body} />
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
                <T {...t.home.dir2_title} />
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                <T {...t.home.dir2_body} />
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
              <T {...t.home.explore_link} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── PI Preview ────────────────────────────────────────── */}
      {pi.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              <T {...t.home.pi_title} />
            </h2>
            <div className={`mx-auto grid grid-cols-1 gap-6 ${pi.length >= 2 ? 'md:grid-cols-2 max-w-3xl' : 'max-w-md'}`}>
              {pi.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/team" className="inline-block text-blue-600 hover:text-blue-800 font-semibold">
                <T {...t.home.view_team} />
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
              <T {...t.home.recent_pubs} />
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {sortedPublications.slice(0, 3).map((pub) => (
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
                <T {...t.home.view_pubs} />
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
              <T {...t.home.latest_news} />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {news.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/news" className="inline-block text-blue-600 hover:text-blue-800 font-semibold">
                <T {...t.home.view_news} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Join Our Team ─────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-2"><T {...t.join.title} /></h2>
          <p className="text-blue-100 text-sm mb-6"><T {...t.join.subtitle} /></p>
          <div className="space-y-3 text-sm text-blue-100 mb-8">
            <p>• <strong className="text-white"><T {...t.join.postdoc} /></strong> — <T {...t.join.postdoc_d} /></p>
            <p>• <strong className="text-white"><T {...t.join.phd} /></strong> — <T {...t.join.phd_d} /></p>
            <p>• <strong className="text-white"><T {...t.join.ug} /></strong> — <T {...t.join.ug_d} /></p>
          </div>
          <p className="text-blue-100 text-sm mb-6"><T {...t.join.contact} /></p>
          <a
            href="mailto:zhouyu2022@hit.edu.cn"
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            zhouyu2022@hit.edu.cn
          </a>
        </div>
      </section>

    </div>
  );
}
