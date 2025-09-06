import { Check } from "react-bootstrap-icons";
import type { Task } from "../hooks/useFetch";

interface TaskCardProps {
	task: Task;
	onSubmit: (id: number, task: Task) => void;
}

const TaskCard = ({ task, onSubmit }: TaskCardProps) => {
	return (
		<div className="flex flex-col justify-around gap-2 px-4 py-3 bg-white rounded-xl shadow  w-full min-h-[80px]">
			<div className="flex items-center gap-3">
				<label className="relative flex items-center justify-center">
					<input
						type="checkbox"
						checked={task.isComplete}
						onChange={() => onSubmit(task.id, task)}
						aria-label="Mark task as complete"
						className="
              peer appearance-none w-6 h-6 rounded-full border-2 border-gray-300
              checked:bg-blue-600 checked:border-blue-600 cursor-pointer transition-colors
            "
					/>
					<Check className="absolute hidden w-3.5 h-3.5 text-white peer-checked:block cursor-pointer " />
				</label>

				<p
					className={`text-base font-medium ${
						task.isComplete ? "line-through text-gray-400" : "text-gray-800"
					}`}>
					{task.title}
				</p>
			</div>

			<div className="flex items-center gap-4 text-sm text-gray-500">
				<span>{new Date(task.createdAt).toLocaleDateString()}</span>
				<span>{new Date(task.createdAt).toLocaleTimeString()}</span>
			</div>
		</div>
	);
};

export default TaskCard;
