import { Link } from "react-router-dom";
import logo from "../assets/Gsynergy Logo V2 Long Description.svg"

const Navbar = () => {
  return (
    <nav className="bg-white shadow-xl p-4 w-full">
      <Link to="/">
        {/* Add the logo image */}
        <img src={logo} alt="Gsynergy Logo" className="h-10" />
      </Link>
    </nav>
  );
};

export default Navbar;