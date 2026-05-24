// -Path: 'Vite-Extra-React-SSR-TypeScript/src/types/auth.ts'

export interface User {
    userId: string;
    googleId?: string;
    name?: string;
    email?: string;
    picture?: string;
    role?: string;
    lastLoginAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
