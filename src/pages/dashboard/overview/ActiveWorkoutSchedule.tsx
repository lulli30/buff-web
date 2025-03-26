import { Calendar, User, Clock, Check, X, AlertCircle } from "lucide-react";

interface WorkoutSession {
  id: number;
  trainer: string;
  date: string;
  time: string;
  status: "Upcoming" | "Completed" | "Canceled";
}

interface Props {
  sessions: WorkoutSession[];
  onViewAllSessions?: () => void;
  onBookSession?: () => void;
}

const statusConfig = {
  Upcoming: {
    color: "bg-green-900/40 text-green-400 border-green-700/50",
    icon: <Clock className="h-4 w-4 text-green-400" />,
  },
  Completed: {
    color: "bg-blue-900/40 text-blue-400 border-blue-700/50",
    icon: <Check className="h-4 w-4 text-blue-400" />,
  },
  Canceled: {
    color: "bg-red-900/40 text-red-400 border-red-700/50",
    icon: <X className="h-4 w-4 text-red-400" />,
  },
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

const ActiveWorkoutSchedule = ({
  sessions,
  onViewAllSessions,
  onBookSession,
}: Props) => {
  return (
    <div className="bg-gradient-to-b from-gray-950 to-teal-950/30 rounded-lg shadow-lg border border-gray-800/50 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-800/70 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-teal-400" /> Active Workout
          Schedule
        </h3>
        {sessions.length > 0 && (
          <div className="px-3 py-1 text-xs font-medium rounded-full bg-teal-900/40 text-teal-400 border-teal-700/50">
            {sessions.length} {sessions.length === 1 ? "Session" : "Sessions"}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {sessions.length > 0 ? (
            sessions.map(({ id, trainer, date, time, status }) => (
              <div
                key={id}
                className="flex items-center p-4 bg-gray-800/40 rounded-md border border-gray-700/50"
              >
                <User className="h-5 w-5 text-teal-400 mr-3 flex-shrink-0" />
                <div className="flex-grow">
                  <h4 className="text-md font-medium text-white">{trainer}</h4>
                  <p className="text-sm text-gray-400 flex items-center mt-1">
                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                    {formatDate(date)} at {time}
                  </p>
                </div>
                <div
                  className={`px-3 py-1 text-xs font-medium rounded-full flex items-center space-x-1 ${statusConfig[status].color}`}
                >
                  {statusConfig[status].icon}
                  <span>{status}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="h-8 w-8 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400">No upcoming sessions.</p>
            </div>
          )}
        </div>

        <div className="mt-6 space-y-3">
          <button
            className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white px-4 py-3 rounded-lg font-medium hover:from-teal-500 hover:to-teal-400 transition flex items-center justify-center shadow-md"
            onClick={onBookSession}
          >
            <Calendar className="h-5 w-5 mr-2" /> Book New Session
          </button>
          {sessions.length > 0 && onViewAllSessions && (
            <button
              className="w-full bg-gray-800 text-gray-200 border border-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-700 transition flex items-center justify-center"
              onClick={onViewAllSessions}
            >
              <Clock className="h-5 w-5 mr-2" /> View All Sessions
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActiveWorkoutSchedule;
