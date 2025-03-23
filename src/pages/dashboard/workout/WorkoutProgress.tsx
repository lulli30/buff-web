interface WorkoutProgressProps {
  workoutHistory: {
    id: number;
    workout: string;
    status: "Completed" | "In Progress" | "Missed";
    date: string;
  }[];
}

const WorkoutProgress = ({ workoutHistory }: WorkoutProgressProps) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-white">
      <h3 className="text-xl font-bold mb-4">Workout Progress</h3>
      <ul className="space-y-3">
        {workoutHistory.map((workout) => (
          <li
            key={workout.id}
            className={`p-3 rounded-lg ${
              workout.status === "Completed"
                ? "bg-green-700"
                : workout.status === "In Progress"
                ? "bg-yellow-700"
                : "bg-red-700"
            }`}
          >
            <p className="font-semibold">{workout.workout}</p>
            <p className="text-sm">
              {workout.date} - <span className="italic">{workout.status}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutProgress;
