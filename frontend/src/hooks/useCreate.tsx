import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useCreate = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: { title: string }) => {
			const response = await axios.post(
				"http://localhost:5000/api/tasks/create",
				data
			);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tasksData"] });
		},
	});
};

export default useCreate;
