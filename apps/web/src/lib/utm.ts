export type UTMAttribution = {
  source?: string;
  medium?: string;
  campaign?: string;
};

const ALLOWED_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;
const MAX_VALUE_LENGTH = 100;

/** Extract only the approved UTM fields; this helper does not persist or transmit them. */
export function readUtmAttribution(search: string): UTMAttribution {
  const params = new URLSearchParams(search);
  const values = ALLOWED_KEYS.map((key) => {
    const value = params.get(key)?.trim().slice(0, MAX_VALUE_LENGTH);
    return value && !/[\u0000-\u001f\u007f]/.test(value) ? value : undefined;
  });

  return {
    ...(values[0] ? { source: values[0] } : {}),
    ...(values[1] ? { medium: values[1] } : {}),
    ...(values[2] ? { campaign: values[2] } : {}),
  };
}
