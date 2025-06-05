/**  @description: this javascript file contain generic functions.
 *  @Init_date:  01/03/2023
 *  @last_modify_date: 26/10/2023
 *  @last_Modify_By:  styves daudet
 */

// import { useAuthStore } from '@/composables/user'
import { CURRENCY_CODE } from './commonCurrency';

// const authStore = useAuthStore();
// const storeUser = authStore.getUser;
/*
import axios from "axios";

export function convertSecondsToTime(seconds) {

  // Calculate minutes
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Check if conversion to hours is necessary
  if (minutes < 60) {
    return `${minutes} min`;
  }

  // Calculate hours and remaining minutes
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}h ${remainingMinutes} min`;
}
*/
export const formatDateT = (dt) => {
  const date = new Date(dt);

  if (isNaN(date.getTime())) {
    return 'Date invalide';
  }

  const pad = (n:number) => (n < 10 ? '0' + n : n);

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const getCurrencyDefault = () => {
  return (storeUser.user && storeUser.user.currencyCode) ? storeUser.user.currencyCode : 'eur';
}
export const getCurrencySymbolDefault = () => {
  return CURRENCY_CODE["eur".toUpperCase() as keyof typeof CURRENCY_CODE].symbol;
}
export async function handleResponse(response:any) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = err;
    throw new Error(errorMessage as string);
  }
}

export function isTemporaryEmail(email:string) {
  const temporaryDomains = [
    "mailinator.com",
    "tempmail.com",
    "10minutemail.com",
    "guerrillamail.com",
    "yopmail.com",
    "discard.email",
    "trashmail.com",
    "fakeinbox.com",
    "emailondeck.com",
    "getnada.com"
  ];

  const domain = email.split('@')[1]?.toLowerCase();

  return temporaryDomains.some(tempDomain => domain.endsWith(tempDomain));
}

export function paginateList<T>(list: T[], pageSize: number): T[][] {
  if (!Array.isArray(list)) return []

  const paginated: T[][] = []
  for (let i = 0; i < list.length; i += pageSize) {
    paginated.push(list.slice(i, i + pageSize))
  }
  return paginated
}
