import Image from 'next/image';
import { TeamMember } from '@/lib/types';

interface TeamMemberCardProps {
  member: TeamMember;
  variant?: 'default' | 'compact';
}

export default function TeamMemberCard({ member, variant = 'default' }: TeamMemberCardProps) {
  const isCompact = variant === 'compact';

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Photo */}
      <div className="relative aspect-square bg-gray-100">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            className="object-cover object-top"
            sizes={isCompact ? '(max-width: 768px) 50vw, 25vw' : '(max-width: 768px) 100vw, 33vw'}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
            <span className="text-4xl font-bold text-gray-400">
              {member.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {member.name}
        </h3>

        <p className="text-sm text-blue-600 font-medium mb-2">
          {member.role}
        </p>

        {!isCompact && (
          <>
            {member.joinYear > 0 && (
              <p className="text-sm text-gray-600 mb-1">
                Joined {member.joinYear}
              </p>
            )}

            {member.institution && (
              <p className="text-xs text-gray-500 mb-2">
                {member.institution}
              </p>
            )}

            {member.researchFocus && member.researchFocus.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {member.researchFocus.slice(0, 3).map((focus, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                  >
                    {focus}
                  </span>
                ))}
              </div>
            )}
          </>
        )}

        {/* Contact & Links */}
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="text-gray-600 hover:text-blue-600 transition-colors"
              title="Email"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </a>
          )}

          {member.homepage && (
            <a
              href={member.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              title="Homepage"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
            </a>
          )}

          {member.googleScholar && (
            <a
              href={member.googleScholar}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              title="Google Scholar"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 24a7 7 0 110-14 7 7 0 010 14zm0-24L0 9.5l4.838 3.94A8 8 0 0112 9a8 8 0 017.162 4.44L24 9.5z"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
