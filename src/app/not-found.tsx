import Link from "next/link";

export default function NotFound() {
  return (
    <main className="desktop-grid flex min-h-dvh items-center justify-center p-6">
      <div className="border-brand-ink bg-card shadow-window w-full max-w-sm border-2">
        <div className="bg-titlebar font-display text-titlebar-foreground flex h-9 items-center px-3 text-sm">
          Not found
        </div>
        <div className="space-y-4 p-5">
          <p className="text-sm">That window does not exist.</p>
          <Link
            href="/"
            className="bg-primary text-primary-foreground shadow-hard inline-flex h-9 items-center px-4 text-sm font-medium hover:brightness-110"
          >
            Back to the desktop
          </Link>
        </div>
      </div>
    </main>
  );
}
