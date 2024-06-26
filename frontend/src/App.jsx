import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import FileUpload from './components/FileUpload/FileUpload';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';
import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import Footer from './components/Footer/Footer';
import LoginModal from './components/Modal/LoginModal';
import RegisterModal from './components/Modal/RegisterModal';
import GenerateDeckModal from './components/Modal/GenerateDeckModal';
import Dashboard from './components/Dashboard/Dashboard';
import DeckDetail from './components/DeckDetail/DeckDetail';
import Favorites from './components/Favorites/Favorites';
import NewDeck from './components/NewDeck/NewDeck';
import ReviewDeck from './components/DeckDetail/ReviewDeck';
import Explore from './components/Explore/Explore';
import Search from './components/Explore/Search';
import Sidebar from './components/Dashboard/Sidebar';

import { useSelector } from 'react-redux';

import { getCurrentUser } from './store/session';

const Layout = () => {
  const loggedIn = useSelector(state => !!state.session.user);
  const location = useLocation();
  return (
    <>
      <RegisterModal/>
      <LoginModal />
      <GenerateDeckModal />
      <NavBar />
      <div className='flex w-full'>
        {loggedIn && <Sidebar />}
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-grow"
        >
          <Outlet/>
        </motion.div>
      </div>
      {!loggedIn && <Footer />}
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AuthRoute component={MainPage} />
      },
      {
        path: "login",
        element: <AuthRoute component={LoginForm} />
      },
      {
        path: "signup",
        element: <AuthRoute component={SignupForm} />
      },
      {
        path: "dashboard", // Protected route for Dashboard
        element: <ProtectedRoute component={Dashboard} />
      },
      {
        path: "upload",
        element: <ProtectedRoute component={FileUpload} />
      },
      {
        path: "decks/:id", // Add route for deck detail
        element: <ProtectedRoute component={DeckDetail} />
      },
      {
        path: "/decks/:id/review",
        element: <ProtectedRoute component={ReviewDeck} />
      },
      {
        path: "/decks/new",
        element: <ProtectedRoute component={NewDeck} />
      },
      {
        path: "favorites",
        element: <ProtectedRoute component={Favorites} />
      },
      {
        path:"/explore",
        element: <ProtectedRoute component={Explore} />
      }, 
      {
        path:"/search",
        element: <ProtectedRoute component={Search} />
      }
    ]
  }
]);

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).finally(() => setLoaded(true));
  }, [dispatch]);
  
  return loaded && <RouterProvider router={router} />;
}

export default App;
