interface WorkoutRoutineProps {
  workoutData: {
    currentPlan: string;
    status: "Active" | "Paused";
    startDate: string;
    nextSession: string;
    goal: string;
    frequency: string;
    trainer: string;
  };
}

const WorkoutRoutine = ({ workoutData }: WorkoutRoutineProps) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-white">
      <h3 className="text-xl font-bold mb-4">Workout Routine</h3>
      <p>
        <span className="font-semibold">Plan:</span> {workoutData.currentPlan}
      </p>
      <p>
        <span className="font-semibold">Status:</span> {workoutData.status}
      </p>
      <p>
        <span className="font-semibold">Start Date:</span>{" "}
        {workoutData.startDate}
      </p>
      <p>
        <span className="font-semibold">Next Session:</span>{" "}
        {workoutData.nextSession}
      </p>
      <p>
        <span className="font-semibold">Goal:</span> {workoutData.goal}
      </p>
      <p>
        <span className="font-semibold">Frequency:</span>{" "}
        {workoutData.frequency}
      </p>
      <p>
        <span className="font-semibold">Trainer:</span> {workoutData.trainer}
      </p>
    </div>
  );
};

export default WorkoutRoutine;
