import { useTimeout } from '@fuse/hooks';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import i18next from 'i18next';
import en from './i18n/en';
import es from './i18n/es';
import { useTranslation } from 'react-i18next';

export type FuseLoadingProps = {
	delay?: number;
	className?: string;
};

i18next.addResourceBundle('en', 'loading', en);
i18next.addResourceBundle('es', 'loading', es);

/**
 * FuseLoading displays a loading state with an optional delay
 */
function FuseLoading(props: FuseLoadingProps) {
	const { t } = useTranslation('loading');
	const { delay = 0, className } = props;
	const [showLoading, setShowLoading] = useState(!delay);

	useTimeout(() => {
		setShowLoading(true);
	}, delay);

	return (
		<div
			className={clsx(
				className,
				'flex flex-1 h-full w-full self-center flex-col items-center justify-center p-24',
				!showLoading ? 'hidden' : ''
			)}
		>
			<Typography
				className="-mb-16 text-13 font-medium sm:text-20"
				color="text.secondary"
			>
				{t('LOADING')}
			</Typography>
			<Box
				id="spinner"
				sx={{
					'& > div': {
						backgroundColor: 'palette.secondary.main'
					}
				}}
			>
				<div className="bounce1" />
				<div className="bounce2" />
				<div className="bounce3" />
			</Box>
		</div>
	);
}

export default FuseLoading;
