import { styled } from '@mui/material/styles';
import FuseMessage from '@fuse/core/FuseMessage';
import AppContext from 'app/AppContext';
import { lazy, memo, ReactNode, Suspense, useContext } from 'react';
import { useRoutes } from 'react-router-dom';
import { selectFuseCurrentLayoutConfig } from '@fuse/core/FuseSettings/fuseSettingsSlice';
import { LayoutConfigDefaultsType } from 'app/theme-layouts/layout/LayoutConfig';
import Configurator from 'app/theme-layouts/shared-components/configurator/Configurator';
import FuseSuspense from '@fuse/core/FuseSuspense';
import { useAppSelector } from 'app/store/hooks';
import FooterLayout from './components/FooterLayout';
import LeftSideLayout from './components/LeftSideLayout';
import NavbarWrapperLayout from './components/NavbarWrapperLayout';
import RightSideLayout from './components/RightSideLayout';
import ToolbarLayout from './components/ToolbarLayout';

const FuseDialog = lazy(() => import('@fuse/core/FuseDialog/FuseDialog'));

const Root = styled('div')(({ config }: { config: LayoutConfigDefaultsType }) => ({
	...(config.mode === 'boxed' && {
		clipPath: 'inset(0)',
		maxWidth: `${config.containerWidth}px`,
		margin: '0 auto',
		boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
	}),
	...(config.mode === 'container' && {
		'& .container': {
			maxWidth: `${config.containerWidth}px`,
			width: '100%',
			margin: '0 auto'
		}
	})
}));

type LayoutProps = {
	children?: ReactNode;
};

/**
 * The main layout.
 */
function Layout(props: LayoutProps) {
	const { children } = props;
	const config = useAppSelector(selectFuseCurrentLayoutConfig) as LayoutConfigDefaultsType;
	const appContext = useContext(AppContext);
	const { routes } = appContext;

	return (
		<Root
			id="fuse-layout"
			config={config}
			className="flex w-full"
		>
			{config.leftSidePanel.display && <LeftSideLayout />}

			<div className="flex min-w-0 flex-auto">
				{config.navbar.display && config.navbar.position === 'left' && <NavbarWrapperLayout />}

				<main
					id="fuse-main"
					className="relative z-10 flex min-h-full min-w-0 flex-auto flex-col"
				>
					{config.toolbar.display && (
						<ToolbarLayout className={config.toolbar.style === 'fixed' ? 'sticky top-0' : ''} />
					)}

					<div className="relative z-10 flex min-h-0 flex-auto flex-col">
						<FuseSuspense>{useRoutes(routes)}</FuseSuspense>

						<Suspense>
							<FuseDialog />
						</Suspense>
						{children}
					</div>

					{config.footer.display && (
						<FooterLayout className={config.footer.style === 'fixed' ? 'sticky bottom-0' : ''} />
					)}
				</main>

				{config.navbar.display && config.navbar.position === 'right' && <NavbarWrapperLayout />}
			</div>

			{config.rightSidePanel.display && <RightSideLayout />}
			<FuseMessage />
		</Root>
	);
}

export default memo(Layout);
