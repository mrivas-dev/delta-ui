import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useGetPacServerQuery } from './PacServerApi';
import { useAppSelector } from 'app/store/hooks';
import { selectUser } from '../auth/user/store/userSlice';
import { PacServerType } from './PacServerTypes';

export type PactServerContextType = {
	getPacServerProviderList: () => PacServerType[];
	setPacServerProvider: (T: PacServerType) => void;
	getPacServerProvider: () => PacServerType | null;
	resetPacServerProvider: () => PacServerType | null;
	isPacServerProviderListLoading: boolean;
};

export const PactServerContext = createContext<PactServerContextType>({
	getPacServerProviderList: () => [],
	setPacServerProvider: () => { },
	getPacServerProvider: () => null,
	resetPacServerProvider: () => null,
	isPacServerProviderListLoading: false
});

const pacServerProviderLocalStorageKey = 'DeltaUIPacServerProvider';

type PacServerProviderProps = { children: React.ReactNode };

const PacServerProvider = (props: PacServerProviderProps) => {
	const { children } = props;
	const { user } = useAppSelector(selectUser);
	const { data: pacInfo, isLoading: isPacServerProviderListLoading } = useGetPacServerQuery(null, { skip: !user?.id });
	const [selectedServer, setSelectedServer] = useState<PacServerType | null>(null);

	const chosePac = (selectedPac: PacServerType): void => {
		setSelectedServer(selectedPac);
		localStorage.setItem(pacServerProviderLocalStorageKey, JSON.stringify(selectedPac));
	}

	useEffect(() => {
		if (pacInfo?.success && pacInfo?.pacs?.length && !selectedServer) {
			chosePac(pacInfo.pacs[0]);
		}
	}, [pacInfo]);


	/**
	 * Get pac server provider list
	 */
	const getPacServerProviderList = () => {
		return pacInfo?.pacs;
	};

	/**
	 * Get pac server provider
	 */
	const getPacServerProvider = () => {
		if (!selectedServer) {
			setSelectedServer(JSON.parse(localStorage.getItem(pacServerProviderLocalStorageKey)));
			return JSON.parse(localStorage.getItem(pacServerProviderLocalStorageKey));
		} else {
			return selectedServer
		}
	}

	/**
	 * Set pac server provider
	 */
	const setPacServerProvider = useCallback((pacProvider: any) => {
		if (pacProvider?.id) {
			chosePac(pacProvider);
		}
	}, []);

	/**
	 * Remove pac server provider
	 */
	const resetPacServerProvider = () => {
		localStorage.removeItem(pacServerProviderLocalStorageKey);
	};

	const contextValue = useMemo(
		() =>
			({
				getPacServerProviderList,
				getPacServerProvider,
				setPacServerProvider,
				resetPacServerProvider,
				isPacServerProviderListLoading
			}) as PactServerContextType,
		[
			getPacServerProviderList,
			getPacServerProvider,
			setPacServerProvider,
			resetPacServerProvider,
			isPacServerProviderListLoading
		]
	);

	return (
		<PactServerContext.Provider value={contextValue}>
			{children}
		</PactServerContext.Provider>
	);
}

export default PacServerProvider;
