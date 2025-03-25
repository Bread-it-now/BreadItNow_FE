import authHandler from './handlers/auth';
import ownerHandler from './handlers/owner';

export const handlers = [...authHandler, ...ownerHandler];
