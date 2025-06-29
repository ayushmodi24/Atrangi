import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { NavLink } from 'react-router-dom';
// import SearchIcon from '@mui/icons-material/Search';

export default function Navbar() {
    // const [search, setSearch] = useState(false);
    // const searchBox = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation(); // this helps re-check login when route changes
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // ✅ Check login status whenever route changes or component mounts
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        navigate("/signup");
    };

    // useEffect(() => {
    //     const closeSearch = (e: MouseEvent) => {
    //         if (searchBox.current && !searchBox.current.contains(e.target as Node)) {
    //             setSearch(false);
    //         }
    //     };
    //     document.addEventListener('mousedown', closeSearch);
    //     return () => document.removeEventListener('mousedown', closeSearch);
    // }, []);

    return (
        <div className="bg-red-100 flex items-center justify-between p-2 sticky top-0 z-50">
            {/* Logo */}
            <div className="flex items-center"
                onClick={() => navigate("/")}>
                <img className="h-15 ml-1 sm:ml-5 rounded-full border border-gray-500 w-15" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk3TzOKePIUfhbFKISSLAbxiK_Fl1kKCqg6Q&s" alt="logo" />
                <div
                    className="ml-2 text-2xl cursor-pointer"

                >
                    Atrangi
                </div>
            </div>

            <div className='flex justify-center'>
                {/* <div className='text-xl mr-3 cursor-pointer' onClick={() => navigate("/")}>Home</div>
                <div className='text-xl ml-6 cursor-pointer'>Events</div> */}

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `text-xl transition-all duration-150 ease-in-out cursor-pointer pb-1 font-semibold ${isActive ? "border-b-3 border-blue-600 " : "text-gray-800 hover:text-black"
                        }`
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/Paintings"
                    className={({ isActive }) =>
                        `text-xl ml-6 transition-all duration-150 ease-in-out cursor-pointer pb-1 font-semibold ${isActive ? "border-b-3 border-blue-600 " : "text-gray-800 hover:text-black"
                        }`
                    }
                >
                    Paintings
                </NavLink>
                <NavLink
                    to="/kavya"
                    className={({ isActive }) =>
                        `text-xl ml-6 transition-all duration-150 ease-in-out cursor-pointer pb-1 font-semibold ${isActive ? "border-b-3 border-blue-600 " : "text-gray-800 hover:text-black"
                        }`
                    }
                >
                    Kavya
                </NavLink>

                <NavLink
                    to="/events"
                    className={({ isActive }) =>
                        `text-xl ml-6 transition-all duration-150 ease-in-out cursor-pointer pb-1 font-semibold ${isActive ? "border-b-3 border-blue-600" : "text-gray-800 hover:text-black"
                        }`
                    }
                >
                    Events
                </NavLink>
                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        `text-xl ml-6 transition-all duration-150 ease-in-out cursor-pointer pb-1 font-semibold ${isActive ? "border-b-3 border-blue-600" : "text-gray-800 hover:text-black"
                        }`
                    }
                >
                    Contact Us
                </NavLink>

            </div>

            {/* Search */}
            {/* <div ref={searchBox}>
                {search ? (
                    <input
                        type="text"
                        placeholder="Search..."
                        autoFocus
                        className="border-2 ml-30 bg-white border-gray-500 rounded-3xl px-4 py-1 text-sm"
                    />
                ) : (
                    <div
                        onClick={() => setSearch(true)}
                        className="flex items-center border-2 border-gray-500 rounded-3xl px-4 py-1 cursor-pointer hover:bg-gray-100 ml-30 sm:"
                    >
                        <SearchIcon />
                        <span className="ml-6 text-sm hidden sm:flex ">Search Items</span>
                    </div>
                )}
            </div> */}

            {/* Auth UI */}
            <div className="flex items-center">
                {!isLoggedIn ? (
                    <div className="flex items-center mr-4">
                        <span className="text-sm mr-4 border border-gray-600 cursor-pointer hover:bg-gray-500 hover:text-white rounded-2xl px-3 py-1.5">
                            <button onClick={() => navigate("/signup")}>SignUp</button>
                        </span>
                        <span className="text-sm border border-gray-600 cursor-pointer hover:bg-gray-500 hover:text-white rounded-2xl px-3 py-1.5">
                            <button onClick={() => navigate("/signin")}>SignIn</button>
                        </span>
                    </div>
                ) : (
                    <div className="relative group mr-5 ml-2">
                        <div className="border border-gray-500 rounded-full p-2 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition">
                            <PermIdentityIcon />
                        </div>

                        <div className="absolute right-0.5 mt-2 w-40 bg-white border-2 border-gray-300 rounded-xl shadow-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-10">
                            <ul className="text-sm text-gray-700 bg-neutral-100 m-1">
                                <li className="px-4 py-2 rounded-xl hover:bg-gray-300 cursor-pointer">Profile</li>
                                <li className="px-4 py-2 rounded-xl hover:bg-gray-300 cursor-pointer">Settings</li>
                                <li
                                    className="px-4 py-2 rounded-xl hover:bg-gray-300 cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
