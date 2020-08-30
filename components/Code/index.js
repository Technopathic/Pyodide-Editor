/** @jsx jsx */

import React from "react";
import dynamic from "next/dynamic";

import { jsx, css } from "@emotion/core";
import Styles from "./styles";

import print from "./helpers/print";
import show from "./helpers/show";

const MonacoEditor = dynamic(() => import("react-monaco-editor"), {
  	ssr: false,
});

class Code extends React.PureComponent {
	state = {
		consoleOutput: [],
		figureOutput: [],
		consoleError: "",
		testOutput: "",
		isLoading: true,
		codeProcess: false,
		plotProcess: false,
		testProcess: false,
		pythonLoading: false,
		editorHeight: 350,
		prevHeight: 0,
  	};

  	componentDidMount() {
    	this.initExercise();
		this.worker = new Worker("/web.worker.js");
		this.worker.addEventListener("message", this.onWorkerMessage);
  	}

  	componentWillUnmount() {
      	this.worker.terminate();
 	}

	onWorkerMessage = (e) => {
		
		const data = e.data.data;
		const useTest = e.data.useTest;
		const usePlot = e.data.usePlot;

    	if (e.data.init) {
      		this.setState({ pythonLoading: false });
    	} else {
      		this.setState({
				consoleOutput: [],
				figureOutput: [],
				consoleError: "",
				testOutput: "",
        	}, () => {
          		if (useTest) {
					this.setState({
						testProcess: false,
						testOutput: data,
					});
				} else if(usePlot) {
					this.setState({
						figureOutput: data,
						plotProcess: false
					})
				} else {
            		if (data.error) {
						this.setState({
							consoleError: data.error.message,
							codeProcess: false,
							testProcess:false,
							plotProcess: false
						});
					} else {
						this.setState({
							consoleOutput: data,
							codeProcess: false
						})
					}
          		}
        	})
    	}
  	}

	initExercise = () => {
		this.setState({ 
			isLoading: true, 
			consoleOutput: [], 
			figureOutput: [], 
			consoleError: "", 
			testOutput: "" 
		}, () => {
        	this.checkEditor();
        });
  	};

	resetExercise = () => {
    	this.runCode(`
try:
    plt
except NameError:
    output = ""
else:
    plt.clf()
        `);
		this.editor.setValue(this.props.code);
    	this.setState({ 
			consoleOutput: [], 
			figureOutput: [], 
			consoleError: "", 
			testOutput: ""
		});
  	};

  	checkEditor = () => {
    	if (typeof this.editor !== "undefined") {
      		this.editor.setValue(this.props.code);
			this.setState({
				isLoading: false
			});
      		this.forceUpdate();
    	} else {
      		setTimeout(this.checkEditor, 350);
    	}
  	};

  	editorDidMount = (editor, monaco) => {
    	this.editor = editor;
    	window.MonacoEnvironment.getWorkerUrl = (_moduleId, label) => {
			if (label === "python") return "_next/static/python.worker.js";

      		return "_next/static/editor.worker.js";
    	};

    	editor.onDidChangeModelDecorations(() => {
			this.updateEditorHeight(editor, monaco);
			window.requestAnimationFrame(this.updateEditorHeight);
    	});
  	};

  	updateEditorHeight = (editor, monaco) => {
    	if (editor && monaco) {
      		const editorElement = editor.getDomNode();

			if (!editorElement) {
				return;
			}

			const lineHeight = editor.getOption(
				monaco.editor.EditorOption.lineHeight
			);
			const lineCount = editor.getModel()?.getLineCount() || 1;
			const height = editor.getTopForLineNumber(lineCount + 1) + lineHeight;

			if (this.state.prevHeight !== height + 10) {
				this.setState({ prevHeight: height + 10 });
				this.setState({ editorHeight: `${height + 10}px` });
				editor.layout();
			}
    	}
  	};

  	runCode = (code, codeProcess = false, useTest = false, usePlot = false) => {
    	this.setState({
			codeProcess: codeProcess,
			testProcess: useTest,
			plotProcess: usePlot,
			consoleOutput: [],
			figureOutput:[],
			consoleError: "",
			testOutput: "",
		});
		
		let python = 
`
${print}
${code}
${useTest ? this.props.test : ""}
${usePlot ? show : ""}
${usePlot ? this.props.plot : ""}

`;

		const data = {
			python,
			useTest,
			usePlot
		}

		this.worker.postMessage(data);

    	return;
	};
	  


  	render() {
		const options = {
			electOnLineNumbers: true,
			minimap: { enabled: false },
			readOnly: false,
			scrollBeyondLastLine: false,
			scrollbar: {
				vertical: "hidden",
				handleMouseWheel: false,
			}
		};

    	return (
			<section css={Styles.exerciseBody}>
				{this.state.isLoading || this.state.pythonLoading ? (
					<div css={Styles.progressOverlay}>LOADING EXERCISE...</div>
				) : null}
				<div css={Styles.exerciseContent}>
					<div
						css={Styles.exerciseEditor}
						style={{ height: this.state.editorHeight, overflow: "hidden" }}
					>
						<MonacoEditor
							width="100%"
							language="python"
							theme="vs-light"
							options={options}
							editorDidMount={this.editorDidMount}
						/>
					</div>
					<div css={Styles.editorOptions}>
						<section>
							<div
								onClick={this.resetExercise}
								css={Styles.editorButton}
								style={{ margin: " 1rem 0rem" }}
							>
								Reset
							</div>
						</section>
						<section>
							{this.props.plot ? (
								this.state.plotProcess === true ? (
								<div
									css={Styles.editorButton}
									style={{
										background: "rgba(255, 255, 255, 0.5)",
										margin: " 1rem 0.5rem",
									}}
								>
									Plotting...
								</div>
								) : (
								<div
									css={Styles.editorButton}
									onClick={() => this.runCode(this.editor.getValue(), false, false, true)}
									style={{ margin: " 1rem 0.5rem" }}
								>
									Plot
								</div>
								)
							) : null}
							{this.state.codeProcess === true ? (
								<div
								css={Styles.editorButton}
								style={{
									background: "rgba(255, 255, 255, 0.5)",
									margin: " 1rem 0.5rem",
									}}
								>
									Processing...
								</div>
							) : (
								<div
								css={Styles.editorButton}
								onClick={() => this.runCode(this.editor.getValue(), true)}
								style={{ margin: " 1rem 0.5rem" }}
								>
									Run
								</div>
							)}
							{this.state.testProcess === true ? (
								<div
								css={ Styles.editorButton }
								style={{
									background: "rgba(255, 255, 255, 0.5)",
									margin: " 1rem 0.5rem",
								}}>
									Processing...
								</div>
							) : (
								<div
									css={Styles.editorButton}
									onClick={() => this.runCode(this.editor.getValue(), false, true)}
									style={{ margin: " 1rem 0.5rem" }}
								>
									Test
								</div>
							)}
						</section>
					</div>
					<div css={Styles.editorOutput}>
						<h3>
							Output
						</h3>
						<section>
							{this.state.consoleOutput.map((output, i) => (
								<span key={i}>
									{output} <br/>
								</span>
							))}
							{this.state.figureOutput.map((figure, i) => (
								<img src={figure} key={i} alt="python graphic output" />
							))}
							<pre style={{ color: "#FF0000" }}>
								{this.state.consoleError}
							</pre>
							<pre style={{ color: "#FFCC00" }}>
								{this.state.testOutput}
							</pre>
						</section>
					</div>
				</div>
			</section>
    	);
  	}
}

export default Code;
