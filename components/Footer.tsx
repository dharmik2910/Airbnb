export default function Footer() {
  return (
    <footer className="mt-12 border-t border-border bg-gray-50 py-8">
      <div className="mx-auto flex max-w-[1760px] flex-col gap-4 px-6 text-sm text-foggy lg:flex-row lg:items-center lg:justify-between lg:px-20">
        <p>© 2026 Airbnb Clone, Inc. · Built for a take-home assessment</p>
        <div className="flex gap-6">
          <a href="#" className="hover-underline">Privacy</a>
          <a href="#" className="hover-underline">Terms</a>
          <a href="#" className="hover-underline">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
