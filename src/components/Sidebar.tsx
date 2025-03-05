import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <ul className="space-y-4">
        <li>
          <Link to="/" className="block p-2 hover:bg-gray-700 rounded">
            Stores
          </Link>
        </li>
        <li>
          <Link to="/skus" className="block p-2 hover:bg-gray-700 rounded">
            SKUs
          </Link>
        </li>
        <li>
          <Link to="/planning" className="block p-2 hover:bg-gray-700 rounded">
            Planning
          </Link>
        </li>
        <li>
          <Link to="/chart" className="block p-2 hover:bg-gray-700 rounded">
            Chart
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
