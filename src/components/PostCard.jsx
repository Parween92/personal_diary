import { deletePost } from "./AllRequest";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const categoryIcons = {
  Adventure: "🧗‍♂️",
  Relaxation: "🌴",
  Culture: "🏛️",
  Nature: "🌲",
};

function PostCard({ post, onDeleteSuccess }) {
  console.log("Post im Card:", post);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!post?.id) {
      console.warn("No ID ");
      return;
    }

    console.log("🔍 delete Post with ID:", post.id);
    try {
      await deletePost(post.id);
      if (onDeleteSuccess) {
        onDeleteSuccess(post.id);
      }

      Swal.fire({
        toast: true,
        position: "center",
        icon: "success",
        title: "Post was deleted",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const goToDetails = () => navigate(`/posts/${post.id}`);
  const goToEdit = () => navigate(`/posts/${post.id}/edit`);

  return (
    <div
      className="mt-4 text-white p-4 rounded-lg relative flex flex-col justify-between"
      style={{
        background:
          "linear-gradient(to right, rgba(168, 85, 247, 0.7), rgba(59, 130, 246, 0.7))",
      }}
    >
      <div key={post.id} className="flex flex-wrap content-between gap-3">
        <h1 className="w-[70%] text-xl font-medium italic text-text ">
          {post.title}
        </h1>
        <h2 className="text-l font-bold text-accent flex items-center gap-1">
          <span>{post.author},</span>
          <span>
            📋Post is <strong>{post.status}</strong>
          </span>
        </h2>

        <p className=" mb-2 text-sm font-normal text-text ">{post.content}</p>
        <p className="text-sm text-accent">
          Category:{" "}
          {post.category ? (
            <>
              {categoryIcons[post.category] || "❓"} {post.category}
            </>
          ) : (
            "No category"
          )}
        </p>
        <img
          src={post.cover}
          alt={post.title}
          className="text-l font-medium text-text w-full h-40 object-cover rounded mb-3"
        />
      </div>

      <div className="flex gap-8 mt-4 justify-between">
        <button
          onClick={goToDetails}
          className="after:block after:h-[2px] after:w-0 after:bg-accent 
                    after:transition-all after:duration-300 hover:after:w-full
                    hover:text-accent text-text px-3 py-1 rounded"
        >
          See more details ➤
        </button>

        <button
          onClick={handleDelete}
          className="flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--secondary)]
                    text-white px-4 py-2 rounded font-bold"
        >
          <MdDeleteForever size={20} />
          Delete
        </button>
      </div>
      <button
        onClick={goToEdit}
        className="hover:bg-hover flex items-center gap-2 font-bold pointer-events-auto
                  bg-primary text-white px-3 py-1 rounded absolute right-4 "
      >
        <FiEdit />
        Edit
      </button>
    </div>
  );
}
export default PostCard;
