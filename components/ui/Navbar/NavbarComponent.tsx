import Navlinks from "./Navlinks";
import ThemeComponent from "../Theme/ThemeComponent";
import { useState } from "react";

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div>
      <header className="flex flex-row justify-between items-center p-4 top-0 left-0 right-0 z-10 shadow-2xl bg-[var(--navbar-bg)]">
        <h1 className="text-3xl italic font-[600] text-yellow-400">Bitcoin</h1>

        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-[var(--text)] focus:outline-none"
          >
            {isMenuOpen ? "✖" : "☰"}
          </button>
        </div>

        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:flex lg:items-center`}
        >
          <Navlinks candlestickChartRef={null} volumeChartRef={null} />
        </nav>

        <ThemeComponent />
      </header>
    </div>
  );
}
