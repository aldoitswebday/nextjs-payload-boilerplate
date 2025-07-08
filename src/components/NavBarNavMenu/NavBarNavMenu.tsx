import HamburgerButton from "./HamburgerButton/HamburgerButton";
import LogoLink from "./LogoLink/LogoLink";
import NavMenu from "./NavMenu/NavMenu";
import NavBar from "./NavBar/NavBar";
import { links } from "@/constants/global";

type NavBarNavMenuProps = {
  className?: string;
};

const NavBarNavMenu: React.FC<NavBarNavMenuProps> = ({ className }) => {
  return (
    <div
      className={`
        z-40 flex justify-center items-center w-full h-20 px-4 bg-background-topbar
        de:z-0 de:h-24 de:px-6 
        ${className}
      `}
    >
      {/* Container */}
      <div className="container-large flex justify-between items-center w-full">
        {/* Logo */}
        <LogoLink className="opacity-0 animate-fade-in" />

        {/* Hamburger button (mobile screens) */}
        <HamburgerButton className="mobile" />

        {/* Nav menu whenever hamburger button is clicked */}
        <NavMenu className="z-30 fixed inset-0" links={links} />

        {/* Nav Bar */}
        <NavBar />
      </div>
    </div>
  );
};

export default NavBarNavMenu;
