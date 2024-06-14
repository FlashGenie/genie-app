import { useState, useEffect } from 'react';
import { IoMdArrowUp } from 'react-icons/io';

const ScrollTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > window.innerHeight / 2) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-black text-white shadow-lg hover:opacity-75 transition-opacity duration-300"
        >
          <IoMdArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default ScrollTopButton;
