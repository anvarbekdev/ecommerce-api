import { TextField } from "@mui/material";

const CustomInputOn = ({
	label,
	label2,
	required,
	type,
	onChangeVal,
	value,
	placeholder,
}) => {
	return (
		<label className="mx-2 " htmlFor="">
			<div className="mb-1">{label2}</div>
			<TextField
				required={required}
				placeholder={placeholder}
				fullWidth
				size="small"
				label={label}
				value={value}
				type={type}
				onChange={(e) => onChangeVal(e.target.value)}
			/>
		</label>
	);
};

export default CustomInputOn;
