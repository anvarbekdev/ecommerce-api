import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
export default function Tinymce({ initialValue, value }) {
	// const editorRef = useRef(null);
	// const log = () => {
	// 	if (editorRef.current) {
	// 		console.log(editorRef.current.getContent());
	// 		value(editorRef.current.getContent());
	// 	}
	// };
	return (
		<>
			<SunEditor />
		</>
	);
}
