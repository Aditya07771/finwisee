import { seedTransactions } from "@/actions/seed";
import { auth } from "@clerk/nextjs/server";

// Add this export to prevent static generation
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return Response.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const result = await seedTransactions();
    return Response.json(result);
  } catch (error) {
    console.error("Seed route error:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}