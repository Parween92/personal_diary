import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost } from "../components/AllRequest";
import { MdSave } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import Swal from "sweetalert2";

const categoryIcons = {
  Adventure: "🧗‍♂️",
  Relaxation: "🌴",
  Culture: "🏛️",
  Nature: "🌲",
};

export default function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    cover: "",
    content: "",
    category: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPostById(id);
        setPost(res.data.data);
        setFormData({
          title: res.data.data.title,
          author: res.data.data.author,
          cover: res.data.data.cover,
          content: res.data.data.content,
          category: res.data.data.category,
          status: res.data.data.status,
        });
      } catch (err) {
        console.error("Error loading post:", err);
        setError("Post not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.author ||
      !formData.title ||
      !formData.content ||
      !formData.cover ||
      !formData.status
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      await updatePost(id, formData);
      setError(null);
      setSuccess(true);

      setTimeout(() => setSuccess(false), 3000);

      Swal.fire({
        toast: true,
        position: "center",
        icon: "success",
        title: "Post has been updated",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });

      navigate("/");
    } catch (err) {
      console.error("Error updating:", err);
      setError("Update failed.");
    }
  };

  if (loading)
    return <p className="text-gray-600 text-center m-10">Loading Post...</p>;
  if (error && !formData.title)
    return <p className="text-[var(--primary)]">{error}</p>;
  if (!post) return null;

  return (
    <form
      className="m-auto my-12 border-1 border-[var(--primary)] p-6 rounded-lg w-3xl"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-4 text-xl font-bold text-gray-600">Edit post</h2>

      {error && <p className="text-[var(--primary)]">{error}</p>}

      <input
        name="author"
        value={formData.author}
        onChange={handleChange}
        placeholder="Autor*in"
        className="w-full border border-gray-400 text-gray-600 px-3 py-2 rounded"
      />
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Titel"
        required
        className="mt-4 border-gray-400 text-gray-600 w-full border px-3 py-2 rounded"
      />
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Inhalt"
        required
        rows={4}
        className="mt-4 w-full border-gray-400 text-gray-600 border px-3 py-2 rounded"
      />
      <input
        name="cover"
        value={formData.cover}
        onChange={handleChange}
        placeholder="Bild-URL"
        required
        className="mt-4 w-full border text-gray-600 border-gray-400 px-3 py-2 rounded"
      />

      {formData.cover && (
        <div className="mt-4">
          <img
            src={formData.cover}
            alt="Preview"
            className="w-full h-52 text-gray-600 object-cover border border-gray-400 rounded"
          />
        </div>
      )}

      <div className="flex gap-2 items-center mt-5 ">
        <label
          htmlFor="category"
          className="text-gray-600 block font-bold mb-1"
        >
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="text-[var(--primary)] w-full border border-gray-400 px-3 py-2 rounded"
        >
          <option value="">-- Select Category --</option>
          {Object.entries(categoryIcons).map(([cat, icon]) => (
            <option key={cat} value={cat}>
              {icon} {cat}
            </option>
          ))}
        </select>
        <label
          htmlFor="status"
          className="ml-4 block font-bold text-gray-600 mb-1"
        >
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="text-[var(--primary)] w-full border border-gray-400 px-3 py-2 rounded"
        >
          <option value="">-- Select Status --</option>
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-[var(--secondary)] hover:bg-[var(--primary)] text-white px-4 py-2 rounded font-bold"
        >
          <BiArrowBack size={20} />
          Go back
        </button>

        <button
          type="submit"
          className="flex gap-2 font-bold items-center bg-[var(--primary)] px-4 py-2 hover:bg-[var(--secondary)] text-white rounded"
        >
          <MdSave size={20} />
          Save
        </button>
      </div>

      {success && (
        <p className="text-[var(--primary)] text-xl font-semibold mb-2 mt-4">
          Post updated successfully!
        </p>
      )}
    </form>
  );
}
