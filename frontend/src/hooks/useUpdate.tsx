import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface updateTaskData {
	id: number;
	isComplete: boolean;
}

const useUpdate = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, isComplete }: updateTaskData) => {
			const response = await axios.patch(
				`http://localhost:5000/api/tasks/${id}`,
				{ isComplete }
			);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tasksData"] });
		},
	});
};

export default useUpdate;
