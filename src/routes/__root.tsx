import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { SiteSidebar, MobileTopBar } from "@/components/SiteSidebar";
import { ThemeInitScript } from "@/components/ThemeToggle";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Rakshit - Quant Portfolio" },
      { name: "description", content: "Rakshit Meshram is a quantitative developer turning markets into edge through systematic trading, research, and high-performance infrastructure." },
      { property: "og:title", content: "Rakshit - Quant Portfolio" },
      { property: "og:description", content: "Rakshit Meshram is a quantitative developer turning markets into edge through systematic trading, research, and high-performance infrastructure." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Rakshit - Quant Portfolio" },
      { name: "twitter:description", content: "Rakshit Meshram is a quantitative developer turning markets into edge through systematic trading, research, and high-performance infrastructure." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/cb4e5dd4-1535-4059-b5fc-79aa534ed3af/id-preview-a17bc622--8c094022-f64b-4a43-86bb-9f7d04e9013c.lovable.app-1777372360267.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/cb4e5dd4-1535-4059-b5fc-79aa534ed3af/id-preview-a17bc622--8c094022-f64b-4a43-86bb-9f7d04e9013c.lovable.app-1777372360267.png" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ThemeInitScript />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteSidebar />
      <MobileTopBar />
      <main className="lg:pl-[140px]">
        <Outlet />
      </main>
    </div>
  );
}
