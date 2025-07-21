import { NavLink } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import logo from '../assets/Logo.png';
  
function Navbar() {
  return (
    <header className="bg-gradient-to-r from-purple-500 to-blue-500 text-white ">
      <nav className="flex items-center justify-between px-8">
        <NavLink to="" className="flex items-center">
          <img
            src={logo} 
            alt="Website-Logo"
            className="w-[90px]"
          />
          <h1 className="text-3xl font-bold">Your Personal Diary</h1>
        </NavLink>

        <ul className="flex gap-8">
          <li className="text-accent font-bold  hover:text-white">
            <NavLink className="flex items-center" to="/posts">
              <DotLottieReact
                src="https://lottie.host/28982f4f-26cc-40aa-92fa-1b1d57a34c78/AmokKFs5qg.lottie"
                loop
                autoplay
                style={{ width: 80, height: 80, filter: 'hue-rotate(-140deg) saturate(6) contrast(2)' }}
                
              />
              Create A New Post
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
