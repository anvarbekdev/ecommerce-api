import { TextField } from "@mui/material";

const CustomInput = ({ label, type, onChangeVal, value }) => {
	return (
		<TextField
			required
			fullWidth
			size="small"
			label={label}
			value={value}
			type={type}
			onBlur={(e) => onChangeVal(e.target.value)}
		/>
	);
};

export default CustomInput;
