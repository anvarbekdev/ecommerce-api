import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { GrAdd } from "react-icons/gr";
import { IoIosRemove } from "react-icons/io";
function DynamicFields({ setFields, fields }) {
	const handleAddField = () => {
		const newFields = [...fields, { size: "" }];
		setFields(newFields);
	};

	const handleChange = (index, event) => {
		const newFields = [...fields];
		newFields[index].size = event.target.value;
		setFields(newFields);
	};

	const handleRemoveField = (index) => {
		const newFields = [...fields];
		newFields.splice(index, 1);
		setFields(newFields);
	};

	return (
		<div className=" flex flex-col justify-center">
			{fields &&
				fields.map((field, index) => (
					<div key={index} className="mt-2 flex">
						<FormControl size="small" sx={{ width: 100 }}>
							<InputLabel id="label5">O'lcham</InputLabel>
							<Select
								labelId="label5"
								id="select"
								size="small"
								value={field.size}
								name="size"
								label="O'lcham"
								onChange={(e) => handleChange(index, e)}>
								<MenuItem value="xs">xs</MenuItem>
								<MenuItem value="sm">sm</MenuItem>
								<MenuItem value="md">md</MenuItem>
								<MenuItem value="xl">xl</MenuItem>
								<MenuItem value="2xl">2xl</MenuItem>
								<MenuItem value="3xl">3xl</MenuItem>
								<MenuItem value="4xl">4xl</MenuItem>
							</Select>
						</FormControl>
						<button
							className="border ml-2 px-4 my-2 hover:border-red-600"
							onClick={() => handleRemoveField(index)}>
							<IoIosRemove />
						</button>
					</div>
				))}
			<button
				className=" w-24 mt-3 border py-1 hover:border-green-400 flex items-center justify-center"
				onClick={handleAddField}>
				<GrAdd />
			</button>
		</div>
	);
}

export default DynamicFields;
