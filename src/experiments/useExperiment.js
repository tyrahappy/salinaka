import { useEffect, useMemo } from "react";
import { experiments } from "./experiments";
import { trackEvent } from "../analytics/track";

const STORAGE_KEY = "ab_assignments_v1";

const readAssignments = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (error) {
    return {};
  }
};

const writeAssignments = (assignments) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments));
  } catch (error) {
    // Ignore write errors (e.g. private mode).
  }
};

const chooseVariant = (variants) => {
  const totalWeight = variants.reduce((sum, variant) => sum + variant.weight, 0);
  const roll = Math.random() * totalWeight;
  let cumulative = 0;

  for (const variant of variants) {
    cumulative += variant.weight;
    if (roll <= cumulative) {
      return variant.id;
    }
  }

  return variants[0]?.id;
};

const getAssignment = (experimentId, variants) => {
  const assignments = readAssignments();

  if (!assignments[experimentId]) {
    assignments[experimentId] = {
      variant: chooseVariant(variants),
      assignedAt: Date.now(),
    };
    writeAssignments(assignments);
  }

  return assignments[experimentId].variant;
};

const markExposed = (experimentId, variant) => {
  const key = `ab_exposed_${experimentId}_${variant}`;
  if (sessionStorage.getItem(key)) {
    return false;
  }
  sessionStorage.setItem(key, "1");
  return true;
};

export const useExperiment = (experimentKey) => {
  const config = experiments[experimentKey];
  if (!config) {
    throw new Error(`Unknown experiment: ${experimentKey}`);
  }

  const variant = useMemo(
    () => getAssignment(config.id, config.variants),
    [config.id, config.variants]
  );

  useEffect(() => {
    if (markExposed(config.id, variant)) {
      trackEvent("experiment_exposed", {
        experimentId: config.id,
        variant,
      });
    }
  }, [config.id, variant]);

  return {
    experimentId: config.id,
    variant,
    isVariant: (id) => variant === id,
  };
};
