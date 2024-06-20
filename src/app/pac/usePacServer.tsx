import { useContext } from 'react';
import { PactServerContext, PactServerContextType } from './PacServerProvider';
import { PacServerType } from './PacServerTypes';

interface PacProvider {
	getPacs: () => PacServerType[];
	getSelectedPac: () => PacServerType;
}

type PacProviders = {
	[key: string]: PacProvider;
};

const usePacServer = (): PactServerContextType & { getPacs: () => PacServerType[], getSelectedPac: () => PacServerType } => {
	const context = useContext(PactServerContext);
	
	if (!context) {
		throw new Error('useAuth must be used within a AuthRouteProvider');
	}

	const getPacs = () => {
		return context.getPacServerProviderList();
	}

	const getSelectedPac = () => {
		return context.getPacServerProvider();
	}

	return { ...context, getPacs, getSelectedPac };
}

export default usePacServer;
