// import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export interface Task {
	id: number;
	title: string;
	isComplete: boolean;
	createdAt: string;
}

const useFetch = () => {
	const { data, isFetching, refetch } = useQuery<{ tasks: Task[] }>({
		queryKey: ["tasksData"],
		queryFn: async () => {
			const response = await axios.get(`${API}/api/tasks`);
			return response.data;
		},
	});

	return {
		data,
		isFetching,
		refetch,
	};
};

export default useFetch;
