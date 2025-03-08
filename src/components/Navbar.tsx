import { Link } from "react-router-dom";
import logo from "../assets/Gsynergy Logo V2 Long Description.svg"

const Navbar = () => {
  return (
    <nav className="bg-white shadow-xl p-4 w-full flex justify-between">
      <Link to="/">
        {/* Add the logo image */}
        <img src={logo} alt="Gsynergy Logo" className="h-10" />
      </Link>
      <div className="text-gray-600 text-3xl font-semibold">Data Viewer</div>
      <div>Login</div>
    </nav>
  );
};

export default Navbar;