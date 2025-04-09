import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken'

export default async function DashboardPage() {
  const token = (await cookies()).get('token')?.value

  if (!token) redirect('/login')

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!)
    const username = typeof user === 'object' && 'username' in user ? user.username : undefined

    return (
      <div className="p-6">
        <h1 className="text-2xl">Привет, {username}</h1>
      </div>
    )
  } catch {
    redirect('/login')
  }
}
