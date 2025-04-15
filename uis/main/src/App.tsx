import { BrowserRouter } from "react-router";
import Pages from "./pages";



function App() {

	return (
		<BrowserRouter>
			<div className="flex w-full h-screen">
				<Pages />
			</div>
		</BrowserRouter>
	);
}


export default App;
