import ThemeFormConfigTypes from '@fuse/core/FuseSettings/ThemeFormConfigTypes';
import layout, { LayoutConfigDefaultsType } from './layout/LayoutConfig';

/**
 * The type definition for the theme layout defaults.
 */
export type themeLayoutDefaultsProps = LayoutConfigDefaultsType;

/**
 * The type definition for the theme layout.
 */
export type themeLayoutProps = {
	title: string;
	defaults: themeLayoutDefaultsProps;
	form?: ThemeFormConfigTypes;
};

/**
 * The type definition for the theme layout configs.
 */
export type themeLayoutConfigsProps = {
	[key: string]: themeLayoutProps;
};

/**
 * The theme layout configs.
 */
const themeLayoutConfigs: themeLayoutConfigsProps = {
	layout: layout as themeLayoutProps
};

export default themeLayoutConfigs;
