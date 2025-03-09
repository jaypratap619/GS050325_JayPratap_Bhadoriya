import { Link } from "react-router-dom";
import logo from "../assets/Gsynergy Logo V2 Long Description.svg"
import { FaUser } from 'react-icons/fa';
const Navbar = () => {
  return (
    <nav className="bg-white shadow-xl p-4 w-full flex justify-between border-b border-gray-300">
      <Link to="/">
        {/* Add the logo image */}
        <img src={logo} alt="Gsynergy Logo" className="h-10" />
      </Link>
      <div className="text-gray-600 text-3xl font-semibold">Data Viewer</div>
      <div className="flex items-center">
      {/* User icon outside the button */}
      <FaUser className="text-gray-800 mr-2" /> {/* Dark color for the icon */}
      
      {/* Login button */}
      <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-300">
        Login
      </button>
    </div>
    </nav>
  );
};

export default Navbar;