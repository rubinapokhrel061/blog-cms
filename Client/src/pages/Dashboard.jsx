import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Plus, Loader2, Inbox } from "lucide-react"; // icon library

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/");
    else fetchPosts();
  }, [token, navigate]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`);
      setPosts(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingPost) {
        const res = await axios.patch(
          `${import.meta.env.VITE_API_URL}/api/posts/${editingPost._id}`,
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        toast.success(res.data.message);
      } else {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/posts`,
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success(res.data.message);
      }
      resetForm();
      fetchPosts();
    } catch (error) {
      toast.error(error.response.data.message || "Error submitting post.");
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setEditingPost(null);
    setShowModal(false);
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setEditingPost(post);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/posts/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchPosts();
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="min-h-screen  p-4 sm:p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col gap-4 sm:flex-row sm:justify-between items-center mb-10 bg-blue-100 px-1 py-4 sm:px-10 rounded">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md font-semibold flex items-center gap-2 shadow"
            >
              <Plus size={18} />
              New Post
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md font-semibold shadow"
            >
              Logout
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <Loader2 className="animate-spin text-blue-500" size={32} />
            <span className="ml-3 text-gray-500 text-lg font-medium">
              Loading posts...
            </span>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
            <Inbox size={64} className="mb-4" />
            <p className="text-xl">No posts found</p>
            <p className="text-sm mt-2">
              Click “New Post” to start creating content.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="border border-gray-200 rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-all"
              >
                <div
                  onClick={() => navigate(`/post/${post._id}`)}
                  className="hover:cursor-pointer"
                >
                  <h3 className="text-xl font-semibold text-gray-900">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 mt-2 whitespace-pre-line  text-ellipsis h-20 truncate">
                    {post.content}
                  </p>
                  <p className="text-gray-400 mt-3 text-sm italic">
                    {new Date(post.date).toLocaleString()}
                  </p>
                </div>

                <div className="mt-4 flex gap-3 ">
                  <button
                    onClick={() => handleEdit(post)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-40 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 w-full max-w-lg rounded-xl shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {editingPost ? "Edit Post" : "Create Post"}
            </h2>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md "
            />
            <textarea
              placeholder="Enter content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md resize-none "
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={resetForm}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold"
              >
                {editingPost ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
