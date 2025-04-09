'use client';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      <span className="font-bold text-lg">Admin Panel</span>
      <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
        Выйти
      </button>
    </nav>
  );
}
