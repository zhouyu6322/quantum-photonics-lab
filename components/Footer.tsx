import Link from 'next/link';
import { T } from '@/components/T';
import { t } from '@/lib/translations';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quantum Photonics Lab
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              <T en="Harbin Institute of Technology, Shenzhen" zh="哈尔滨工业大学（深圳）" />
              <br />
              <T en="Quantum Photonics Research Group" zh="量子光子学课题组" />
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              <T {...t.footer.quick_links} />
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/team" className="hover:text-white transition-colors"><T {...t.nav.team} /></Link></li>
              <li><Link href="/research" className="hover:text-white transition-colors"><T {...t.nav.research} /></Link></li>
              <li><Link href="/publications" className="hover:text-white transition-colors"><T {...t.nav.publications} /></Link></li>
              <li><Link href="/news" className="hover:text-white transition-colors"><T {...t.nav.news} /></Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              <T {...t.footer.contact} />
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><span className="block"><T en="Harbin Institute of Technology, Shenzhen" zh="哈尔滨工业大学（深圳）" /></span></li>
              <li><span className="block"><T en="Xili University Town, Nanshan District, Shenzhen" zh="深圳市南山区西丽深圳大学城" /></span></li>
              <li className="mt-4">
                <a href="mailto:zhouyu2022@hit.edu.cn" className="hover:text-white transition-colors">
                  zhouyu2022@hit.edu.cn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-400 text-center">
          <p>© {currentYear} Quantum Photonics Lab, HIT Shenzhen. <T {...t.footer.rights} /></p>
        </div>
      </div>
    </footer>
  );
}
