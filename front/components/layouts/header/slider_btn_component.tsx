import React from "react";

const SliderBtnComponent: React.FC<{ icon: React.ReactNode; onClick?: () => void }> = ({ icon, onClick }) => {
    return (
        <button className="p-1 text-gray-400 hover:text-white transition" onClick={onClick}>
            {icon}
        </button>
    );
};

export default SliderBtnComponent;