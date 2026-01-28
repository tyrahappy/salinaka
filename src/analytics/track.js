const EVENT_STORAGE_KEY = "ab_events_v1";
const MAX_STORED_EVENTS = 1000;
const API_URL = process.env.REACT_APP_AB_API_URL;

const defaultContext = () => ({
  url: window.location.pathname,
  referrer: document.referrer || "",
});

const readStoredEvents = () => {
  try {
    return JSON.parse(localStorage.getItem(EVENT_STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
};

const writeStoredEvents = (events) => {
  try {
    localStorage.setItem(EVENT_STORAGE_KEY, JSON.stringify(events));
  } catch (error) {
    // Ignore write errors (e.g. private mode).
  }
};

const hasExposure = (events, experimentId, variant) =>
  events.some(
    (event) =>
      event.event === "experiment_exposed" &&
      event.experimentId === experimentId &&
      event.variant === variant
  );

const storeEvent = (payload) => {
  const events = readStoredEvents();
  if (
    payload.event === "add_to_cart" &&
    payload.experimentId &&
    payload.variant &&
    !hasExposure(events, payload.experimentId, payload.variant)
  ) {
    events.push({
      event: "experiment_exposed",
      ...defaultContext(),
      experimentId: payload.experimentId,
      variant: payload.variant,
      timestamp: payload.timestamp,
    });
  }
  events.push(payload);
  if (events.length > MAX_STORED_EVENTS) {
    events.splice(0, events.length - MAX_STORED_EVENTS);
  }
  writeStoredEvents(events);
};

export const trackEvent = (name, properties = {}) => {
  const payload = {
    event: name,
    ...defaultContext(),
    ...properties,
    timestamp: Date.now(),
  };

  if (typeof window !== "undefined" && window.localStorage) {
    storeEvent(payload);
  }

  if (API_URL) {
    fetch(`${API_URL}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        experimentId: payload.experimentId,
        variant: payload.variant,
        event: payload.event,
        timestamp: payload.timestamp,
        url: payload.url,
        referrer: payload.referrer,
      }),
      keepalive: true,
    }).catch(() => {});
  }

  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, properties);
  } else if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("[trackEvent]", payload);
  }
};

export const getStoredEvents = () => readStoredEvents();

export const clearStoredEvents = () => {
  try {
    localStorage.removeItem(EVENT_STORAGE_KEY);
  } catch (error) {
    // Ignore remove errors.
  }
};
