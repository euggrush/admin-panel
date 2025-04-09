import Navbar from '@/components/Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="p-6 bg-gray-50 min-h-screen">{children}</main>
    </>
  );
}
