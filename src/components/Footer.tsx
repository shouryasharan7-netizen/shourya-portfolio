export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 px-6 max-w-[900px] mx-auto">
      <div className="divider mb-8" />
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[--muted] mono">
        <span>Shourya Sharan — Nagpur, India</span>
        <span>© {year}</span>
      </div>
    </footer>
  );
}
