import { ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { selectFuseCurrentLayoutConfig, selectNavbarTheme } from '@fuse/core/FuseSettings/fuseSettingsSlice';
import { LayoutConfigDefaultsType } from 'app/theme-layouts/layout/LayoutConfig';
import NavbarToggleFabLayout from 'app/theme-layouts/layout/components/NavbarToggleFabLayout';
import { useLocation } from 'react-router';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { navbarCloseMobile, selectFuseNavbar } from 'app/theme-layouts/shared-components/navbar/navbarSlice';
import NavbarStyle from './navbar/style/NavbarStyle';

/**
 * The navbar wrapper layout.
 */
function NavbarWrapperLayout() {
	const config = useAppSelector(selectFuseCurrentLayoutConfig) as LayoutConfigDefaultsType;
	const navbar = useAppSelector(selectFuseNavbar);
	const location = useLocation();
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const { pathname } = location;
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (isMobile) {
			dispatch(navbarCloseMobile());
		}
	}, [pathname, isMobile]);

	const navbarTheme = useAppSelector(selectNavbarTheme);

	return (
		<>
			<ThemeProvider theme={navbarTheme}>
				<>
					<NavbarStyle />
				</>
			</ThemeProvider>
			{config.navbar.display && !config.toolbar.display && !navbar.open && <NavbarToggleFabLayout />}
		</>
	);
}

export default NavbarWrapperLayout;
