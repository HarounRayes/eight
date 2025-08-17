const colors: string[] = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#F1C40F",
    "#9B59B6",
    "#E67E22",
    "#1ABC9C",
    "#E74C3C",
    "#2ECC71"
];

export function getRandomColor(): string {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

export function getColorByIndex(index: number): string | undefined {
    return colors[index % colors.length];
}

export { colors };