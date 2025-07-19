'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')

  const handleRegister = (e) => {
    e.preventDefault()

    const stored = localStorage.getItem('users')
    const users = stored ? JSON.parse(stored) : []

    const existingUser = users.find(user => user.email === email)
    if (existingUser) {
      alert('User already registered!')
      return
    }

    users.push({ email, password, role })
    localStorage.setItem('users', JSON.stringify(users))

    alert(`Registered successfully as ${role.toUpperCase()}`)
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-center text-green-700 mb-8">
          Create an Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-green-300 rounded-lg px-4 py-3 focus:ring-4 focus:ring-green-300 focus:outline-none text-gray-800"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-green-300 rounded-lg px-4 py-3 focus:ring-4 focus:ring-green-300 focus:outline-none text-gray-800"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Register as</label>
            <select
              className="w-full border border-green-300 rounded-lg px-4 py-3 focus:ring-4 focus:ring-green-300 focus:outline-none text-gray-800"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all focus:outline-none focus:ring-4 focus:ring-green-400"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <button
            className="text-green-600 hover:underline font-medium"
            onClick={() => router.push('/login')}
          >
            Login
          </button>
        </p>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
