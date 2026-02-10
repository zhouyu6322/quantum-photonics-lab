import Link from 'next/link';
import Image from 'next/image';
import { getTeamMembers, getNews, getPublications } from '@/lib/notion';
import TeamMemberCard from '@/components/TeamMemberCard';
import NewsCard from '@/components/NewsCard';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // 获取数据（可能为空，如果 Notion 还未配置）
  const [teamMembers, news, recentPublications] = await Promise.all([
    getTeamMembers('Active').catch(() => []),
    getNews(3).catch(() => []),
    getPublications(undefined, 5).catch(() => []),
  ]);

  const pi = teamMembers.filter(m => m.role === 'PI');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white overflow-hidden">
        {/* 背景装饰 Logo - 右上角 */}
        <div className="absolute right-0 top-0 w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] opacity-10 -mr-20 -mt-20">
          <Image
            src="/images/hit-logo.png"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Quantum Photonics Lab
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-blue-100">
              量子光子学课题组
            </p>
            <p className="text-lg md:text-xl mb-8 text-blue-50 leading-relaxed">
              哈尔滨工业大学（深圳）| Harbin Institute of Technology, Shenzhen
            </p>
            <p className="text-base md:text-lg text-blue-100 mb-10 leading-relaxed max-w-3xl">
              专注于碳化硅色心、金刚石色心、固态量子缺陷等量子光学前沿研究，
              致力于推动量子信息技术的发展与应用。
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/research"
                className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Our Research
              </Link>
              <Link
                href="/team"
                className="bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors border-2 border-blue-600"
              >
                Meet the Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Research Highlights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Research Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: '碳化硅色心',
                description: 'Silicon carbide color centers for quantum applications',
                icon: '🔬',
              },
              {
                title: '金刚石色心',
                description: 'Diamond NV centers and quantum sensing',
                icon: '💎',
              },
              {
                title: '固态量子缺陷',
                description: 'Solid-state quantum defects and quantum networks',
                icon: '⚛️',
              },
            ].map((area, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">{area.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {area.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/research"
              className="inline-block text-blue-600 hover:text-blue-800 font-semibold"
            >
              Explore All Research Areas →
            </Link>
          </div>
        </div>
      </section>

      {/* Team Preview */}
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
              <Link
                href="/team"
                className="inline-block text-blue-600 hover:text-blue-800 font-semibold"
              >
                View Full Team →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Recent Publications */}
      {recentPublications.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Recent Publications
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {recentPublications.slice(0, 3).map((pub) => (
                <div
                  key={pub.id}
                  className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {pub.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {pub.authors}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="italic">{pub.journal}</span> ({pub.year})
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/publications"
                className="inline-block text-blue-600 hover:text-blue-800 font-semibold"
              >
                View All Publications →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Latest News */}
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
              <Link
                href="/news"
                className="inline-block text-blue-600 hover:text-blue-800 font-semibold"
              >
                View All News →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Research Group
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            We are always looking for motivated students and postdocs
            to join our quantum photonics research team.
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
