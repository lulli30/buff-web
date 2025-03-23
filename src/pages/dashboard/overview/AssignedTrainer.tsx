import { User, Medal } from "lucide-react";

interface Trainer {
  name: string;
  specialization: string;
}

interface Props {
  trainer?: Trainer; // Trainer is optional
  onRequestTrainer?: () => void; // Optional callback for requesting a trainer
}

const AssignedTrainer = ({ trainer, onRequestTrainer }: Props) => {
  return (
    <div className="bg-gradient-to-b from-gray-950 to-teal-950/30 rounded-lg shadow-lg p-6 border border-teal-800/30">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <User className="mr-2 h-5 w-5 text-teal-400" />
          Assigned Trainer
        </h3>
        {!trainer && onRequestTrainer && (
          <button
            onClick={onRequestTrainer}
            className="px-3 py-1 text-xs bg-teal-600 hover:bg-teal-500 text-white rounded-full transition-colors duration-200"
          >
            Request Trainer
          </button>
        )}
      </div>

      {trainer ? (
        <div className="space-y-4">
          <div className="flex items-center bg-gray-800/40 p-3 rounded-md">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-700 flex items-center justify-center text-white font-bold">
              {trainer.name.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3">
              <p className="text-white font-medium">{trainer.name}</p>
              <div className="flex items-center mt-1">
                <Medal className="h-4 w-4 text-teal-400 mr-1" />
                <span className="text-sm text-teal-300">
                  {trainer.specialization}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800/30 rounded-md p-4 text-center">
          <div className="flex justify-center mb-2">
            <User className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-gray-400 text-sm">No trainer assigned yet.</p>
          <p className="text-xs text-gray-500 mt-1">
            A personal trainer will help guide your fitness journey
          </p>
        </div>
      )}
    </div>
  );
};

export default AssignedTrainer;
