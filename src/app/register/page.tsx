'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RegisterPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [pass1, setPass1] = useState('')
  const [pass2, setPass2] = useState('')
  const [error, setError] = useState('')

  const handleRegister = async () => {
    setError('')

    if (!username || !pass1 || !pass2) {
      return setError('Все поля обязательны')
    }

    if (pass1 !== pass2) {
      return setError('Пароли не совпадают')
    }

    if (pass1.length < 6) {
      return setError('Пароль должен содержать минимум 6 символов')
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password: pass1 }),
    })

    if (res.ok) {
      router.push('/dashboard')
    } else {
      const data = await res.json()
      setError(data.message || 'Ошибка регистрации')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Регистрация</h2>
        <input
          type="text"
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={pass1}
          onChange={(e) => setPass1(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Повторите пароль"
          value={pass2}
          onChange={(e) => setPass2(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Зарегистрироваться
        </button>
      </div>
    </div>
  )
}
