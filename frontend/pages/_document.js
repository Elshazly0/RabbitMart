import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head />
            <title>Farmers Market</title>
            <link rel="icon" href="https://img.freepik.com/free-vector/hand-drawn-farmers-market-logo_23-2149329270.jpg" />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=Sora&display=swap" rel="stylesheet" />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html >
    )
}