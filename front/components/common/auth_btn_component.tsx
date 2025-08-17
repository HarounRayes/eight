import React from "react";

const AuthButton: React.FC<{ label: string; onClick?: () => void }> = ({ label, onClick }) => (
    <button
        type="button"
        className="rounded-md bg-[#456C91] py-[5px] px-[12px] cursor-pointer text-sm font-medium text-white hover:bg-[#6089b3] text-[12px]"
        onClick={onClick}
    >
        <span>{label}</span>
    </button>
);

export default AuthButton;