import { useState } from "react";
import { Plus } from "react-bootstrap-icons";

interface TaskFormProps {
	onSubmit: (data: { title: string }) => void;
}

const TaskForm = ({ onSubmit }: TaskFormProps) => {
	interface FormData {
		title: string;
	}
	const [formData, setFormData] = useState<FormData>({
		title: "",
	});

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!formData.title.trim()) {
			return;
		}
		onSubmit(formData);
		setFormData({ title: "" }); // reset input after submit
	};

	return (
		<form
			onSubmit={handleFormSubmit}
			id="task-form"
			className="flex items-center gap-3 bg-white rounded-xl shadow-sm border border-gray-200 p-4 w-full h-[80px]">
			<input
				type="text"
				name="title"
				value={formData.title}
				onChange={handleInputChange}
				className="w-full py-3 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue1500 text-base"
				placeholder="Enter task..."
			/>
			<button
				type="submit"
				className="flex items-center gap-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors">
				<Plus size={18} />
				Add
			</button>
		</form>
	);
};

export default TaskForm;
