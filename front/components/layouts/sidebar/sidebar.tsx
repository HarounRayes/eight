import React from "react";
import QubeComponent from "./qube_component";
import NavItem from "./nav_item_component";
import { sidebarIcons } from "@/dummy/icons";

interface SidebarProps {
  isMobile: boolean;
  showSidebar: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile, showSidebar, onClose }) => {
  return (
    <>
      {isMobile && showSidebar && (
        <div 
          className="fixed inset-0 bg-[#000000aa] h-full bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      <aside 
        className={`fixed 
          top-0 left-0 bottom-0 w-[225px] h-full z-50 bg-[#141523] 
          border-r-1 border-r-[#50515d80] flex flex-col justify-between
          ${isMobile ? (showSidebar ? 'translate-x-0' : '-translate-x-full') : ''}`}
      >
        <div className="">
          <div className="mb-[25px] ml-[18px] mt-[18px]">
            <QubeComponent />
          </div>

          <nav>
            <NavItem label="Home" href="#" glowColor="#8b5cf6" icon={sidebarIcons[0]} />
            <NavItem label="Discover" href="#" glowColor="#ec4899" icon={sidebarIcons[1]} />
          </nav>

          <div className="">
            <nav>
              <p className="text-xs text-[#a3a3a8] uppercase mt-[20px] ml-4 mb-1 font-bold text-[12px]">Your Stuff</p>
              <NavItem label="My Queue" href="#" glowColor="#3b82f6" icon={sidebarIcons[2]} />
              <NavItem label="My Podcasts" href="#" glowColor="#2dd4bf" icon={sidebarIcons[3]} />
              <NavItem label="Recents" href="#" glowColor="#fbbf24" icon={sidebarIcons[4]} />
            </nav>
          </div>
        </div>

        <div className="text-xs text-gray-500 mb-6 ml-3">
          Podbay v2.9.6 by Fancy Soups.  
          <br />About · All Podcasts
        </div>
      </aside>
    </>
  );
};

export default Sidebar;