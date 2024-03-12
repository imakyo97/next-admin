import '../globals.css';
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className='bg-white'>
        <head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
        </head>
        <body>{children}</body>
    </html>
  );
}