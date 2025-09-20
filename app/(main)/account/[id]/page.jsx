// main/account/[id]/page.jsx
import { Suspense } from "react";
import { getAccountWithTransactions } from "@/actions/account";
import { BarLoader } from "react-spinners";
import { TransactionTable } from "../_components/transaction-table";
import { notFound } from "next/navigation";
import { AccountChart } from "../_components/account-chart";

export default async function AccountPage({ params }) {
  console.log("=== DEBUG: Account Page ===");
  console.log("Account ID from params:", params.id);

  const accountData = await getAccountWithTransactions(params.id);

  if (!accountData) {
    console.log("Account data not found for ID:", params.id);
    notFound();
  }

  const { transactions, ...account } = accountData;

  // Enhanced debugging
  console.log("=== DEBUG: Account Data ===");
  console.log("Account:", {
    id: account.id,
    name: account.name,
    userId: account.userId,
    transactionCount: account._count?.transactions
  });
  
  console.log("=== DEBUG: Transactions ===");
  console.log("Transactions type:", typeof transactions);
  console.log("Is array?", Array.isArray(transactions));
  console.log("Transactions length:", transactions?.length || 0);
  
  if (transactions && transactions.length > 0) {
    console.log("First transaction:", transactions[0]);
    console.log("Transaction user IDs:", [...new Set(transactions.map(t => t.userId))]);
    console.log("Transaction account IDs:", [...new Set(transactions.map(t => t.accountId))]);
  } else {
    console.log("No transactions found");
  }

  return (
    <div className="space-y-8 px-5">
      <div className="flex gap-4 items-end justify-between">
        <div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight gradient-title capitalize">
            {account.name}
          </h1>
          <p className="text-muted-foreground">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
            Account
          </p>
        </div>

        <div className="text-right pb-2">
          <div className="text-xl sm:text-2xl font-bold">
            ${parseFloat(account.balance).toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            {account._count?.transactions || 0} Transactions
          </p>
        </div>
      </div>

      {/* Debug Info - Remove in production */}
      {/* <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
        <p><strong>Debug Info:</strong></p>
        <p>Account ID: {account.id}</p>
        <p>User ID: {account.userId}</p>
        <p>Transactions Found: {transactions?.length || 0}</p>
        <p>Transaction Count from DB: {account._count?.transactions || 0}</p>
      </div> */}

      {/* Chart Section */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <AccountChart transactions={transactions || []} />
      </Suspense>

      {/* Transactions Table */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <TransactionTable transactions={transactions || []} />
      </Suspense>
    </div>
  );
}