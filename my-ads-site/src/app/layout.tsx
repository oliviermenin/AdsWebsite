import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LeBonCoin',
  description: 'Trouvez les meilleures annonces près de chez vous',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-100">
          {children}
        </div>
      </body>
    </html>
  )
}

