'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuLinkProps {
  module: string;
  href?: string;
  children?: MenuLinkProps[];
}

const MenuLink: React.FC<MenuLinkProps> = ({ module, href, children }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Handle toggle for expandable sections
  const toggleOpen = () => setIsOpen(!isOpen);

  if(!children){
    return  <Link
    href={href ?? "#"}
    className={`block text-sm py-[9px] px-3 text-primary-black ${pathname === href ? 'bg-secondary-color font-bold text-white' : 'hover:text-white font-bold'}`}
  >
    {module}
  </Link>
  }


  return (
    <div className="relative">
      <div
        className={`px-3 justify-between py-[9px] cursor-pointer flex items-center ${children ? '' : 'hover:bg-gray-800 text-white'}`}
        onClick={children ? toggleOpen : undefined} // Only allow toggle if there are children
      >
        <span className={`block text-sm text-primary-black ${pathname === href ? 'bg-secondary-color font-bold text-white' : 'hover:text-white font-bold'}`}>{module}</span>
        {children && (
          <span>{isOpen ? '▲' : '▼'}</span>
        )}
      </div>
      {children && isOpen && (
        <div className="pl-6">
          {children.map((child) => (
            <MenuLink key={child.module} {...child} />
          ))}
        </div>
      )}
      {!children && href && (
        <Link
          href={href}
          className={`block text-sm py-[9px] px-2 text-primary-black ${pathname === href ? 'text-white bg-secondary-color font-bold' : 'hover:text-white font-bold'}`}
        >
          {module}
        </Link>
      )}
    </div>
  );
};

export default MenuLink;
