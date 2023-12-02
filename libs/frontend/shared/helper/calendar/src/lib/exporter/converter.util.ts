import { ClassScheduler } from '@campuscalendar/shared/api-interfaces';
import { ICalCalendar, ICalEventData } from 'ical-generator';

export default function convertToICal(calendarData: ClassScheduler): string {
  const icalCalendar = new ICalCalendar({ name: calendarData.name });
  calendarData.calendar.subjectEvents.forEach((event) => {
    // Combine date and time into a full date-time object
    const startDateTime = combineDateAndTime(event.date, event.startTime);
    const endDateTime = combineDateAndTime(event.date, event.endTime);

    const eventAttributes: ICalEventData = {
      start: startDateTime,
      end: endDateTime,
      summary: event.subject.name,
      description: `Class Year: ${calendarData.classYearName}`,
    };
    icalCalendar.createEvent(eventAttributes);
  });

  return icalCalendar.toString();
}

// Helper function to combine a date object with a time string
function combineDateAndTime(date: Date, time: string) {
  const timeParts = time.split(':');
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);

  const combinedDateTime = new Date(date);
  combinedDateTime.setHours(hours, minutes, 0, 0); // Set hours, minutes, seconds, milliseconds

  return combinedDateTime;
}
