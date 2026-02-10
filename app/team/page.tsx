import { getTeamMembers } from '@/lib/notion';
import TeamMemberCard from '@/components/TeamMemberCard';
import { ROLE_ORDER, ROLE_DISPLAY_NAMES, RoleType } from '@/lib/types';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Team | Quantum Photonics Lab',
  description: 'Meet our research team members',
};

export default async function TeamPage() {
  const members = await getTeamMembers('Active');

  // 按角色分组
  const groupedMembers = members.reduce((acc, member) => {
    const role = member.role;
    if (!acc[role]) acc[role] = [];
    acc[role].push(member);
    return acc;
  }, {} as Record<RoleType, typeof members>);

  // 按照 ROLE_ORDER 排序角色
  const sortedRoles = Object.keys(groupedMembers).sort(
    (a, b) => ROLE_ORDER[a as RoleType] - ROLE_ORDER[b as RoleType]
  ) as RoleType[];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the talented researchers driving innovation in quantum photonics
          </p>
        </div>

        {/* Team Members by Role */}
        {sortedRoles.map((role) => {
          const roleMembers = groupedMembers[role];
          const displayName = ROLE_DISPLAY_NAMES[role];
          const isPi = role === 'PI';
          const gridCols = isPi ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-3 lg:grid-cols-4';

          return (
            <section key={role} className="mb-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-3 border-b-2 border-blue-600">
                {displayName}
              </h2>
              <div className={`grid grid-cols-1 ${gridCols} gap-8`}>
                {roleMembers.map((member) => (
                  <TeamMemberCard
                    key={member.id}
                    member={member}
                    variant={isPi ? 'default' : 'compact'}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {/* Empty State */}
        {members.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">👥</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Team Members Coming Soon
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Our team information will be available here once the Notion database is configured.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
