import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("alpha");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    const blog = { title, body, author };
    setTimeout(() => {
      fetch("http://localhost:8000/blogs", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog),
      })
        .then(() => {
          console.log("new blog added");
          setIsPending(false);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }, 500);
  };

  return (
    <div className="create">
      <form onSubmit={handleSubmit}>
        <h2>Add a new blog</h2>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label>Blog body:</label>
        <textarea
          type="text"
          required
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          style={{ minHeight: "20vh" }}
        />
        <label>Blog author:</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="Alpha">Alpha</option>
          <option value="Bravo">Bravo</option>
          <option value="Charlie">Charlie</option>
          <option value="Delta">Delta</option>
          <option value="Echo">Echo</option>
        </select>
        {!isPending && <button type="submit">Add blog</button>}
        {isPending && (
          <button type="submit" disabled>
            Adding...
          </button>
        )}
      </form>
    </div>
  );
};

export default Create;
