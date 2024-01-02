export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body
        style={{
          background: '#111',
          color: '#eee',
          fontFamily: 'monospace',
        }}
      >
        {children}
      </body>
    </html>
  )
}
