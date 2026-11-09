import type { Metadata } from "next";
import PreloaderGate from "@/components/preloader/PreloaderGate";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Natural Wunderz", template: "%s | Natural Wunderz" },
  description:
    "Natural Wunderz is a beauty and personal-care manufacturer and brand builder, bringing products from concept to shelf.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <PreloaderGate>{children}</PreloaderGate>
      </body>
    </html>
  );
}
