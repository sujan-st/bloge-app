'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import './register.css'

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
    <div className="register-container">
      <div className="register-card">
        <h2>Create Your Account</h2>

        <form onSubmit={handleRegister} className="register-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Register as</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        <p className="login-link">
          Already have an account?{' '}
          <span onClick={() => router.push('/login')}>Login</span>
        </p>
      </div>
    </div>
  )
}
