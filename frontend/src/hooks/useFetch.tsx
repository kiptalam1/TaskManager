// import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Task {
	id: number;
	title: string;
	isComplete: boolean;
	createdAt: string;
}

const useFetch = () => {
	const { data, isFetching } = useQuery<{ tasks: Task[] }>({
		queryKey: ["tasksData"],
		queryFn: async () => {
			const response = await axios.get("http://localhost:5000/api/tasks");
			return response.data;
		},
	});

	return {
		data,
		isFetching,
	};
};

export default useFetch;
