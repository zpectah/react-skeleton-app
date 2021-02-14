import React from 'react';

interface SectionProps {
	className?: string | Array<string>;
	title?: string;
}

const Section: React.FC<{} & SectionProps> = (props) => {
	const { className, children, title } = props;

	return (
		<section className={['Section', className].join(' ')}>
			{title && (
				<div className="Section-heading">
					<h3 className="title title--section">{title}</h3>
				</div>
			)}
			<div className="Section-content">{children}</div>
		</section>
	);
};

export default Section;
