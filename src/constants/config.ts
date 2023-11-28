const PROCESS_ENV = import.meta.env;

export const ENV = PROCESS_ENV.VITE_ENV || "DEV";

export const API_URL = PROCESS_ENV.VITE_API_URL || null;
if (!API_URL) throw new Error("`API_URL` can't be left blank");

export const API_SUFFIX = PROCESS_ENV.VITE_API_SUFFIX || "";
export const API_TIMEOUT = parseInt(PROCESS_ENV.VITE_API_URL) || 10000; // 10 secs

// Building json object for easier export
const CONFIG = { ENV, API_URL, API_SUFFIX, API_TIMEOUT };

export default CONFIG;