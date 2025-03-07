import { Link } from "react-router-dom";
import { FaStore, FaBox, FaChartLine, FaCalendarAlt } from "react-icons/fa"; // Import icons

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white text-gray-800 shadow-md p-4">
      <ul className="space-y-4">
        <li>
          <Link
            to="/"
            className="flex items-center p-2 hover:bg-gray-100 rounded transition duration-200"
          >
            <FaStore className="mr-2" /> {/* Store icon */}
            Stores
          </Link>
        </li>
        <li>
          <Link
            to="/skus"
            className="flex items-center p-2 hover:bg-gray-100 rounded transition duration-200"
          >
            <FaBox className="mr-2" /> {/* SKU icon */}
            SKUs
          </Link>
        </li>
        <li>
          <Link
            to="/planning"
            className="flex items-center p-2 hover:bg-gray-100 rounded transition duration-200"
          >
            <FaCalendarAlt className="mr-2" /> {/* Planning icon */}
            Planning
          </Link>
        </li>
        <li>
          <Link
            to="/chart"
            className="flex items-center p-2 hover:bg-gray-100 rounded transition duration-200"
          >
            <FaChartLine className="mr-2" /> {/* Chart icon */}
            Chart
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;