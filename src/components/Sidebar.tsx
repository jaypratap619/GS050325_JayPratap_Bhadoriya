import { Link } from "react-router-dom";
import { FaStore, FaBox, FaChartLine, FaCalendarAlt } from "react-icons/fa";
import logo from "../assets/Gsynergy Logo V2 Long Description.svg"; // Import the logo

interface SidebarProps {
  closeSidebar: () => void; // Add closeSidebar prop
}

const Sidebar: React.FC<SidebarProps> = ({ closeSidebar }) => {
  return (
    <aside className="w-64 bg-white text-gray-800 shadow-md p-4 h-full">
      {/* Logo for mobile devices */}
      <div className="md:hidden mb-4"> {/* Hide on larger screens */}
        <Link to="/" onClick={closeSidebar}>
          <img src={logo} alt="Gsynergy Logo" className="h-8" /> {/* Use the same logo as Navbar */}
        </Link>
      </div>

      <ul className="space-y-4">
        <li>
          <Link
            to="/"
            className="flex items-center p-2 hover:bg-gray-100 rounded transition duration-200"
            onClick={closeSidebar} // Close sidebar on link click
          >
            <FaStore className="mr-2" />
            Stores
          </Link>
        </li>
        <li>
          <Link
            to="/skus"
            className="flex items-center p-2 hover:bg-gray-100 rounded transition duration-200"
            onClick={closeSidebar} // Close sidebar on link click
          >
            <FaBox className="mr-2" />
            SKUs
          </Link>
        </li>
        <li>
          <Link
            to="/planning"
            className="flex items-center p-2 hover:bg-gray-100 rounded transition duration-200"
            onClick={closeSidebar} // Close sidebar on link click
          >
            <FaCalendarAlt className="mr-2" />
            Planning
          </Link>
        </li>
        <li>
          <Link
            to="/chart"
            className="flex items-center p-2 hover:bg-gray-100 rounded transition duration-200"
            onClick={closeSidebar} // Close sidebar on link click
          >
            <FaChartLine className="mr-2" />
            Chart
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;