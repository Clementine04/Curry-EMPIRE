export const RESTAURANT_PHONE = "+63 917 173 1344"
export const CURRY_MESSENGER_URL = "https://www.messenger.com/t/100416421730770"

export function phoneHref(phone = RESTAURANT_PHONE) {
  return `tel:${normalizePhone(phone)}`
}

export function smsHref(message: string, phone = RESTAURANT_PHONE) {
  return `sms:${normalizePhone(phone)}?&body=${encodeURIComponent(message)}`
}

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "")
  return digits.startsWith("63") ? `+${digits}` : phone.replace(/\s/g, "")
}
