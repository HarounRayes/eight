import React from 'react';

interface NavItemProps {
  label: string;
  href: string;
  icon: React.ReactNode;
  glowColor?: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, href, icon, glowColor = "#8b5cf6", onClick }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group flex items-center py-[10px] px-[20px] rounded transition-colors gap-3 
        text-white hover:text-gray-300`}
    >
      <span className="relative flex items-center justify-center">
        <span
          className="absolute w-[90px] h-[10%] opacity-0 group-hover:opacity-100 blur-sm transition duration-300"
          style={{ backgroundColor: glowColor }}
        ></span>
        <span className="relative z-10">{icon}</span>
      </span>
      <span className="text-[13px] ibm-semibold">{label}</span>
    </a>
  );
};

export default NavItem;
