'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function User() {
  const [blogs, setBlogs] = useState([])
  const [userEmail, setUserEmail] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const storedBlogs = localStorage.getItem('blogs')
    if (storedBlogs) setBlogs(JSON.parse(storedBlogs))

    const loggedInUser = localStorage.getItem('loggedInUser')
    if (loggedInUser) setUserEmail(loggedInUser)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white font-sans text-gray-900 flex flex-col">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-600">MyBlogApp</h1>
          <div className="hidden sm:flex space-x-6 items-center text-gray-700 text-base">
            <a href="#" className="hover:text-blue-600 transition">Home</a>
            <a href="#" className="hover:text-blue-600 transition">Write</a>
            <a href="#" className="hover:text-blue-600 transition">Profile</a>
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-10 flex flex-col flex-grow">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-700 mb-10">Blogs</h2>

        {blogs.length === 0 ? (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-lg text-gray-500 italic">No blogs available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
              >
                <div className="h-40 w-full">
                  <img
                    src="https://www.shutterstock.com/image-photo/bloggingblog-concepts-ideas-white-worktable-260nw-1029506242.jpg"
                    alt="Blog thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 truncate">{blog.title}</h3>
                  <p className="text-gray-600 mt-2 text-sm leading-relaxed flex-grow line-clamp-4 whitespace-pre-wrap">
                    {blog.content}
                  </p>
                  <button
                    onClick={() => alert(`Open blog: ${blog.title}`)}
                    className="mt-4 self-start px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
