import { Check, Trash } from "react-bootstrap-icons";
import type { Task } from "../hooks/useFetch";

interface TaskCardProps {
	task: Task;
	onSubmit: (id: number, task: Task) => void;
	onDelete: (id: number) => void;
}

const TaskCard = ({ task, onSubmit, onDelete }: TaskCardProps) => {
	return (
		<div className="flex flex-col justify-around gap-2 px-4 py-3 bg-white rounded-xl shadow  w-full min-h-[80px]">
			<div className="flex items-center gap-3 px-2 ">
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
					className={`flex-1 text-base font-medium ${
						task.isComplete ? "line-through text-gray-400" : "text-gray-800"
					}`}>
					{task.title}
				</p>
				<span className="mr-4 rounded-full p-2 transition-all hover:bg-red-100 hover:scale-110 active:scale-95">
					<Trash
						size={20}
						onClick={() => onDelete(task.id)}
						className="text-red-400 hover:text-red-600 cursor-pointer transition-colors"
					/>
				</span>
			</div>

			<div className="flex items-center gap-4 text-sm text-gray-500">
				<span>{new Date(task.createdAt).toLocaleDateString()}</span>
				<span>{new Date(task.createdAt).toLocaleTimeString()}</span>
			</div>
		</div>
	);
};

export default TaskCard;
