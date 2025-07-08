import Link from "next/link";
import Image from "next/image";

interface ButtonFooterProps {
  text: string;
  href: string;
  icon?: string;
}

const ButtonFooter = ({ text, href, icon }: ButtonFooterProps) => {
  return (
    <Link
      className="border-2 border-white rounded-4xl py-2 px-6 flex items-center justify-center gap-2"
      href={href}
    >
      {icon && (
        <figure className="w-6 h-6">
          <Image src={icon} alt={`${text} icon`} className="w-6 h-6" />
        </figure>
      )}
      <span className="w-20">{text}</span>
    </Link>
  );
};

export default ButtonFooter;
