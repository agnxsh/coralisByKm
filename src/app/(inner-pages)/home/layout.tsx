'use client';





export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <MinimalNavbar /> */}
      <main>
        {children}
      </main>
    </>
  );
} 