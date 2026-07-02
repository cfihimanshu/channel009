import { BossSidebar } from '@/components/BossSidebar';

export default function BossLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[100] bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
      <BossSidebar />
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
