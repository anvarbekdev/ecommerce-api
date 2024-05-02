import { FormControl, TextField } from "@mui/material";
import { GrAdd } from "react-icons/gr";
import { IoIosRemove } from "react-icons/io";
function DynamicFieldsCustom({ setFields, fields }) {
	const handleAddField = () => {
		const newFields = [...fields, { size: "" }];
		setFields(newFields);
	};

	const handleChange = (index, e) => {
		const newFields = [...fields];
		newFields[index].size = e.target.value;
		setFields(newFields);
	};

	const handleRemoveField = (index) => {
		const newFields = [...fields];
		newFields.splice(index, 1);
		setFields(newFields);
	};
	// console.log(fields);
	return (
		<div className=" flex flex-col justify-center">
			{fields &&
				fields.map((field, index) => (
					<div key={index} className="mt-2 flex">
						<FormControl size="small" sx={{ width: 100 }}>
							<TextField
								labelId="label5"
								id="select"
								size="small"
								name="size"
								onBlur={(e) => handleChange(index, e)}
								label="O'lcham"
							/>
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

export default DynamicFieldsCustom;
