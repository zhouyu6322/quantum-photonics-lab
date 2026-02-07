import { getResearchAreas } from '@/lib/notion';
import Image from 'next/image';

export const revalidate = 3600; // ISR: 每小时重新生成

export const metadata = {
  title: 'Research | Quantum Photonics Lab',
  description: 'Our research areas in quantum photonics',
};

export default async function ResearchPage() {
  const researchAreas = await getResearchAreas();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Research Areas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We focus on cutting-edge research in quantum photonics, exploring fundamental physics
            and developing practical quantum technologies
          </p>
        </div>

        {/* Research Areas from Notion */}
        {researchAreas.length > 0 && (
          <div className="space-y-12 max-w-5xl mx-auto">
            {researchAreas.map((area, idx) => (
              <div
                key={area.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="md:flex">
                  {/* Icon/Image */}
                  {area.icon && (
                    <div className="md:w-64 md:flex-shrink-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-8">
                      <div className="relative w-32 h-32">
                        <Image
                          src={area.icon}
                          alt={area.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-8 flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {area.title}
                    </h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {area.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Default Research Areas (if Notion not configured) */}
        {researchAreas.length === 0 && (
          <div className="space-y-12 max-w-5xl mx-auto">
            {[
              {
                title: 'Silicon Carbide Color Centers',
                icon: '🔬',
                description:
                  'We investigate color centers in silicon carbide (SiC) as promising platforms for quantum information processing. SiC color centers offer excellent optical and spin properties at room temperature, making them ideal candidates for quantum sensing, quantum communication, and quantum computing applications.',
              },
              {
                title: 'Diamond NV Centers',
                icon: '💎',
                description:
                  'Our research on nitrogen-vacancy (NV) centers in diamond focuses on their applications in quantum sensing and quantum networks. We develop novel techniques for high-precision magnetic field sensing, temperature sensing, and quantum state manipulation of NV centers.',
              },
              {
                title: 'Solid-State Quantum Defects',
                icon: '⚛️',
                description:
                  'We explore various solid-state quantum defects in different materials as quantum emitters and quantum memories. Our work includes characterization of novel defect systems, understanding their quantum properties, and integrating them into photonic structures for enhanced light-matter interactions.',
              },
              {
                title: 'Integrated Quantum Photonics',
                icon: '🔆',
                description:
                  'We design and develop integrated photonic devices for quantum information processing. This includes on-chip waveguides, resonators, and photonic crystals that interface with quantum emitters to enable scalable quantum technologies.',
              },
            ].map((area, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="md:flex">
                  {/* Icon */}
                  <div className="md:w-64 md:flex-shrink-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-8">
                    <div className="text-8xl">{area.icon}</div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {area.title}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Interested in Our Research?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            We welcome collaborations and are always looking for talented researchers
            to join our team.
          </p>
          <a
            href="/about"
            className="inline-block bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
