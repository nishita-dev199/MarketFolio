export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Dark background layer that covers the entire viewport behind everything */}
      <div className="fixed inset-0 bg-[#0B0914] -z-50 pointer-events-none" />
      {children}
    </>
  );
}
