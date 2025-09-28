import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transaction-form";
import { getTransaction } from "@/actions/transaction";

export const dynamic = 'force-dynamic';

async function TransactionFormContent({ searchParams }) {
  try {
    const accounts = await getUserAccounts();
    const editId = searchParams?.edit;

    let initialData = null;
    if (editId) {
      const transaction = await getTransaction(editId);
      initialData = transaction;
    }

    return (
      <div className="max-w-3xl mx-auto px-5">
        <div className="flex justify-center md:justify-normal mb-8">
          <h1 className="text-5xl gradient-title ">Add Transaction</h1>
        </div>
        <AddTransactionForm
          accounts={accounts}
          categories={defaultCategories}
          editMode={!!editId}
          initialData={initialData}
        />
      </div>
    );
  } catch (error) {
    console.error("Transaction page error:", error);
    return (
      <div className="max-w-3xl mx-auto px-5">
        <div className="text-center py-8">
          <p className="text-red-500">Error loading transaction form</p>
        </div>
      </div>
    );
  }
}

export default function AddTransactionPage({ searchParams }) {
  return <TransactionFormContent searchParams={searchParams} />;
}