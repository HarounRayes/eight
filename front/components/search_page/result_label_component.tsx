import React from 'react';

interface ResultLabelComponentProps {
    text: string;
    label?: string;
}

const ResultLabelComponent: React.FC<ResultLabelComponentProps> = ({ text, label }) => {
    return (
        <p className="text-sm text-white">
            <span className="ibm-semibold">{text}</span> 
            {label && <span className="ibm-thin">"{label}"</span>}
        </p>
    );
};

export default ResultLabelComponent;