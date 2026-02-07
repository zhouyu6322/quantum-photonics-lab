export const metadata = {
  title: 'About | Quantum Photonics Lab',
  description: 'About our quantum photonics research group',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn more about our research group and mission
          </p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Introduction */}
          <section className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Quantum Photonics Lab
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                欢迎来到哈尔滨工业大学（深圳）量子光子学课题组。我们是一支专注于量子光学前沿研究的团队，
                致力于探索和发展基于固态量子系统的量子信息技术。
              </p>
              <p>
                Welcome to the Quantum Photonics Lab at Harbin Institute of Technology, Shenzhen.
                We are a research group dedicated to advancing quantum information technologies
                through cutting-edge research in solid-state quantum systems.
              </p>
              <p>
                Our research focuses on color centers in silicon carbide and diamond, solid-state
                quantum defects, and integrated quantum photonics. We aim to understand the
                fundamental physics of these systems and develop practical applications for quantum
                sensing, quantum communication, and quantum computing.
              </p>
            </div>
          </section>

          {/* Research Focus */}
          <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Research Focus
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: '🔬',
                  title: 'Silicon Carbide Color Centers',
                  description: '碳化硅色心量子光学特性研究',
                },
                {
                  icon: '💎',
                  title: 'Diamond NV Centers',
                  description: '金刚石NV色心量子传感',
                },
                {
                  icon: '⚛️',
                  title: 'Quantum Defects',
                  description: '固态量子缺陷系统',
                },
                {
                  icon: '🔆',
                  title: 'Integrated Photonics',
                  description: '集成量子光子学器件',
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Location */}
          <section className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Location</h2>
            <div className="space-y-4 text-gray-700">
              <p className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  <strong>哈尔滨工业大学（深圳）</strong>
                  <br />
                  深圳市南山区西丽深圳大学城
                  <br />
                  Harbin Institute of Technology, Shenzhen
                  <br />
                  Xili, Nanshan District, Shenzhen, Guangdong, China
                </span>
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            <div className="space-y-4">
              <p className="flex items-center gap-3 text-blue-100">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>
                  Email:{' '}
                  <a
                    href="mailto:contact@example.com"
                    className="text-white hover:underline font-medium"
                  >
                    contact@example.com
                  </a>
                </span>
              </p>

              <div className="mt-8 pt-8 border-t border-blue-400">
                <h3 className="font-semibold text-lg mb-4">Join Our Team</h3>
                <p className="text-blue-100 leading-relaxed mb-4">
                  We are always looking for talented and motivated students (PhD, Master, Undergraduate)
                  and postdoctoral researchers to join our team. If you are interested in quantum
                  photonics and solid-state quantum systems, please contact us with your CV and
                  research interests.
                </p>
                <p className="text-blue-100 leading-relaxed">
                  我们诚邀对量子光学研究充满热情的博士生、硕士生、本科生和博士后加入我们的团队。
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
