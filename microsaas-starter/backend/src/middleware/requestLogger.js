// backend/src/middleware/requestLogger.js
import Log from "../models/logModel.js";

export const requestLogger = async (req, res, next) => {
    try {
        // lightweight: only log errors & warnings later; optionally save each request
        // store basic info: method, url, ip, user (if available)
        const data = {
            level: "info",
            message: `${req.method} ${req.originalUrl}`,
            meta: {
                ip: req.ip,
                user: req.user?.email || null,
            },
        };
        // Don't await to avoid slowdowns — fire and forget
        Log.create(data).catch(() => { });
    } catch (err) {
        // ignore
    } finally {
        next();
    }
};
