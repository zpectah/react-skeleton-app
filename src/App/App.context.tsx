import React, { createContext } from 'react';

const BaseContext = createContext(null);

interface ProviderProps {
	data: object;
}

interface ContextProps {}

export const Provider: React.FC<{} & ContextProps> = (props) => {
	const ProviderData: ProviderProps = {
		data: {
			some: 'value',
		},
	};

	return (
		<BaseContext.Provider value={ProviderData}>
			<>
				{props.children}
			</>
		</BaseContext.Provider>
	);
};

export const Consumer = BaseContext.Consumer;
