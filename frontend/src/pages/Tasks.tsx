// import { useQueryClient } from "@tanstack/react-query";
import TaskForm from "../components/TaskForm";
import useFetch from "../hooks/useFetch";
import TaskCard from "../components/TaskCard";
import useCreate from "../hooks/useCreate";
import useUpdate from "../hooks/useUpdate";
import type { Task } from "../hooks/useFetch";
import useDelete from "../hooks/useDelete";

const Tasks = () => {
	const { data, isFetching } = useFetch();
	const { mutate: createTask } = useCreate();
	const { mutate: updateTask } = useUpdate();
	const { mutate: deleteTask } = useDelete();

	const tasks = data?.tasks;

	const handleSubmit = (data: { title: string }) => {
		createTask(data);
	};

	const handleTaskUpdate = (id: number, task: Task) => {
		updateTask({ id, isComplete: !task.isComplete });
	};

	const handleTaskDelete = (id: number) => {
		deleteTask(id);
	};

	return (
		<div className="min-h-screen w-full flex flex-col items-center px-4 py-6 bg-gray-50">
			<h1 className="text-2xl font-bold text-gray-800 mb-6">Task Manager</h1>

			<div className="w-full max-w-2xl flex flex-col gap-6 px-4">
				<TaskForm onSubmit={handleSubmit} />

				{isFetching && (
					<div className="flex justify-center py-6 text-gray-500">
						Loading...
					</div>
				)}

				{tasks?.map((task) => (
					<TaskCard
						task={task}
						onSubmit={handleTaskUpdate}
						onDelete={handleTaskDelete}
						key={task.id}
					/>
				))}

				{!isFetching && (!tasks || tasks.length === 0) && (
					<p className="text-center text-gray-500 py-6">
						No tasks yet. Add one above!
					</p>
				)}
			</div>
		</div>
	);
};

export default Tasks;
