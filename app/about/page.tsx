import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About | Quantum Photonics Lab',
  description: 'About our quantum photonics research group at Harbin Institute of Technology, Shenzhen',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero banner ──────────────────────────────────────── */}
      <div className="relative h-48 md:h-64 bg-slate-900 overflow-hidden">
        <Image
          src="/images/cover-art-sic-ring.jpg"
          alt="Quantum Photonics Lab"
          fill
          className="object-cover object-center opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">About Us</h1>
          <p className="text-blue-200 text-sm md:text-base">量子光子学课题组 · 哈尔滨工业大学（深圳）</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl space-y-12">

        {/* ── Lab intro ────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">Quantum Photonics Lab</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              欢迎来到哈尔滨工业大学（深圳）量子光子学课题组。我们专注于
              <strong>集成碳化硅光量子芯片</strong>与<strong>基于色心的量子传感</strong>两大方向，
              致力于将固态量子系统从基础物理推向可扩展的量子信息技术应用。
            </p>
            <p>
              Welcome to the Quantum Photonics Lab at Harbin Institute of Technology, Shenzhen.
              Our research centers on <strong>integrated SiC photonic quantum chips</strong> and
              <strong> color center-based quantum sensing</strong>, bridging fundamental quantum
              optics with scalable device engineering.
            </p>
          </div>
          <div className="mt-6 flex gap-4">
            <Link href="/research" className="text-sm font-medium text-blue-600 hover:text-blue-800">
              Our Research →
            </Link>
            <Link href="/publications" className="text-sm font-medium text-blue-600 hover:text-blue-800">
              Publications →
            </Link>
          </div>
        </section>

        {/* ── PI ───────────────────────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="md:flex">
            {/* Photo */}
            <div className="md:w-56 flex-shrink-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
              <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-white shadow-md">
                <Image
                  src="/images/team/yu-zhou.png"
                  alt="周宇 / Yu Zhou"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="p-8 flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h2 className="text-2xl font-bold text-gray-900">周宇 / Yu Zhou</h2>
                <span className="text-xs font-semibold bg-blue-600 text-white px-3 py-1 rounded-full">
                  Principal Investigator
                </span>
                <span className="text-xs font-semibold bg-amber-500 text-white px-3 py-1 rounded-full">
                  国家级青年人才
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-4">
                助理教授 · 哈尔滨工业大学（深圳）理学院
              </p>
              <div className="space-y-2 text-gray-700 text-sm leading-relaxed">
                <p>
                  周宇教授课题组聚焦碳化硅与金刚石色心的量子光学特性，致力于开发集成光量子芯片平台，
                  探索其在量子传感、量子通信与量子计算中的应用。
                </p>
                <p>
                  Prof. Zhou Yu's group focuses on the quantum optical properties of color centers in
                  silicon carbide and diamond, developing integrated photonic quantum chip platforms
                  for applications in quantum sensing, quantum communication, and quantum computation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Research focus ───────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Research Focus</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                cardCls: 'bg-blue-50 border-blue-100',
                textCls: 'text-blue-600',
                title: 'Integrated SiC Photonic Quantum Chips',
                zh: '集成碳化硅光量子芯片',
                desc: 'Microring resonators, grating couplers, and on-chip beam splitters deterministically coupled to single color center emitters.',
              },
              {
                cardCls: 'bg-purple-50 border-purple-100',
                textCls: 'text-purple-600',
                title: 'Color Center-Based Quantum Sensing',
                zh: '基于色心的量子传感',
                desc: 'Strain-engineered spin readout contrast exceeding 60% at room temperature; all-optical thermometry in SiC.',
              },
              {
                cardCls: 'bg-teal-50 border-teal-100',
                textCls: 'text-teal-600',
                title: 'Spin–Photon Interfaces',
                zh: '自旋-光子接口',
                desc: 'Near-unity nuclear spin polarization in SiC waveguides; scalable quantum network nodes.',
              },
              {
                cardCls: 'bg-indigo-50 border-indigo-100',
                textCls: 'text-indigo-600',
                title: 'Diamond NV / SiV Centers',
                zh: '金刚石色心',
                desc: 'Optical spectral dynamics of diamond color centers; SiV coherent control for quantum registers.',
              },
            ].map((item) => (
              <div key={item.title} className={`rounded-xl p-6 border ${item.cardCls}`}>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className={`text-xs ${item.textCls} mb-3`}>{item.zh}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Location ─────────────────────────────────────────── */}
        <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-5">Location</h2>
          <div className="flex items-start gap-4 text-gray-700">
            <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <div className="space-y-0.5">
              <p className="font-semibold">哈尔滨工业大学（深圳）理学院</p>
              <p className="text-gray-500">深圳市南山区西丽深圳大学城</p>
              <p className="font-semibold mt-2">School of Science, Harbin Institute of Technology, Shenzhen</p>
              <p className="text-gray-500">Xili University Town, Nanshan District, Shenzhen, Guangdong, China</p>
            </div>
          </div>
        </section>

        {/* ── Contact / Join ────────────────────────────────────── */}
        <section className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl p-8 md:p-10 text-white">
          <h2 className="text-2xl font-bold mb-2">Join Our Team</h2>
          <p className="text-blue-100 text-sm mb-6">
            We welcome motivated researchers at all levels.
          </p>
          <div className="space-y-3 text-sm text-blue-100 mb-8">
            <p>• <strong className="text-white">博士生 / PhD students</strong> — 量子光子学、固态物理、光子集成方向</p>
            <p>• <strong className="text-white">博士后 / Postdocs</strong> — 实验量子光学、纳米加工、量子信息</p>
            <p>• <strong className="text-white">本科生 / Undergraduates</strong> — 有机会参与前沿科研项目</p>
          </div>
          <p className="text-blue-100 text-sm mb-6">
            请将简历及研究兴趣说明发送至课题组邮箱，或直接联系周宇老师。
            <br />
            Please send your CV and a brief statement of research interests to the group email.
          </p>
          <a
            href="mailto:zhouyu@hit.edu.cn"
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            zhouyu@hit.edu.cn
          </a>
        </section>

      </div>
    </div>
  );
}
