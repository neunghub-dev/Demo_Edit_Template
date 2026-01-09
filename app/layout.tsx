import "./globals.css";

export const metadata = {
  title: "Stay Builder",
  description: "Drag & Drop Page Builder (Next.js + TS)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="bg-neutral-50 text-neutral-900">{children}</body>
    </html>
  );
}
