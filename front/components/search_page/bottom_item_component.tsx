import React from "react";
import ThreeDotsComponent from "../common/option_component";
import { getColorByIndex } from "@/dummy/colors";
import { bottomItemDummyOptions } from "@/dummy/dropdown_options";
import Image from "next/image";

type TopScrollItemProps = {
    image: string;
    title: string;
    label: string;
    colorIndex?: number;
};

const BottomItemComponent: React.FC<TopScrollItemProps> = ({
    image,
    title,
    label,
    colorIndex = 0
}) => (
    <>
        <div className="flex gap-3 justify-between items-center w-full p-1.5 cursor-pointer hover:bg-[#00000050]">
            <div className="flex gap-3 items-center">
                <Image
                    src={image}
                    alt={title}
                    className="rounded-sm"
                    width={50}
                    height={50}
                />
                <div className="flex flex-col gap-1">
                    <div className="font-medium text-[14px] line-clamp-1 text-ellipsis">{title}</div>
                    <div style={{color: getColorByIndex(colorIndex)}} className="text-[#888] text-[12px] line-clamp-1 text-ellipsis">{label}</div>
                </div>
            </div>
            <ThreeDotsComponent padding={0} color="#6f7078" size={19} options={bottomItemDummyOptions} />
        </div>
    </>
);

export default BottomItemComponent;