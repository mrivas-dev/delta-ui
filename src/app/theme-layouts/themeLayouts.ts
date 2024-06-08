import React, { ComponentType } from 'react';
import Layout from './layout/Layout';

/**
 * The type definition for the theme layouts.
 */
export type themeLayoutsType = {
	[key: string]: ComponentType<{ children?: React.ReactNode }>;
};

/**
 * The theme layouts.
 */
const themeLayouts: themeLayoutsType = {
	layout: Layout
};

export default themeLayouts;
