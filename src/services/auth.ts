//-Path: "vite-extra-react-ssr-ts/src/services/auth.ts"
import serverRest from './axios';
import type { User } from '$/types/auth';

export const authAPI = {
    auth: () => serverRest.get<User | null>('/user/auth'),
    logout: () => serverRest.get('/user/auth/logout'),
};
