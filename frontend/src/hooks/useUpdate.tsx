import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

interface updateTaskData {
	id: number;
	isComplete: boolean;
}

const useUpdate = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, isComplete }: updateTaskData) => {
			const response = await axios.patch(`${API}/api/tasks/${id}`, {
				isComplete,
			});
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tasksData"] });
		},
	});
};

export default useUpdate;
