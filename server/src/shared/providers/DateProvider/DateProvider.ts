import { format as formatTZ, utcToZonedTime } from 'date-fns-tz';
import { IDateProvider } from './IDateProvider';

export class DateProvider implements IDateProvider {
    rangeDate(startDate: Date, endDate: Date): Date[] {
        const date = new Date(startDate.getTime());

        const dates = [];

        while (date <= endDate) {
            dates.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        return dates;
    }
    dateUTC(date: Date, formatStr: string) {
        const zoned = utcToZonedTime(date, 'UTC');
        return formatTZ(zoned, formatStr, { timeZone: 'utc' });
    }

    isoText(date: Date) {
        return this.dateUTC(date, 'yyyy-MM-dd');
    }
}
