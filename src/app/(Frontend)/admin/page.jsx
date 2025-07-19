'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Admin() {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [userEmail, setUserEmail] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]')
    setBlogs(storedBlogs)

    const loggedInUser = localStorage.getItem('loggedInUser')
    if (loggedInUser) setUserEmail(loggedInUser)
  }, [])

  useEffect(() => {
    localStorage.setItem('blogs', JSON.stringify(blogs))
  }, [blogs])

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : ''
  }, [isModalOpen])

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    router.push('/login')
  }

  const openCreateModal = () => {
    setTitle('')
    setContent('')
    setEditingId(null)
    setIsModalOpen(true)
  }

  const openEditModal = (id) => {
    const blog = blogs.find((b) => b.id === id)
    if (!blog) return
    setTitle(blog.title)
    setContent(blog.content)
    setEditingId(id)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setTitle('')
    setContent('')
    setEditingId(null)
    setIsModalOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return
    if (editingId === null) {
      const newBlog = { id: Date.now(), title, content }
      setBlogs([newBlog, ...blogs])
    } else {
      setBlogs(blogs.map((b) => (b.id === editingId ? { ...b, title, content } : b)))
    }
    closeModal()
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setBlogs(blogs.filter((b) => b.id !== id))
      if (editingId === id) closeModal()
    }
  }

  const getImageUrl = (id) => {
    const seed = id % 1000
    return `https://picsum.photos/seed/${seed}/600/300`
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-gray-50 via-white to-gray-100 text-gray-800">
      <header className="flex items-center justify-between px-8 py-6 bg-white shadow-md sticky top-0 z-30">
        <h1 className="text-3xl font-bold text-indigo-700 tracking-tight">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold shadow transition focus:outline-none focus:ring-4 focus:ring-red-400"
        >
          Logout
        </button>
      </header>

      <main className="flex-grow w-full max-w-6xl px-6 py-10 mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl font-semibold">Your Blogs</h2>
          <button
            onClick={openCreateModal}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition-all focus:outline-none focus:ring-4 focus:ring-indigo-400"
          >
            + New Blog
          </button>
        </div>

        {blogs.length === 0 ? (
          <p className="text-center text-gray-500 text-xl italic mt-20">No blogs available yet.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2">
            {blogs.map((blog) => (
              <li
                key={blog.id}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition p-0 overflow-hidden flex flex-col"
              >
                <img
                  src={getImageUrl(blog.id)}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-indigo-800 mb-3">{blog.title}</h3>
                  <p className="flex-grow text-gray-600 leading-relaxed">
                    {blog.content.length > 250 ? blog.content.slice(0, 250) + '...' : blog.content}
                  </p>
                  <div className="flex gap-4 justify-end mt-6">
                    <button
                      onClick={() => openEditModal(blog.id)}
                      className="px-4 py-2 text-sm bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-md shadow"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white font-medium rounded-md shadow"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-2xl p-10 w-full max-w-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-indigo-700 mb-6">
              {editingId ? 'Edit Blog' : 'Create Blog'}
            </h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full p-4 mb-4 border border-indigo-300 rounded-lg focus:ring-4 focus:ring-indigo-300 outline-none"
              required
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              placeholder="Content"
              className="w-full p-4 border border-indigo-300 rounded-lg resize-y focus:ring-4 focus:ring-indigo-300 outline-none"
              required
            />
            <div className="mt-6 flex justify-end gap-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg shadow"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow"
              >
                {editingId ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f3f4f6;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6366f1;
          border-radius: 9999px;
        }
      `}</style>
    </div>
  )
}
