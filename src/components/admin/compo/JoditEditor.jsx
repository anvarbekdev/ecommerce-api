import { useMemo, useRef } from "react";
import JoditEditor from "jodit-react";

const JoditTextEditor = ({ initialValue, value }) => {
	const editor = useRef(null);
	const config = {
		readonly: false, // all options from https://xdsoft.net/jodit/docs/,
		placeholder: "Mahsulot haqida batafsil ma'lumot...",
	};

	return (
		<>
			<JoditEditor
				ref={editor}
				config={config}
				value={initialValue}
				// onChange={(newCon) => getValue(newCon)}
				onBlur={(newContent) => value(newContent)}
			/>
		</>
	);
};

export default JoditTextEditor;
