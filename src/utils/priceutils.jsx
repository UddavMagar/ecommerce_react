export function USDTONRP(price) {
    const USD_TO_NRP = 132.5;
    return `Rs ${(price * USD_TO_NRP).toFixed(0)}`;
}