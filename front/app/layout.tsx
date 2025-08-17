import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { fontIBM } from "@/public/fonts/fonts";
import { ClientWrapper } from "./client_wrapper";

export const metadata: Metadata = {
  title: "Eight Podcast",
  description: "Discover and listen to a variety of podcasts on Eight Podcast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          fontIBM.regular.variable,
          fontIBM.semibold.variable,
          fontIBM.bold.variable,
          "antialiased"
        )}
      >
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
