import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const initialFormValues = {
  vehicleType: null,
  vehicle: null,
  reservationId: crypto.randomUUID().slice(0, 8),
  hasDamage: false,
  hasInsurance: false,
  pickupDate: "",
  returnDate: "",
  duration: "",
  discount: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  hasTax: false,
};

export function formatDuration(pickupDate, returnDate) {
  const msInMinute = 60 * 1000;
  const msInHour = 60 * msInMinute;
  const msInDay = 24 * msInHour;
  const msInWeek = 7 * msInDay;

  const start = new Date(pickupDate);
  const end = new Date(returnDate);

  let duration = end - start;

  const weeks = Math.floor(duration / msInWeek);
  duration -= weeks * msInWeek;

  const days = Math.floor(duration / msInDay);
  duration -= days * msInDay;

  const hours = Math.floor(duration / msInHour);
  duration -= hours * msInHour;

  const minutes = Math.floor(duration / msInMinute);

  let result = [];
  if (weeks > 0) result.push(`${weeks} week${weeks > 1 ? "s" : ""}`);
  if (days > 0) result.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours > 0) result.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes > 0) result.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);

  return {
    weeks,
    days,
    hours,
    minutes,
    formatted: result.join(", ") || "0 minutes",
  };
}
