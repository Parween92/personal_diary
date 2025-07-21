import { useEffect, useState } from "react";
import { getAllPosts } from "../components/AllRequest";
import PostForm from "./PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [Posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchAllPosts = async () => {
    try {
      setLoading(true);
      const response = await getAllPosts();
      setPosts(response.data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllPosts();
  }, []);

  // Callback handleSuccess an PostForm übergeben:
  // --> um nach erfolgreichem Post neue Posts zu laden & Formular zu schließen
  const handleSuccess = () => {
    setShowForm(false);
    fetchAllPosts();
  };
  // setShowForm(false): Form wird aus dem UI entfernt.

  return (
    <div className="p-8 ">
      {/*Wenn showForm true ist, wird <PostForm /> angezeigt. */}
      {showForm && <PostForm onSuccess={handleSuccess} />}

      {error && <p>{error}</p>}
      {loading ? (
        <p className="text-gray-600 text-center m-10">Loading ...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onDeleteSuccess={fetchAllPosts}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
