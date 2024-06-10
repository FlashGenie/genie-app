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
          <div className="links-nav">
            <Link to={'/profile'}>Profile</Link>
            <button onClick={logoutUser}>Logout</button>
          </div>
        );
      } else {
        return (
          <div className="links-auth">
            <Link to={'/signup'}>Signup</Link>
            <Link to={'/login'}>Login</Link>
          </div>
        );
      }
    };
  
    return (
      <nav className="p-5 bg-white shadow md:flex md:items-center md:justify-between">
        <div>
          <span className="text-2xl font-sans font-bold cursor-pointer">
            Genie.
          </span>
        </div>

        <ul className="md:flex md:items-center">
          <li className="mx-4">
            <a href="#" className="text-xl hover:text-slate-800 duration-500">Home</a>
          </li>
          <li className="mx-4">
            <a href="#" className="text-xl hover:text-slate-800 duration-500">Product</a>
          </li>
          <li className="mx-4">
            <a href="#" className="text-xl hover:text-slate-800 duration-500">About Us</a>
          </li>

          <button className="bg-black text-white font-sans duratio-500 px-5 mx-4">
            Get Started
          </button>
        </ul>

      </nav>
    );
  }
  
  export default NavBar;
  