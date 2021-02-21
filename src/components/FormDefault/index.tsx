import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Row, Col, Input, Button } from 'antd';

interface FormDefaultProps {
	className?: string | Array<string>;
}

const FormDefault: React.FC<{} & FormDefaultProps> = (props) => {
	const { className } = props;
	const { register, handleSubmit, watch, errors, control } = useForm({
		defaultValues: {
			inputText: '',
		},
	});
	const onSubmit = (data) => console.log(data);

	return (
		<form
			className={['FormDefault', className].join(' ')}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Row>
				<Col span={12}>
					<label>Input text</label>
				</Col>
				<Col span={12}>
					<Controller
						name="inputText"
						control={control}
						rules={{ required: true }}
						render={({ onChange, value }) => (
							<Input onChange={onChange} value={value} />
						)}
					/>
					{errors.inputText && <span>This field is required</span>}
				</Col>
			</Row>

			<br />

			<button type="submit" className="ant-btn">
				Submit
			</button>
		</form>
	);
};

export default FormDefault;
