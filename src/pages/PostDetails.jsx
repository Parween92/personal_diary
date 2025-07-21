import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById } from "../components/AllRequest";
import { BiArrowBack } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";


const categoryIcons = {
  Adventure: "🧗‍♂️",
  Relaxation: "🌴",
  Culture: "🏛️",
  Nature: "🌲",
};

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPostById(id);
        setPost(res.data.data);
      } catch (err) {
        console.error("Error loading post:", err);
        setError("Post not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading)
    return <p className="text-gray-600 text-center m-10">Loading Post...</p>;
  if (error) return <p className="text-gray-600 text-center m-10">{error}</p>;
  if (!post) return null;

  return (
    <div className="m-auto my-12 w-3xl">
      <div
        className="text-white p-8 rounded-lg relative flex flex-col justify-between"
        style={{
          background:
            "linear-gradient(to right, rgba(168, 85, 247, 0.7), rgba(59, 130, 246, 0.7))",
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold italic text-text">
              {post.title}
            </h1>
            <button
              onClick={() => navigate(`/posts/${id}/edit`)}
              className="hover:bg-hover flex items-center gap-2 font-bold bg-primary text-white px-4 py-2 rounded"
            >
              <FiEdit size={18} />
              Edit
            </button>
          </div>
          <h2 className="text-xl font-bold text-accent flex items-center gap-2">
            <span>by {post.author}</span>
            <span>
              📋Post is <strong>{post.status}</strong>
            </span>
          </h2>

          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-80 object-cover rounded mb-4"
          />

          <p className="text-lg text-text leading-relaxed">{post.content}</p>

          <p className="text-lg text-accent">
            Category:{" "}
            {post.category ? (
              <>
                {categoryIcons[post.category] || "❓"} {post.category}
              </>
            ) : (
              "No category"
            )}
          </p>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-[var(--secondary)] hover:bg-[var(--primary)] text-white px-4 py-2 rounded font-bold"
          >
            <BiArrowBack size={20} />
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
