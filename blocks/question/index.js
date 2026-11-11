(function (blocks, blockEditor, components, data, element, i18n) {
	"use strict";

	var registerBlockType = blocks.registerBlockType;
	var RichText = blockEditor.RichText;
	var useBlockProps = blockEditor.useBlockProps;
	var Notice = components.Notice;
	var useDispatch = data.useDispatch;
	var useSelect = data.useSelect;
	var useEffect = element.useEffect;
	var createElement = element.createElement;
	var Fragment = element.Fragment;
	var __ = i18n.__;

	function hasContent(value) {
		var temporaryElement;

		if (typeof value !== "string") {
			return false;
		}

		temporaryElement = document.createElement("div");
		temporaryElement.innerHTML = value;

		return (
			temporaryElement.textContent.replace(/\u00a0/g, " ").trim().length > 0
		);
	}

	registerBlockType("db-faq-blocks/question", {
		edit: function (props) {
			var question = props.attributes.question || "";

			var answer = props.attributes.answer || "";

			var format = props.context["db-faq-blocks/outputFormat"] || "plain";

			var questionIsValid = hasContent(question);

			var answerIsValid = hasContent(answer);

			var blockIsValid = questionIsValid && answerIsValid;

			var postStatus = useSelect(function (select) {
				return select("core/editor").getEditedPostAttribute("status");
			}, []);

			var isDraft = postStatus === "draft" || postStatus === "auto-draft";

			/*
			 * Incomplete FAQ items may be saved in drafts,
			 * but not in posts moving to a publishable state.
			 */
			var shouldBlockSaving = !blockIsValid && !isDraft;

			var lockName = "db-faq-blocks-question-" + props.clientId;

			var editorDispatch = useDispatch("core/editor");

			useEffect(
				function () {
					if (shouldBlockSaving) {
						editorDispatch.lockPostSaving(lockName);
					} else {
						editorDispatch.unlockPostSaving(lockName);
					}

					return function () {
						editorDispatch.unlockPostSaving(lockName);
					};
				},
				[shouldBlockSaving, lockName, editorDispatch],
			);

			var blockProps = useBlockProps({
				className:
					"db-faq-question-editor " +
					"db-faq-question-editor--" +
					format +
					(blockIsValid ? "" : " has-validation-error"),
			});

			var validationMessage = isDraft
				? __(
						"Both fields are required before this post can be published. You can still save it as a draft.",
						"db-faq-blocks",
					)
				: __(
						"Enter both a question and an answer before publishing.",
						"db-faq-blocks",
					);

			return createElement(
				Fragment,
				{},

				createElement(
					"div",
					blockProps,

					!blockIsValid &&
						createElement(
							Notice,
							{
								status: isDraft ? "warning" : "error",
								isDismissible: false,
							},
							validationMessage,
						),

					createElement(
						"div",
						{
							className:
								"db-faq-question-editor__field" +
								(questionIsValid ? "" : " has-validation-error"),
						},

						createElement(
							"label",
							{
								className: "db-faq-question-editor__label",
							},
							__("Question (required)", "db-faq-blocks"),
						),

						createElement(RichText, {
							tagName: format === "details" ? "div" : "h3",

							className: "db-faq-question-editor__question",

							value: question,

							allowedFormats: ["core/bold", "core/italic"],

							placeholder: __("Enter a question…", "db-faq-blocks"),

							"aria-required": "true",

							"aria-invalid": questionIsValid ? "false" : "true",

							onChange: function (value) {
								props.setAttributes({
									question: value,
								});
							},
						}),
					),

					createElement(
						"div",
						{
							className:
								"db-faq-question-editor__field" +
								(answerIsValid ? "" : " has-validation-error"),
						},

						createElement(
							"label",
							{
								className: "db-faq-question-editor__label",
							},
							__("Answer (required)", "db-faq-blocks"),
						),

						createElement(RichText, {
							tagName: format === "details" ? "div" : "p",

							className: "db-faq-question-editor__answer",

							value: answer,

							allowedFormats: ["core/bold", "core/italic", "core/link"],

							placeholder: __("Enter the answer…", "db-faq-blocks"),

							"aria-required": "true",

							"aria-invalid": answerIsValid ? "false" : "true",

							onChange: function (value) {
								props.setAttributes({
									answer: value,
								});
							},
						}),
					),
				),
			);
		},

		save: function () {
			return null;
		},
	});
})(
	window.wp.blocks,
	window.wp.blockEditor,
	window.wp.components,
	window.wp.data,
	window.wp.element,
	window.wp.i18n,
);
