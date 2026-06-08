const isDev = import.meta.env.DEV;

class Logger {
    constructor() {
        this.logs = [];
        this.maxLogs = 1000;

        // Can be useful to load persisted logs from localStorage if desired
        // const saved = localStorage.getItem('app_logs');
        // if (saved) this.logs = JSON.parse(saved);
    }

    _log(level, message, data) {
        const entry = {
            id: Date.now() + Math.random().toString(36).substring(7),
            timestamp: new Date().toISOString(),
            level,
            message,
            data: data ? JSON.stringify(data) : null
        };

        this.logs.unshift(entry); // Add to beginning (newest first)

        // Keep only last N logs in memory
        if (this.logs.length > this.maxLogs) {
            this.logs.pop();
        }

        // In a real app, you could also persist here or send to backend API
        // localStorage.setItem('app_logs', JSON.stringify(this.logs));

        if (isDev) {
            const styles = {
                INFO: 'color: #3b82f6; font-weight: bold;',
                WARN: 'color: #eab308; font-weight: bold;',
                ERROR: 'color: #ef4444; font-weight: bold;',
                DEBUG: 'color: #8b5cf6; font-weight: bold;'
            };

            // Map our log levels to standard console methods
            const consoleMethod = level.toLowerCase() === 'debug' ? 'log' : level.toLowerCase();
            if (consoleMethod === 'error') {
                console.error(`%c[${level}] ${entry.timestamp}`, styles[level], message, data || '');
            } else if (consoleMethod === 'warn') {
                console.warn(`%c[${level}] ${entry.timestamp}`, styles[level], message, data || '');
            } else {
                console.log(`%c[${level}] ${entry.timestamp}`, styles[level], message, data || '');
            }
        }
    }

    info(message, data) { this._log('INFO', message, data); }
    warn(message, data) { this._log('WARN', message, data); }
    error(message, error) { this._log('ERROR', message, error); }
    debug(message, data) { this._log('DEBUG', message, data); }

    getLogs() {
        return [...this.logs];
    }

    clearLogs() {
        this.logs = [];
    }
}

export const logger = new Logger();

// Optionally, intercept unhandled errors to log them automatically
window.addEventListener("error", (event) => {
    logger.error("Unhandled Error", { message: event.message, filename: event.filename, lineno: event.lineno });
});

window.addEventListener("unhandledrejection", (event) => {
    logger.error("Unhandled Promise Rejection", { reason: event.reason });
});

export default logger;
