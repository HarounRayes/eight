import { toggleBtnIcon } from "@/dummy/icons";
import React from "react";

const ToggleBtnComponent: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
    return (
        <button 
            className="p-1 text-gray-400 hover:text-white transition"
            onClick={toggleSidebar}
        >
            {toggleBtnIcon}
        </button>
    );
};

export default ToggleBtnComponent;