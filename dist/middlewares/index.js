"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = exports.isSuperAdmin = exports.isAdmin = exports.checkRole = void 0;
const userServices_1 = require("../services/userServices");
const checkRole = (requiredRole) => (req, res, next) => {
    const authToken = req.headers["authorization"]?.split(" ")[1];
    const cookieToken = req?.cookies?.token;
    let token;
    if (authToken) {
        token = authToken;
    }
    else {
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
        const decoded = (0, userServices_1.verifyJWT)(token);
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
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.checkRole = checkRole;
exports.isAdmin = (0, exports.checkRole)("Admin");
exports.isSuperAdmin = (0, exports.checkRole)("SuperAdmin");
exports.isUser = (0, exports.checkRole)("User");
