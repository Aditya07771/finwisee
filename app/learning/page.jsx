import { LearningModules } from "@/components/Dashboard/learning-modules";

export default function CommunityPage() {
  return (
    <div className="flex justify-center items-start mt-24 px-4 mb-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl">
        <LearningModules />
      </div>
    </div>
  );
}