import authHandler from './handlers/auth';
import ownerHandler from './handlers/owner';
import customerHandler from './handlers/customer';

export const handlers = [...authHandler, ...ownerHandler, ...customerHandler];
