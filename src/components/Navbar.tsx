'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // только после монтирования
  }, []);

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/login')
  }

  if (!isClient) return null; // предотвращает рендер на сервере

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      <span className="font-bold text-lg">Admin Panel</span>
      <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
        Выйти
      </button>
    </nav>
  );
}
