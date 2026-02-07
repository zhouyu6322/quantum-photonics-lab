import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quantum Photonics Lab
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              哈尔滨工业大学（深圳）量子光子学课题组
              <br />
              Harbin Institute of Technology, Shenzhen
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/team" className="hover:text-white transition-colors">
                  Team Members
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-white transition-colors">
                  Research Areas
                </Link>
              </li>
              <li>
                <Link href="/publications" className="hover:text-white transition-colors">
                  Publications
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  News & Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <span className="block">哈尔滨工业大学（深圳）</span>
              </li>
              <li>
                <span className="block">深圳市南山区西丽深圳大学城</span>
              </li>
              <li className="mt-4">
                <a
                  href="mailto:contact@example.com"
                  className="hover:text-white transition-colors"
                >
                  contact@example.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-400 text-center">
          <p>
            © {currentYear} Quantum Photonics Lab, HIT Shenzhen. All rights reserved.
          </p>
          <p className="mt-2">
            Powered by{' '}
            <a
              href="https://www.notion.so"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Notion
            </a>
            {' & '}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Vercel
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
