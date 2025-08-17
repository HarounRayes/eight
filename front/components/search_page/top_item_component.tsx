import React from "react";
import ThreeDotsComponent from "../common/option_component";
import { getColorByIndex, getRandomColor } from "@/dummy/colors";
import { topItemDummyOptions } from "@/dummy/dropdown_options";
import Image from "next/image";

type TopScrollItemProps = {
    image: string;
    title: string;
    label: string;
    colorIndex?: number;
};

const TopItemComponent: React.FC<TopScrollItemProps> = ({
    image,
    title,
    label,
    colorIndex = 0,
}) => (
    <div className="flex flex-col">
        <Image
            src={image}
            alt={title}
            className="w-full h-[220px] mb-3"
            width={500}
            height={220}
        />
        <div className="flex justify-between items-start">
            <div className="">
                <div className="ibm-semibold text-[14px] line-clamp-1 text-ellipsis">{title}</div>
                <div style={{color: getColorByIndex(colorIndex)}} className="text-[#888] text-[12px] line-clamp-1 text-ellipsis">{label}</div>
            </div>
            <ThreeDotsComponent color="#6f7078" size={19} padding={0} options={topItemDummyOptions} />
        </div>
    </div>
);

export default TopItemComponent;