//path: app/layout.js

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { SidebarGroupAction } from "@/components/ui/sidebar";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FinWise",
  description: "One stop Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo-sm.png" sizes="any" />
        </head>
        <body className={`${inter.className} antialiased`}>
          {/* Layout for unauthenticated users */}
          <SignedOut>
            <Header />
            <main className="min-h-screen pt-20">
              {children}
            </main>
            <footer className="bg-blue-50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-600">
                <p>Made with 💗 by RoadsideCoder</p>
              </div>
            </footer>
          </SignedOut>

          {/* Layout for authenticated users with sidebar */}
          <SignedIn>
            <SidebarProvider defaultOpen={true}>
              <div className="flex min-h-screen w-full">
                <SidebarGroupAction />
                <div className="flex flex-1 flex-col overflow-hidden">
                  <Header />
                  <main className="flex-1 overflow-auto bg-muted/30">
                    <div className="container mx-auto p-6">
                      {children}
                    </div>
                  </main>
                </div>
              </div>
            </SidebarProvider>
          </SignedIn>

          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}

// import { Inter } from "next/font/google";
// import "./globals.css";
// import Header from "@/components/Header";
// import AppSidebar from "@/components/AppSidebar";
// import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import { Toaster } from "sonner";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "FinWise",
//   description: "One stop Finance Platform",
// };

// export default function RootLayout({ children }) {
//   return (
//     <ClerkProvider>
//       <html lang="en">
//         <head>
//           <link rel="icon" href="/logo-sm.png" sizes="any" />
//         </head>
//         <body className={`${inter.className} antialiased`}>
//           {/* Layout for unauthenticated users */}
//           <SignedOut>
//             <Header />
//             <main className="min-h-screen pt-20">
//               {children}
//             </main>
//             <footer className="bg-blue-50 py-12">
//               <div className="container mx-auto px-4 text-center text-gray-600">
//                 <p>Made with 💗 by RoadsideCoder</p>
//               </div>
//             </footer>
//           </SignedOut>

//           {/* Layout for authenticated users with sidebar */}
//           <SignedIn>
//             <SidebarProvider defaultOpen={true}>
//               <div className="flex min-h-screen w-full">
//                 <AppSidebar />
//                 <div className="flex flex-1 flex-col overflow-hidden">
//                   <Header />
//                   <main className="flex-1 overflow-auto bg-muted/30">
//                     {children}
//                   </main>
//                 </div>
//               </div>
//             </SidebarProvider>
//           </SignedIn>

//           <Toaster richColors />
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }
