import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Research | Quantum Photonics Lab',
  description: 'Integrated SiC photonic quantum chips and color center-based quantum sensing',
};

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero banner ──────────────────────────────────────── */}
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
            On-chip quantum photonics meets color center physics
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-5xl">

        {/* ── Direction 1 ─────────────────────────────────────── */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="8" strokeWidth="1.5"/>
                <path strokeLinecap="round" strokeWidth="1.5" d="M12 4C8 4 4 8 4 12M12 4c4 0 8 4 8 8"/>
                <circle cx="12" cy="12" r="2" fill="currentColor" strokeWidth="0"/>
              </svg>
            </div>
            <div>
              <p className="text-xs text-blue-500 font-semibold uppercase tracking-widest">Direction 01</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Integrated SiC Photonic Quantum Chips
              </h2>
            </div>
          </div>

          <div className="md:flex gap-10 items-start">
            <div className="flex-1 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Silicon carbide (SiC) is an exceptional host for quantum emitters — its color centers (divacancy,
                silicon vacancy) possess long spin coherence times at room temperature and emit in the telecom
                band, making them uniquely suited for on-chip quantum photonic integration.
              </p>
              <p>
                We design and fabricate SiC integrated photonic circuits that deterministically couple single
                color center emitters to guided modes. Our platform includes <strong>microring resonators</strong> for
                Purcell-enhanced emission and entangled photon pair generation, <strong>apodized grating
                couplers</strong> for efficient fiber-chip coupling, and <strong>on-chip beam splitters</strong>
                for all-integrated quantum optical operations.
              </p>
              <p>
                In 2025, we demonstrated near-unity nuclear spin polarization of a single color center evanescently
                coupled inside an SiC waveguide — a key milestone toward scalable spin–photon interfaces.
              </p>
            </div>

            {/* Key results */}
            <div className="mt-8 md:mt-0 md:w-64 flex-shrink-0 space-y-3">
              {[
                { metric: '~100%', desc: 'Nuclear spin polarization in waveguide' },
                { metric: 'On-chip', desc: 'Entangled photon pair generation' },
                { metric: 'Scalable', desc: 'Deterministic color center coupling' },
              ].map((r) => (
                <div key={r.metric} className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <div className="text-xl font-bold text-blue-700">{r.metric}</div>
                  <div className="text-sm text-gray-600 mt-0.5">{r.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {['Microring Resonator', 'Grating Coupler', 'On-chip Beam Splitter', 'Photon Entanglement',
              'Spin–Photon Interface', 'Purcell Enhancement', 'Telecom Wavelength'].map(t => (
              <span key={t} className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full">{t}</span>
            ))}
          </div>

          {/* Related publications */}
          <div className="mt-8 p-5 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Key Publications</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">▸</span>
                <span>Deterministic and Scalable Coupling of a Single Color Center to a Photonic Integrated Circuit · <em>Laser &amp; Photonics Reviews</em> 2025</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">▸</span>
                <span>Quantum Register Based on Nuclear Spins in an SiC Quantum Network Node · <em>Nature Communications</em> 2024</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">▸</span>
                <span>Integrated SiC Beam Splitter · <em>Optics Letters</em> 2025</span>
              </li>
            </ul>
            <Link href="/publications" className="inline-block mt-3 text-xs text-blue-600 hover:text-blue-800 font-medium">
              View all publications →
            </Link>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-20" />

        {/* ── Direction 2 ─────────────────────────────────────── */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <div>
              <p className="text-xs text-purple-500 font-semibold uppercase tracking-widest">Direction 02</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Color Center-Based Quantum Sensing
              </h2>
            </div>
          </div>

          {/* Divacancy structure diagram */}
          <div className="mb-8 flex justify-center">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-xs w-full">
              <Image
                src="/images/divacancy-sic-structure.jpg"
                alt="SiC divacancy (V_C V_Si) color center crystal structure"
                width={320}
                height={320}
                className="w-full object-contain"
              />
              <p className="text-xs text-gray-400 text-center mt-3">
                SiC divacancy (V<sub>C</sub>V<sub>Si</sub>) — the color center at the heart of our sensing platform
              </p>
            </div>
          </div>

          <div className="md:flex gap-10 items-start">
            <div className="flex-1 space-y-4 text-gray-700 leading-relaxed">
              <p>
                The spin states of color centers are exquisitely sensitive to their local environment —
                magnetic fields, electric fields, strain, and temperature — making them ideal nanoscale sensors.
                We develop novel sensing protocols that exploit both SiC and diamond color center systems.
              </p>
              <p>
                A central challenge in solid-state quantum sensing is achieving high spin readout contrast at
                room temperature. We have addressed this through <strong>strain engineering</strong>: by
                deliberately introducing and controlling strain in SiC thin membranes, we modulate the
                radiative and non-radiative transition rates of the divacancy spin states, boosting
                readout contrast to <strong>&gt;60%</strong> — far exceeding bulk material values.
              </p>
              <p>
                We also investigate <strong>all-optical thermometry</strong> using SiC color centers,
                exploiting the temperature dependence of zero-phonon line positions for non-invasive
                local temperature sensing in biological and micro-electromechanical contexts.
              </p>
            </div>

            {/* Key results */}
            <div className="mt-8 md:mt-0 md:w-64 flex-shrink-0 space-y-3">
              {[
                { metric: '>60%', desc: 'Spin readout contrast at room temperature' },
                { metric: 'Strain', desc: 'Engineered enhancement of spin properties' },
                { metric: 'All-optical', desc: 'Non-contact thermometry in SiC' },
              ].map((r) => (
                <div key={r.metric} className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                  <div className="text-xl font-bold text-purple-700">{r.metric}</div>
                  <div className="text-sm text-gray-600 mt-0.5">{r.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {['Strain Engineering', 'Spin Readout Contrast', 'Divacancy', 'NV Center',
              'Thermometry', 'Magnetic Field Sensing', 'Room-Temperature Operation'].map(t => (
              <span key={t} className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1 rounded-full">{t}</span>
            ))}
          </div>

          {/* Related publications */}
          <div className="mt-8 p-5 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Key Publications</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">▸</span>
                <span>Strain-Enhanced Spin Readout Contrast in Silicon Carbide Membranes · <em>Physical Review Letters</em> 2025</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">▸</span>
                <span>All-Optical Thermometry Based on SiC Color Centers · <em>Photonics Research</em> 2024</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-0.5">▸</span>
                <span>SiC Networks for Tunable Quantum Sensing · <em>Applied Physics Reviews</em> 2025</span>
              </li>
            </ul>
            <Link href="/publications" className="inline-block mt-3 text-xs text-purple-600 hover:text-purple-800 font-medium">
              View all publications →
            </Link>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl p-10 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">Interested in Collaborating?</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            We welcome collaborations in quantum photonics, nanofabrication, and spin-based sensing.
          </p>
          <Link
            href="/about"
            className="inline-block bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Get in Touch
          </Link>
        </div>

      </div>
    </div>
  );
}
