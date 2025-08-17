import localFont from 'next/font/local';

const fontIbmThin = localFont({
    src: './ibm/thin.otf',
    variable: '--font-ibm-thin'
});

const fontIbmRegular = localFont({
    src: './ibm/regular.otf',
    variable: '--font-ibm-regular'
});

const fontIbmMedium = localFont({
    src: './ibm/medium.otf',
    variable: '--font-ibm-medium'
});

const fontIbmSemibold = localFont({
    src: './ibm/semiBold.otf',
    variable: '--font-ibm-semibold'
});

const fontIbmBold = localFont({
    src: './ibm/bold.otf',
    variable: '--font-ibm-bold'
});

export const fontIBM = { 
    thin: fontIbmThin,
    regular: fontIbmRegular,
    medium: fontIbmMedium,
    semibold: fontIbmSemibold,
    bold: fontIbmBold
};