import { useState } from "react";
import { createPost } from "../components/AllRequest";
import { MdSave } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function PostForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    author: "",
    title: "",
    content: "",
    cover: "",
    status: "",
    category: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const categoryIcons = {
    Adventure: "🧗‍♂️",
    Relaxation: "🌴",
    Culture: "🏛️",
    Nature: "🌲",
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
      const response = await createPost(formData);
      // Falls response.data alle Felder enthält:
      setFormData((prev) => ({ ...prev, ...response.data }));

      setError(null);
      setSuccess(true);
      if (onSuccess) onSuccess();

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error creating:", error);
      setError("Creation failed.");
    }
    Swal.fire({
      toast: true,
      position: "center",
      icon: "success",
      title: "your Form has been submitten",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    });
  };

  return (
    <form className="m-auto my-12 w-3xl" onSubmit={handleSubmit}>
      <h2 className="mb-4 text-xl font-bold text-gray-600">Create new post</h2>

      {error && <p className="text-[var(--primary)]">{error}</p>}

      <input
        name="author"
        value={formData.author}
        onChange={handleChange}
        placeholder="Autor*in"
        className="w-full border border-gray-400 px-3 py-2 rounded"
      />
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Titel"
        required
        className="mt-4 border-gray-400 w-full border px-3 py-2 rounded"
      />
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Inhalt"
        required
        rows={4}
        className="mt-4 w-full border-gray-400 border px-3 py-2 rounded"
      />
      <input
        name="cover"
        value={formData.cover}
        onChange={handleChange}
        placeholder="Bild-URL"
        required
        className="mt-4 w-full border border-gray-400 px-3 py-2 rounded"
      />
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
          className="ml-4 block font-bold text-gray-600  mb-1"
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
      <button
        onClick={() => navigate(-1)}
        type="submit"
        className="flex gap-2 font-bold items-center bg-[var(--primary)] hover:bg-[var(--secondary)] mt-8 mb-5 px-4 py-2 text-white rounded"
      >
        {" "}
        <MdSave size={20} />
        Save
      </button>
      {success && (
        <p className="text-accent text-xl font-semibold mb-2">
          Post saved successfully!
        </p>
      )}
    </form>
  );
}
