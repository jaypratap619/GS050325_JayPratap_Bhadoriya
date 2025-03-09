// src/components/Navbar.tsx
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Gsynergy Logo V2 Long Description.svg";
import { FaUser, FaBars } from "react-icons/fa";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [user, setUser] = useState(auth.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe(); // Cleanup subscription
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login screen after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-white shadow-xl p-4 w-full flex justify-between border-b border-gray-300">
      <div className="flex items-center">
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
        <FaUser className="text-gray-800 mr-2" /> {/* FaUser icon added back */}
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;