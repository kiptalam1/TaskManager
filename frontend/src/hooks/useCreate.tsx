import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const useCreate = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: { title: string }) => {
			const response = await axios.post(`${API}/tasks/create`, data);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tasksData"] });
		},
	});
};

export default useCreate;
