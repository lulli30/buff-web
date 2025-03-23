const exercises = [
  { id: 1, name: "Bench Press", muscleGroup: "Chest" },
  { id: 2, name: "Squat", muscleGroup: "Legs" },
  { id: 3, name: "Deadlift", muscleGroup: "Back" },
  { id: 4, name: "Pull-ups", muscleGroup: "Back" },
  { id: 5, name: "Bicep Curl", muscleGroup: "Arms" },
];

const ExerciseLibrary = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-white">
      <h3 className="text-xl font-bold mb-4">Exercise Library</h3>
      <ul className="space-y-3">
        {exercises.map((exercise) => (
          <li key={exercise.id} className="bg-gray-700 p-3 rounded-lg">
            <p className="font-semibold">{exercise.name}</p>
            <p className="text-sm text-gray-300">
              Muscle Group: {exercise.muscleGroup}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseLibrary;
