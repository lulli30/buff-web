import { useAuth } from "../../../context/AuthContext";
import Layout from "../../../components/Layout";
import WorkoutRoutine from "./WorkoutRoutine";
import WorkoutProgress from "./WorkoutProgress";
import ExerciseLibrary from "./ExerciseLibrary";

const Workout = () => {
  const { user } = useAuth();

  // Mock data for user's workout
  const workoutData = {
    currentPlan: "Strength Training",
    status: "Active" as "Active" | "Paused",
    startDate: "February 10, 2025",
    nextSession: "March 15, 2025",
    goal: "Muscle Gain",
    frequency: "5 times a week",
    trainer: "Coach John",
  };

  // Mock workout history
  const workoutHistory = [
    {
      id: 1,
      workout: "Upper Body Strength",
      status: "Completed" as "Completed",
      date: "March 10, 2025",
    },
    {
      id: 2,
      workout: "Cardio & Endurance",
      status: "In Progress" as "In Progress",
      date: "March 12, 2025",
    },
    {
      id: 3,
      workout: "Full Body Workout",
      status: "Missed" as "Missed",
      date: "March 14, 2025",
    },
  ];

  return (
    <Layout>
      <div className="bg-gray-950 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {user ? (
            <>
              {/* Welcome Message */}
              <div className="relative bg-gradient-to-r from-[#0f172a] to-[#134e4a] rounded-xl shadow-xl mb-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-teal-950/30 bg-opacity-30 rounded-xl"></div>
                <div className="relative p-6 text-white">
                  <h2 className="text-2xl font-bold drop-shadow-lg">
                    Track Your Workouts,{" "}
                    {user.displayName?.split(" ")[0] || "Member"}!
                  </h2>
                  <p className="mt-2 text-gray-300">
                    You are currently following the{" "}
                    <span className="font-semibold">
                      {workoutData.currentPlan}
                    </span>{" "}
                    program.
                  </p>
                </div>
              </div>

              {/* Workout Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <WorkoutRoutine workoutData={workoutData} />
                <WorkoutProgress workoutHistory={workoutHistory} />
              </div>

              {/* Exercise Library Section */}
              <div className="mt-6">
                <ExerciseLibrary />
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-600 mt-4">
                No user data found. Please log in.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Workout;
