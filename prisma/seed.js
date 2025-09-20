// prisma/seed.js
import { PrismaClient } from "@prisma/client";
import { subDays } from "date-fns";
import crypto from "crypto";

const db = new PrismaClient();

// Hardcoded test IDs (replace if needed)
const USER_ID = "3e6898d5-5ee1-4176-93c2-c3e55661d5a2";
const ACCOUNT_ID = "cf6965ce-69d6-4834-ac14-e33ac24d69e4";

// Categories with ranges
const CATEGORIES = {
  INCOME: [
    { name: "salary", range: [5000, 8000] },
    { name: "freelance", range: [1000, 3000] },
    { name: "investments", range: [500, 2000] },
    { name: "other-income", range: [100, 1000] },
  ],
  EXPENSE: [
    { name: "housing", range: [1000, 2000] },
    { name: "transportation", range: [100, 500] },
    { name: "groceries", range: [200, 600] },
    { name: "utilities", range: [100, 300] },
    { name: "entertainment", range: [50, 200] },
    { name: "food", range: [50, 150] },
    { name: "shopping", range: [100, 500] },
    { name: "healthcare", range: [100, 1000] },
    { name: "education", range: [200, 1000] },
    { name: "travel", range: [500, 2000] },
  ],
};

// Helpers
function getRandomAmount(min, max) {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

function getRandomCategory(type) {
  const categories = CATEGORIES[type];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const amount = getRandomAmount(category.range[0], category.range[1]);
  return { category: category.name, amount };
}

async function main() {
  // Ensure test user exists
  const user = await db.user.upsert({
    where: { id: USER_ID },
    update: {},
    create: {
      id: USER_ID,
      clerkUserId: "seed-user",
      email: "seed@example.com",
    },
  });

  // Ensure test account exists (must include type)
  const account = await db.account.upsert({
    where: { id: ACCOUNT_ID },
    update: {},
    create: {
      id: ACCOUNT_ID,
      name: "Seed Account",
      balance: 0,
      userId: user.id,
      isDefault: true,
      type: "SAVINGS", // 👈 REQUIRED ENUM FIELD
    },
  });

  // Generate 90 days of transactions
  const transactions = [];
  let totalBalance = Number(account.balance);

  for (let i = 90; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const transactionsPerDay = Math.floor(Math.random() * 3) + 1;

    for (let j = 0; j < transactionsPerDay; j++) {
      const type = Math.random() < 0.4 ? "INCOME" : "EXPENSE";
      const { category, amount } = getRandomCategory(type);

      const transaction = {
        id: crypto.randomUUID(),
        type,
        amount,
        description: `${type === "INCOME" ? "Received" : "Paid for"} ${category}`,
        date,
        category,
        status: "COMPLETED",
        userId: user.id,
        accountId: account.id,
        isRecurring: false,
      };

      totalBalance += type === "INCOME" ? amount : -amount;
      transactions.push(transaction);
    }
  }

  // Reset and insert
  await db.$transaction(async (tx) => {
    await tx.transaction.deleteMany({ where: { accountId: account.id } });

    await tx.transaction.createMany({ data: transactions });

    await tx.account.update({
      where: { id: account.id },
      data: { balance: totalBalance },
    });
  });

  console.log(`✅ Created ${transactions.length} transactions for account: ${account.name}`);
}

// Run
main()
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
