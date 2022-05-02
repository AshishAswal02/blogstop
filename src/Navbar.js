import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h1 onClick={() => navigate('/')}>Blogstop</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
      </div> 
    </nav>
  );
};

export default Navbar;
