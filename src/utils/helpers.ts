export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
}

export function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr));
}

export function calcMinutesLeft(dateStr: string) {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / 60000);
}

export type FormErrors = {
  phone: string;
  customer: string;
  address: string;
};

export function isFormError(
  error: FormErrors | Response | unknown
): error is FormErrors {
  return (error as FormErrors)?.phone !== undefined;
}

export function isGeoError(
  getGeoPositionResult: GeolocationPosition | GeolocationPositionError
): getGeoPositionResult is GeolocationPositionError {
  return (
    (getGeoPositionResult as GeolocationPositionError)?.POSITION_UNAVAILABLE !==
      undefined ||
    (getGeoPositionResult as GeolocationPositionError)?.PERMISSION_DENIED !==
      undefined
  );
}
