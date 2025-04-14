'use client'

import { AnimatePresence } from "motion/react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="overflow-hidden">
      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
    </main>
  );
}