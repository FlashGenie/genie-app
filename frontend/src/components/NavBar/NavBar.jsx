import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';


function NavBar () {
    const loggedIn = useSelector(state => !!state.session.user);
    const dispatch = useDispatch();
    
    const logoutUser = e => {
        e.preventDefault();
        dispatch(logout());
    };
  
    const getLinks = () => {
      if (loggedIn) {
        return (
          <div className="links-nav flex items-center space-x-4">
            <Link to="/profile" className="text-xl hover:text-slate-800 duration-500">Profile</Link>
            <button onClick={logoutUser} className="text-xl hover:text-slate-800 duration-500">Logout</button>
          </div>
        );
      } else {
        return (
          <div className="links-auth flex items-center space-x-4">
            <Link to="/login" className="text-xl hover:text-slate-800 duration-500">Log in</Link>
            <Link to="/signup" className="bg-black text-white font-sans duration-500 px-5 hover:bg-slate-800 rounded">
              Get Started
            </Link>
          </div>
        );
      }
    };
  
    return (
      <nav className="p-4 bg-white shadow md:flex md:items-center md:justify-between">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-sans font-bold cursor-pointer">
            Genie.
          </span>
        </div>

        <div className="flex-1 flex justify-center">
          <ul className="md:flex md:items-center space-x-8">
            <li className="mx-4 my-6 md:my-0">
              <a href="#" className="text-xl hover:text-slate-800 duration-500">Home</a>
            </li>
            <li className="mx-4 my-6 md:my-0">
              <a href="#" className="text-xl hover:text-slate-800 duration-500">Product</a>
            </li>
            <li className="mx-4 my-6 md:my-0">
              <a href="#" className="text-xl hover:text-slate-800 duration-500">About Us</a>
            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-4">
          {getLinks()}
        </div>

      </nav>
    );
  }
  
  export default NavBar;
  