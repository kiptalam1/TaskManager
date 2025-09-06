import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useDelete = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: number) => {
			const response = await axios.delete(
				`http://localhost:5000/api/tasks/${id}`
			);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["tasksData"],
			});
		},
	});
};

export default useDelete;
