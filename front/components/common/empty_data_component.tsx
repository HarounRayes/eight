import React from 'react';

interface EmptyDataComponentProps {
    text: string;
    keyword?: string
    className?: string;
}


const EmptyDataComponent: React.FC<EmptyDataComponentProps> = ({ text, keyword, className }) => {
    return (
        <div className={className}>
            <p className="text-sm">{text}
                {keyword && (<span className="font-semibold"> "{keyword}"</span>)}
            </p>
        </div>
    );
};

export default EmptyDataComponent;