import { useEffect, useState } from 'react';

const DATE_UNITS = [
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1],
];

const getDateDiffs = (timestamp) => {
    const now = Date.now();
    const elapsed = (Number(timestamp) - now) / 1000; // Convert timestamp to number

    if (!Number.isFinite(elapsed)) {
        return { value: 0, unit: 'second' };
    }

    for (const [unit, secondsInUnit] of DATE_UNITS) {
        if (Math.abs(elapsed) > secondsInUnit || unit === 'second') {
            const value = Math.floor(elapsed / secondsInUnit);
            return { value, unit };
        }
    }
};

export default function useTimeAgo(timestamp) {
    const [timeago, setTimeago] = useState(() => getDateDiffs(timestamp));
 // Set initial state to the result of getDateDiffs(timestamp)
    // const { value, unit } = getDateDiffs(timestamp);
    
    useEffect(() => {
        const interval = setInterval(() => {
            const newTimeAgo = getDateDiffs(timestamp);
            setTimeago(newTimeAgo);
        }, 60000);
        
        return () => clearInterval(interval);
        
    }, [timestamp])
    const rtf = new Intl.RelativeTimeFormat('es', { style: 'short' });
    const { value, unit } = timeago
    return rtf.format(value, unit);
}