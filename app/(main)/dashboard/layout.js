  // //main/dashboard/layout.js

  // import DashboardPage from "./page";
  // import { BarLoader } from "react-spinners";
  // import { Suspense } from "react";

  // export default function Layout() {
  //   return (
  //     <div className="px-5 ">
  //       <div className="flex items-center justify-between mb-5">
  //         <h1 className="text-6xl font-bold tracking-tight gradient-title">
  //           Dashboard
  //         </h1>
  //       </div>
  //       <Suspense
  //         fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
  //       >
  //         <DashboardPage />
  //       </Suspense>
  //     </div>
  //   );
  // }

  // app/dashboard/layout.js - Dashboard Layout (Simplified)
import { Suspense } from "react";
import { BarLoader } from "react-spinners";

export default function DashboardLayout({ children }) {
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight gradient-title">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your finances and track your progress
        </p>
      </div>
      
      <Suspense
        fallback={
          <div className="space-y-4">
            <BarLoader width="100%" color="#9333ea" />
            <div className="text-center text-muted-foreground">
              Loading dashboard...
            </div>
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
