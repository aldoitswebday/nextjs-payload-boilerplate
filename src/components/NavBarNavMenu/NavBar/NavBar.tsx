import NavLink from "../NavLink/NavLink";
import TranslateButton from "../TranslateButton/TranslateButton";
import { useTranslations } from "next-intl";
import { links } from "@/constants/global";

const NavBar = () => {
  const routesT = useTranslations("routes");

  return (
    <div className="hidden de:flex justify-center items-center w-max gap-4 bg-white rounded-full px-4 py-2 shadow-sm">
      {links.map((link, index) => (
        <NavLink
          key={index}
          text={routesT(`${link.label}.text`)}
          href={routesT(`${link.label}.href`)}
          className="px-8 py-1.5 rounded-full"
        />
      ))}
      <TranslateButton className="px-8 py-1.5 rounded-full" />
    </div>
  );
};

export default NavBar;
