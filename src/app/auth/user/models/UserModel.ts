import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { User, UserDelta } from 'src/app/auth/user';

/**
 * Creates a new user object with the specified data.
 */
function UserModel(data: PartialDeep<UserDelta>): any {
	data = data || {};

	return _.defaults(data, {
		loginRedirectUrl: '/',
		user: {
			uid: '',
			role: null,
			name: 'Guest User',
			email: 'No email',
			shortcuts: [],
			settings: {}
		}
	});
}

export default UserModel;
