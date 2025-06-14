import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2, ArrowLeftCircle } from "lucide-react";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/posts/${id}`
        );
        setPost(res.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-blue-500">
        <Loader2 size={32} className="animate-spin" />
        <span className="ml-3 text-lg font-medium">Loading post...</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center mt-20 text-gray-500">
        <p className="text-2xl font-semibold">🚫 Post Not Found</p>
        <p className="text-sm mt-2">
          The post you're looking for may have been deleted.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-8 sm:p-12">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline hover:text-blue-700 mb-6"
        >
          <ArrowLeftCircle size={20} />
          Back to Dashboard
        </button>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

        <p className="text-sm text-gray-400 italic mb-6">
          Published on: {new Date(post.date).toLocaleString()}
        </p>

        <div className="prose prose-lg text-gray-800 max-w-none whitespace-pre-line">
          {post.content}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
