import localFont from "next/font/local";

export const chakraPetch = localFont({
    src: [
        {
            path: "./fonts/chakra-petch/chakra-petch-v13-latin-regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "./fonts/chakra-petch/chakra-petch-v13-latin-500.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "./fonts/chakra-petch/chakra-petch-v13-latin-600.woff2",
            weight: "600",
            style: "normal",
        },
        {
            path: "./fonts/chakra-petch/chakra-petch-v13-latin-700.woff2",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-chakra-petch",
    display: "swap",
});

export const jetBrains = localFont({
    src: [
        {
            path: "./fonts/jetbrains-mono/jetbrains-mono-v24-latin-regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "./fonts/jetbrains-mono/jetbrains-mono-v24-latin-500.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "./fonts/jetbrains-mono/jetbrains-mono-v24-latin-600.woff2",
            weight: "600",
            style: "normal",
        },
        {
            path: "./fonts/jetbrains-mono/jetbrains-mono-v24-latin-700.woff2",
            weight: "700",
            style: "normal",
        },
        {
            path: "./fonts/jetbrains-mono/jetbrains-mono-v24-latin-800.woff2",
            weight: "800",
            style: "normal",
        },
    ],
    variable: "--font-jetbrains-mono",
    display: "swap",
});