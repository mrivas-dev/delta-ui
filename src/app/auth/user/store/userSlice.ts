/* eslint import/no-extraneous-dependencies: off */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import settingsConfig from 'app/configs/settingsConfig';
import { User, UserDelta } from 'src/app/auth/user';
import { PartialDeep } from 'type-fest';
import _ from '@lodash';
import { RootState } from 'app/store/store';
import userModel from '../models/UserModel';

function updateRedirectUrl(user: PartialDeep<UserDelta>) {
	/*
    You can redirect the logged-in user to a specific route depending on his role
    */
	if (user?.loginRedirectUrl && user?.loginRedirectUrl !== '') {
		settingsConfig.loginRedirectUrl = user.loginRedirectUrl; // for example 'apps/academy'
	}
}

/**
 * Sets the user object in the Redux store.
 */
export const setUser = createAsyncThunk<UserDelta, UserDelta>('user/setUser', async (user) => {
	updateRedirectUrl(user);

	return user;
});

/**
 * Reset the user state.
 */
export const resetUser = createAsyncThunk('user/resetUser', async () => {
	return true;
});

/**
 * The initial state of the user slice.
 */
const initialState: UserDelta = userModel({});

/**
 * The User slice
 */
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		/**
		 * Updates the user's settings
		 */
		setUserShortcuts: (state, action) => {
			const oldState = _.cloneDeep(state);
			const newUser = _.setIn(oldState, 'shortcuts', action.payload) as UserDelta;

			if (_.isEqual(oldState, newUser)) {
				return undefined;
			}

			return newUser;
		},
		/**
		 * Updates the user's settings
		 */
		setUserSettings: (state, action) => {
			const oldState = _.cloneDeep(state);
			const newUser = _.setIn(oldState, 'settings', action.payload) as UserDelta;

			if (_.isEqual(oldState, newUser)) {
				return undefined;
			}

			return newUser;
		},
		/**
		 * Updates the user object in the Redux store.
		 */
		updateUser: (state, action) => {
			const oldState = _.cloneDeep(state);
			const user = action.payload as PartialDeep<UserDelta>;
			const newUser = _.merge({}, oldState, user);

			if (_.isEqual(oldState, newUser)) {
				return undefined;
			}

			return newUser as UserDelta;
		},
		userSignOut: () => initialState
	},
	extraReducers: (builder) => {
		builder.addCase(setUser.fulfilled, (state, action) => {
			const user = action.payload as PartialDeep<UserDelta>;
			const newUser = _.defaults(user, state);

			if (_.isEqual(state, newUser)) {
				return undefined;
			}

			return action.payload;
		});
		builder.addCase(resetUser.fulfilled, (state) => {
			if (!_.isEqual(state, initialState)) {
				return initialState;
			}

			return undefined;
		});
	}
});

export const { userSignOut, updateUser, setUserShortcuts, setUserSettings } = userSlice.actions;

export const selectUser = (state: RootState) => state?.user;

export const selectUserId = (state: RootState) => state?.user?.user?.uid;

export const selectUserRole = (state: RootState) => state?.user?.user?.role;

export const selectIsUserGuest = (state: RootState) => {
	const userRole = state?.user?.user?.role;

	return !userRole || userRole?.length === 0;
};

export const selectUserShortcuts = (state: RootState) => state.user?.shortcuts;

export const selectUserSettings = (state: RootState) => state.user?.settings;

export type userSliceType = typeof userSlice;

export default userSlice.reducer;
