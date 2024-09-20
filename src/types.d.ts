declare namespace Express {
    export interface User {
        id: string;
        name: string;
        email: string;
        role: string;
    }

    export interface Request {
        user?: User;
    }
}
