import BlogList from "./BlogList";
import useFetch from "./useFetch";


// Note: we will have to host json server first, to access db.json by command-> json-server --watch data/db.json --port 8000
const Home = () => {
  const {
    data: blogs,
    isPending,
    error,
  } = useFetch("http://localhost:8000/blogs");


  return (
    <div className="home">
      {error && <p>{error}</p>}
      {isPending && <p>Loading..</p>}
      {blogs && <BlogList blogs={blogs} title="All blogs" />}
    </div>
  );
};

export default Home;
