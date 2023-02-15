export const HOUR_FORMAT_OPTIONS = ['12 hour', '24 hour'];
export const DAY_FORMAT_OPTIONS = ['Short (Mon)', 'Long (Monday)', "Don't show day"];
export const MONTH_FORMAT_OPTIONS = ['Short (Jan)', 'Long (January)'];
export const YEAR_FORMAT_OPTIONS = ['Short (23)', 'Long (2023)', "Don't show year"];

// introduction
export const DEFAULT_ENABLE_INTRODUCTION = true;
export const DEFAULT_ENABLE_GREETING = false;

// time
export const DEFAULT_ENABLE_TIME = true;
export const DEFAULT_SHOW_SECONDS = false;
export const DEFAULT_HOUR_FORMAT = HOUR_FORMAT_OPTIONS[0];

// date
export const DEFAULT_ENABLE_DATE = true;
export const DEFAULT_DAY_FORMAT = DAY_FORMAT_OPTIONS[0];
export const DEFAULT_MONTH_FORMAT = MONTH_FORMAT_OPTIONS[0];
export const DEFAULT_YEAR_FORMAT = YEAR_FORMAT_OPTIONS[1];

// search
export const DEFAULT_ENABLE_SEARCH = true;

// rows
export const DEFAULT_ROWS: string[] = [];

export function getSetting<T>(name: string, defaultValue: T): T {
	if (typeof window === 'undefined') return defaultValue;

	const value = localStorage.getItem(name);
	console.log('reading', name, '=', value);
	return value ? JSON.parse(value) : defaultValue;
}

export function setSetting<T>(name: string, value: T) {
	if (typeof window === 'undefined') return;

	localStorage.setItem(name, JSON.stringify(value));
}
