import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const BlogDetails = () => {
  const navigate = useNavigate();
  const [enableUpdateSection, setEnableUpdateSection] = useState(false);
  const [updating, setUpdating] = useState(false);
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const {
    data: blog,
    error,
    isPending,
  } = useFetch(`http://localhost:8000/blogs/${id}`);

  const handleDelete = () => {
    fetch(`http://localhost:8000/blogs/${id}`, {
      method: "delete",
    }).then(() => {
      navigate("/");
    });
  };

  const handleUpdate = () => {
    setEnableUpdateSection(true);
    setUpdating(true);
    fetch(`http://localhost:8000/blogs/${id}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title, body: body, author: author }),
    })
      .then(() => {
        setUpdating(false);
        setEnableUpdateSection(false);
      })
      .catch((err) => console.dir(err));

  };

  useEffect(() => {
    if (blog) {
      setAuthor(blog.author);
      setTitle(blog.title);
      setBody(blog.body);
      console.log("use Effect called");
    }
  }, [enableUpdateSection, blog]);

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <>
          {!enableUpdateSection ? (
            <>
              <article>
                <h2>{blog.title}</h2>
                <p>{blog.author}</p>
                <div>{blog.body}</div>
              </article>

              <button onClick={handleDelete}>Delete</button>
              <button onClick={() => setEnableUpdateSection(true)}>Update</button>
            </>
          ) : (
            <div className="update" >
              <form onSubmit={handleUpdate}>
                <label>Blog title:</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <lable>Blog body</lable>
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
                <select
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                >
                  <option value="Alpha">Alpha</option>
                  <option value="Bravo">Bravo</option>
                  <option value="Charlie">Charlie</option>
                  <option value="Delta">Delta</option>
                  <option value="Echo">Echo</option>
                </select>
                {!updating && <button type="submit">Update</button>}
                {updating && <button disabled type="submit">Updating...</button>}
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BlogDetails;
