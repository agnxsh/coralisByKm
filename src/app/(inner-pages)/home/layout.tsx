'use client';

import MinimalNavbar from "app/_components/MinimalNavbar";




export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MinimalNavbar />
      <main>
        {children}
      </main>
    </>
  );
} 