export const metadata = {
  title: {
    absolute: "Geekality",
    template: "%s | Geekality",
  },
  description: "My website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "hsl(120 0% 95%)" }}>
        <header
          style={{
            background: "hsl(120 0% 75%)",
            padding: "1rem 1.5rem",
            display: "flex",
          }}
        >
          <div style={{ fontSize: "3rem" }}>Geekality</div>
        </header>
        <main
          style={{
            padding: "1rem 1.5rem",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
