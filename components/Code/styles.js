import { css } from '@emotion/core'

const exerciseBody = css`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	transition: all 250ms ease;
	min-height: 575px;
`;

const exerciseContent = css`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 780px;
	padding-top: 80px;
	margin-bottom: 4rem;
	box-sizing:border-box;
	padding-left:30px;
	padding-right:30px;

	p {
		margin: 1em 0;
		padding: 0;
		font-size: 1.125rem;
		letter-spacing: normal;
		line-height: 1.7;
	}

	span {
		font-family: monospace;
		font-weight: bold;
	}

	img {
		width:100%;
		height:auto;
	}
  }
`;

const exerciseEditor = css`
	width: 100%;
	box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.16);
	border-radius: 8px;

	.react-monaco-editor-container {
		border-radius: 8px;
		overflow: hidden;
	}

`;

const editorOptions = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	section {
		display: flex;
		flex-direction: row;
	}
`;

const editorButton = css`
	padding: 10px 24px;
	border-radius: 100px;
	border: 2px solid #000000;
	box-sizing: border-box;
	font-family: "wal-bold", "sans-serif";
	font-size: 16px;
	line-height: 32px;
	cursor: pointer;
	transition: all 250ms ease;
	user-select: none;

	&:hover {
		opacity: 0.7;
	}
`;

const editorOutput = css`
	display: flex;
	flex-direction: column;

	h3 {
		font-family: "wal-bold", "sans-serif";
		font-size: 24px;
		line-height: 32px;
		margin-top: 3rem;
		margin-bottom: 16px;
	}

	section {
		width: 100%;
		min-height: 50px;
		overflow: auto;
		background: #ffffff;
		box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.16);
		border-radius: 8px;
		padding: 15px;
		box-sizing: border-box;
	}
`;

const progressOverlay = css`
	display:flex;
	flex-direction:column;
	align-items:center;
	justify-content:center;
	height:100vh;
	width:100%;
	background:rgba(255, 255, 255, 0.9);
	position:fixed;
	top:0;
	left:0;
	right:0;
	font-weight:bold;
	z-index:99;
`

export default {
    exerciseBody,
    exerciseContent,
    exerciseEditor,
    editorOptions,
    editorButton,
    editorOutput,
    progressOverlay
}