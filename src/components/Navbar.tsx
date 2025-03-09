import { Link } from "react-router-dom";
import logo from "../assets/Gsynergy Logo V2 Long Description.svg";
import { FaUser, FaBars } from 'react-icons/fa'; // Add FaBars for hamburger menu

interface NavbarProps {
  toggleSidebar: () => void; // Add toggleSidebar prop
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <nav className="bg-white shadow-xl p-4 w-full flex justify-between border-b border-gray-300">
      <div className="flex items-center">
        {/* Hamburger menu for mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-800 mr-4 focus:outline-none"
        >
          <FaBars className="text-2xl" />
        </button>
        <Link to="/">
          <img src={logo} alt="Gsynergy Logo" className="h-8 md:h-10" />
        </Link>
      </div>
      <div className="text-gray-600 text-xl md:text-3xl font-semibold">Data Viewer</div>
      <div className="flex items-center">
        <FaUser className="text-gray-800 mr-2" />
        <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-300">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;