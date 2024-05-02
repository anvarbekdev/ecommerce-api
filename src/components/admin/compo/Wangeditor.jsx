import { useState, useEffect } from "react";
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { i18nChangeLanguage } from "@wangeditor/editor";
import DOMPurify from "dompurify";

i18nChangeLanguage("en");
function MyEditor() {
	const [editor, setEditor] = useState(null);
	const [html, setHtml] = useState("<p>hello</p>");

	useEffect(() => {
		setTimeout(() => {
			setHtml("<p>hello&nbsp;<strong>world</strong>.</p>\n<p><br></p>");
		}, 1500);
	}, []);

	const toolbarConfig = {};
	const editorConfig = {
		placeholder: "",
	};

	useEffect(() => {
		return () => {
			if (editor == null) return;
			editor.destroy();
			setEditor(null);
		};
	}, [editor]);

	function insertText() {
		if (editor == null) return;
		editor.insertText(" hello ");
	}

	function printHtml() {
		if (editor == null) return;
		console.log(editor.getHtml());
	}

	return (
		<>
			<div>
				<button onClick={insertText}>insert text</button>
				<button onClick={printHtml}>print html</button>
			</div>

			<div
				style={{ border: "1px solid #ccc", zIndex: 10000, marginTop: "15px" }}>
				<Toolbar
					editor={editor}
					defaultConfig={toolbarConfig}
					mode="default"
					style={{ borderBottom: "1px solid #ccc" }}
				/>
				<Editor
					defaultConfig={editorConfig}
					value={html}
					onCreated={setEditor}
					onChange={(editor) => setHtml(editor.getHtml())}
					mode="default"
					style={{ height: "500px" }}
				/>
			</div>
			<div
				dangerouslySetInnerHTML={{
					__html: DOMPurify.sanitize(editor?.getHtml(), {
						ADD_TAGS: ["iframe"],
						ADD_ATTR: [
							"allow",
							"allowfullscreen",
							"frameborder",
							"scrolling",
							"data-js",
						],
					}),
				}}
			/>
		</>
	);
}

export default MyEditor;
