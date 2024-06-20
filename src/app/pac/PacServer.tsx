import FuseSplashScreen from "@fuse/core/FuseSplashScreen";
import { useMemo, useState } from "react";

type PacServerProps = {
	children: React.ReactNode;
};

const PacServer = (props: PacServerProps) => {
	const { children } = props;
	/**
	 * isLoading
	 */
	const [isLoading, setIsLoading] = useState(false);

	return useMemo(
		() =>
			isLoading ? (
				<FuseSplashScreen />
			) : (
				<>
					{children}
				</>
			),
		[children, isLoading]
	);
}

export default PacServer;
