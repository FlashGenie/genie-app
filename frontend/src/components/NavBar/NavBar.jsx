import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux';
import ProfileButton from '../ProfileButton/ProfileButton';
import { openLoginModal } from '../../store/modal';
import { useDispatch } from 'react-redux';


function NavBar () {

    const dispatch = useDispatch();

    const handleOpenLoginModal = () => {
      console.log('Login button clicked');
      dispatch(openLoginModal()); // Dispatch the action to open the login modal
    };

    const loggedIn = useSelector(state => !!state.session.user);
  
    const getLinks = () => {
      if (loggedIn) {
        return (
          <ProfileButton/>
        );
      } else {
        return (
          // <div className="links-auth flex items-center space-x-4">
          //   <Link to="/login" className="text-xl hover:text-slate-800 duration-500">Log in</Link>
          //   <Link to="/signup" className="bg-black text-white font-sans duration-500 px-5 hover:bg-slate-800 rounded">
          //     Get Started
          //   </Link>
          // </div>
          <div className="links-auth flex items-center space-x-4">
            {/* Update the onClick handler to open the login modal */}
            <button onClick={handleOpenLoginModal} className="text-xl hover:text-slate-800 duration-500">Log in</button>
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
          <span className="text-3xl font-sans font-bold cursor-pointer">
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