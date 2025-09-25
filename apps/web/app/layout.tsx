import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "showletra",
  description: "melhor jogo do mundo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <main className="flex flex-col gap-5 items-center w-full h-screen">
            {children}
        </main>
      </body>
    </html>
  );
}
