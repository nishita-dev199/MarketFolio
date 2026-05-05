export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Black background layer that covers the entire viewport behind everything */}
      <div className="fixed inset-0 bg-black -z-50 pointer-events-none" />
      {children}
    </>
  );
}
