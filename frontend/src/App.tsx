import {
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { toast, Toaster } from "sonner";
import Tasks from "./pages/Tasks";

const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error) => {
			toast.error(error.message || "An error occurred");
		},
	}),
});

function App() {
	return (
		<>
			<Toaster richColors />
			<QueryClientProvider client={queryClient}>
				<Tasks />
			</QueryClientProvider>
		</>
	);
}

export default App;
