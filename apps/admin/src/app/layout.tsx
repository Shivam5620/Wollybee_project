import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StoreProvider from "./StoreProvider";
import { Toaster } from "../../components/ui/sonner";
import Provider from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "wollybee admin",
  description: "Admin webapp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <StoreProvider>
    <html lang="en">
      <Provider>
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />
        </body>
        </Provider>
    </html>
    </StoreProvider>
  );
}
