import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold">
        GSynergy
      </Link>
    </nav>
  );
};

export default Navbar;
