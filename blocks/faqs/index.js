(function (blocks, blockEditor, components, element, i18n) {
	"use strict";
	var registerBlockType = blocks.registerBlockType;
	var useBlockProps = blockEditor.useBlockProps;
	var useInnerBlocksProps = blockEditor.useInnerBlocksProps;
	var InspectorControls = blockEditor.InspectorControls;
	var PanelBody = components.PanelBody;
	var RadioControl = components.RadioControl;
	var createElement = element.createElement;
	var Fragment = element.Fragment;
	var __ = i18n.__;

	registerBlockType("db-faq-blocks/faqs", {
		edit: function (props) {
			var outputFormat = props.attributes.outputFormat || "plain";
			var blockProps = useBlockProps({ className: "db-faqs-editor" });
			var innerBlocksProps = useInnerBlocksProps(blockProps, {
				allowedBlocks: ["db-faq-blocks/question"],
				template: [["db-faq-blocks/question"]],
				renderAppender: blockEditor.InnerBlocks.ButtonBlockAppender,
			});

			return createElement(
				Fragment,
				{},
				createElement(
					InspectorControls,
					{},
					createElement(
						PanelBody,
						{ title: __("FAQ Display", "db-faq-blocks"), initialOpen: true },
						createElement(RadioControl, {
							label: __("Front-end format", "db-faq-blocks"),
							help:
								outputFormat === "details"
									? __(
											"Renders each item as a collapsible details/summary element.",
											"db-faq-blocks",
										)
									: __(
											"Renders each question as an H3 and each answer as a paragraph.",
											"db-faq-blocks",
										),
							selected: outputFormat,
							options: [
								{
									label: __("Plain Text (H3 + P)", "db-faq-blocks"),
									value: "plain",
								},
								{
									label: __("Details/Summary", "db-faq-blocks"),
									value: "details",
								},
							],
							onChange: function (value) {
								props.setAttributes({ outputFormat: value });
							},
						}),
					),
				),
				createElement("div", innerBlocksProps),
			);
		},
		save: function () {
			return createElement( blockEditor.InnerBlocks.Content );
		},
	});
})(
	window.wp.blocks,
	window.wp.blockEditor,
	window.wp.components,
	window.wp.element,
	window.wp.i18n,
);
