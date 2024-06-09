import "./globals.css";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Provider from "@/components/common/Provider";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: "400",
  display: "swap",
});
export const metadata = {
  title: "Nyntax",
  description: "A vehicle rental service",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          poppins.className
        )}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
