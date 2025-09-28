// app/layout.js
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"

export const metadata = {
  title: "BudgetBuddy",
  description: "Smart budgeting app",
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}