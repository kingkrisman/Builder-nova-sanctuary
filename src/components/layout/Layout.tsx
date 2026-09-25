import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BackToTop, ScrollProgress } from "@/components/BackToTop";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    // overflow-x: clip (not hidden) stops slide-in reveals from causing sideways scroll
    // without breaking position: sticky for the pinned sections
    <div className="flex min-h-screen flex-col bg-white [overflow-x:clip]">
      <ScrollProgress />
      <Navbar />
      <main className="flex-grow pt-20">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
}
