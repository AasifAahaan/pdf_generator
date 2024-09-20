import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../services/userServices";

interface AuthenticatedRequest extends Request {
    user?: any;
}

export const checkRole = (requiredRole: string) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authToken = req.headers["authorization"]?.split(" ")[1];
    const cookieToken = req?.cookies?.token;
    let token;
    if (authToken) {
        token = authToken;
    } else {
        token = cookieToken;
    }

    console.log("Token", { token });

    if (!token) {
        return res.status(403).json({
            error: {
                code: 'FORBIDDEN_ACCESS',
                message: 'Sorry, you do not have the necessary permissions to perform this action.',
                details: 'Please contact your administrator for assistance.',
            }
        });
    }

    try {
        const decoded = verifyJWT(token);
        console.log({ decoded });
        if (!decoded || !decoded.user || decoded.user.role !== requiredRole) {
            return res.status(403).json({
                error: {
                    code: 'FORBIDDEN_ACCESS',
                    message: 'Sorry, you do not have the necessary permissions to perform this action.',
                    details: 'Please contact your administrator for assistance.',
                }
            });
        }
        req.user = decoded.user;
        next();
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const isAdmin = checkRole("Admin");
export const isSuperAdmin = checkRole("SuperAdmin");
export const isUser = checkRole("User");