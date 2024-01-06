import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/app/context/AuthContext";
import { StateProvider } from "@/app/context/StateContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dawood - Community Hub",
  description:
    "Discover a new and immersive way to connect with friends, share interests, and build communities on our cutting-edge Discord clone website. Powered by Next.js, our platform offers a seamless and user-friendly experience, bringing people together in a virtual space like never before.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <StateProvider>{children}</StateProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
