'use client'


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="overflow-hidden">
        {children}
    </main>
  );
}