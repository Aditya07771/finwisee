// app/layout.js
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export const metadata = {
  title: "FinWise",
  description: "Smart budgeting app",
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
