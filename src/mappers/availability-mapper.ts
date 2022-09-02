import { AvailabilityData } from '../models/AvailabilityData'
import { Availability } from '../types'

export function mapToAvailability(
  data: AvailabilityData,
  id: string
): Availability {
  const { date, fromTime, untilTime, ...rest } = data;

  return {
    id,
    date: date.toDate(),
    fromTime: fromTime?.toDate(),
    untilTime: untilTime?.toDate(),
    ...rest,
  };
}
