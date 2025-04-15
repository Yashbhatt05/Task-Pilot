import  { useEffect, useState } from "react";
import  { ControlledBoard, moveCard } from "@caldwell619/react-kanban";
import "@caldwell619/react-kanban/dist/styles.css";
import STDLIB from "../../stdlib/index";

const initialBoard: any = {
	columns: [
		{
			id: 1,
			title: "To Do",
			cards: [
				{ id: 1, title: "Task 1", description: "This is the first task" },
				{ id: 2, title: "Task 2", description: "This is the second task" },
			],
		},
		{
			id: 2,
			title: "In Progress",
			cards: [],
		},
		{
			id: 3,
			title: "Done",
			cards: [],
		},
	],
};


interface Task {
	id: number;
	title: string;
	description: string;
	status: string;
}

const CompKanban = () => {

	const [board, setBoard] = useState<any>(initialBoard);

	const handleCardMove = (card: any, source: any, destination: any) => {
		const updatedBoard = moveCard(board, source, destination);
		setBoard(updatedBoard);
	};

	
	useEffect(() => {
		// set the kanban data here
		// get the task data from the server and put it here

		(async () => {
			await init();
		})()
		
	}, []);


	const getTasks = async () => {
		const res =  await STDLIB.api.fn("gettask", {});
		// parse the response as well
		return res;
	}

	// gets cards for the given column
	const getCards = (data: Task[], filter: {property: string, value: any}) => {
		return data.filter((t) => {
			const prop = filter.property;
			return t[prop as keyof(Task) ] === filter.value;
		});


	}


	// get cols from the passed data and property name for the col
	const getCols =  (data: Task[], property: keyof Task  ) => {
		// get all the unique status present in the data

		const cols : {id: number, title: string|number, cards: Task[]}[] = [];
		data.forEach((t, idx) => {
		
			if(!cols.map(c => c.title).includes(t[property])){
				const cards = getCards(data, {property: property, value: t[property]});
				cols.push({id: idx+1, title: t[property], cards: cards});
			}
		});

		return cols;
	}	

	

	const init = async () => {
		// on init
		// get the task data and set it to the cards
		const t = await getTasks();
		console.log("t : ", t);
		if(!t.success) return t;
		const tasks = t.data;
		const cols  =  getCols(tasks, 'status');
		console.log("Cols : ", cols);
		setBoard((b: any) => {
			return {...b, columns: cols};
		})
		
	}

	return (
		<div className="p-4">
			<h2 className="text-xl font-bold mb-4">Kanban Board</h2>
			<ControlledBoard onCardDragEnd={handleCardMove}>{board}</ControlledBoard>
		</div>
	);
};

export default CompKanban;
