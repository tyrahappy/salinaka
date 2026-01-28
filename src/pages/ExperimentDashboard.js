import React, { useCallback, useEffect, useMemo, useState } from "react";
import { clearStoredEvents, getStoredEvents } from "../analytics/track";

const summarizeEvents = (events, experimentId) => {
  const summary = {};

  events
    .filter((event) => event.experimentId === experimentId)
    .forEach((event) => {
      const variant = event.variant || "unknown";
      if (!summary[variant]) {
        summary[variant] = { views: 0, clicks: 0 };
      }
      if (event.event === "experiment_exposed") {
        summary[variant].views += 1;
      }
      if (event.event === "add_to_cart") {
        summary[variant].clicks += 1;
      }
    });

  return summary;
};

const formatPercent = (value) => `${(value * 100).toFixed(1)}%`;

const ExperimentDashboard = () => {
  const [events, setEvents] = useState(() => getStoredEvents());
  const [remoteStats, setRemoteStats] = useState(null);
  const [isRemote, setIsRemote] = useState(false);
  const experimentId = "add_to_cart_button_color";
  const apiUrl = process.env.REACT_APP_AB_API_URL;
  const summary = useMemo(
    () => summarizeEvents(events, experimentId),
    [events]
  );

  const handleRefresh = useCallback(() => {
    setEvents(getStoredEvents());
    if (apiUrl) {
      fetch(`${apiUrl}/stats?experimentId=${experimentId}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.variants) {
            setRemoteStats(data.variants);
            setIsRemote(true);
          }
        })
        .catch(() => {});
    }
  }, [apiUrl, experimentId]);

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);
  const handleClear = () => {
    clearStoredEvents();
    setIsRemote(false);
    setRemoteStats(null);
    handleRefresh();
  };

  const variants = Object.entries(isRemote ? remoteStats || {} : summary);

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Experiment Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Local A/B results from tracked events.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Refresh
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-2 border rounded text-red-600 hover:bg-red-50"
            >
              Clear Data
            </button>
          </div>
        </div>

        <div className="bg-gray-50 border rounded-lg p-6 mb-6">
          <div className="text-sm text-gray-500">Experiment</div>
          <div className="text-lg font-semibold">{experimentId}</div>
          <div className="text-sm text-gray-500 mt-2">
            Data source: {isRemote ? "backend" : "local"}
          </div>
        </div>

        {variants.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            No events yet. Visit a product page and click Add To Basket to
            generate data.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {variants.map(([variant, data]) => {
              const ctr = data.views > 0 ? data.clicks / data.views : 0;
              return (
                <div key={variant} className="border rounded-lg p-6">
                  <div className="text-sm text-gray-500">Variant</div>
                  <div className="text-2xl font-bold mb-4">{variant}</div>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between">
                      <span>Views (exposed)</span>
                      <span className="font-semibold">{data.views}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Clicks (add to cart)</span>
                      <span className="font-semibold">{data.clicks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CTR</span>
                      <span className="font-semibold">{formatPercent(ctr)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperimentDashboard;
