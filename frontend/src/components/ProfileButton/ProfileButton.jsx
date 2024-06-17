import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import * as sessionActions from '../../store/session';

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent the click from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className="relative inline-block">
      <button onClick={toggleMenu} className="flex items-center justify-center w-20 h-12 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none">
        <FaBars size={16} className="mr-2" />
        <FaUserCircle size={24} />
      </button>
      {showMenu && (
        <ul
          className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
          ref={dropdownRef}
        >
          {/* <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <span>Profile</span>
          </li> */} 
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <button
              onClick={logout}
              className="w-full text-left"
            >
              Log Out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
