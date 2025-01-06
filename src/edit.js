import { v4 as uuid } from 'uuid'
import { TextControl, Flex, FlexBlock, FlexItem, Button, Icon, PanelBody, PanelRow, ColorPicker } from "@wordpress/components"
import { InspectorControls, BlockControls, AlignmentToolbar, useBlockProps } from "@wordpress/block-editor"
import { ChromePicker } from "react-color"

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {Element} Element to render.
 */
export default function Edit(props) {
	// const blockProps = useBlockProps();

	const blockProps = useBlockProps({
		className: "posts-quiz-edit-block",
		style: { backgroundColor: props.attributes.bgColor }
	})

	function updateQuestion(value) {
		props.setAttributes({ question: value })
	}

	function deleteAnswer(indexToDelete) {
		const newAnswers = props.attributes.answers.filter((answer) => {
			const isIdMatched = answer.id == indexToDelete
			return !isIdMatched
		})
		props.setAttributes({ answers: newAnswers })

		if (indexToDelete === props.attributes.correctAnswer) {
			props.setAttributes({ correctAnswer: null })
		}
	}

	function markAsCorrect(index) {
		props.setAttributes({ correctAnswer: String(index) })
	}

	const { question } = props.attributes;

	return (
		<div {...blockProps} >
			<BlockControls>
				<AlignmentToolbar value={props.attributes.theAlign} onChange={value => props.setAttributes({ theAlign: value })} />
			</BlockControls>
			<InspectorControls>
				<PanelBody title="Background Color" initialOpen={true}>
					<PanelRow>
						<ChromePicker color={props.attributes.bgColor} onChangeComplete={
							color => props.setAttributes({ bgColor: color.hex })
						} disableAlpha={true} />
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<TextControl label="Question:" value={props.attributes.question} onChange={updateQuestion} style={{ fontSize: "30px", backgroundColor: "white" }} />
			<p style={{ fontSize: "13px", margin: "20px 0 8px 0" }}>Answer: </p>
			{
				props.attributes.answers.map((answer, index) => {
					const isCorrectAnswer = props.attributes.correctAnswer === answer.id
					return (
						<Flex key={answer.id}>
							<FlexBlock>
								<TextControl value={answer.name} autoFocus={answer.name === null} style={{ backgroundColor: "white" }} onChange={newValue => {
									const newAnswers = props.attributes.answers.concat([])
									newAnswers[index] = { id: answer.id, name: newValue }
									props.setAttributes({ answers: newAnswers })
								}} />
							</FlexBlock>
							<FlexItem>
								<Button onClick={() => markAsCorrect(answer.id)}>
									<Icon icon={isCorrectAnswer ? "star-filled" : "star-empty"} className="star-icon" />
								</Button>
							</FlexItem>
							<FlexItem>
								<Button variant="link" className="delete-button" onClick={
									() => deleteAnswer(answer.id)
								}>Delete</Button>
							</FlexItem>
						</Flex>
					)
				})
			}
			<Button variant="primary" onClick={() => {
				props.setAttributes({
					answers: props.attributes.answers.concat([{ id: uuid(), name: null }])
				})
			}}>Add Another Answer</Button>
		</div >
	)

}
