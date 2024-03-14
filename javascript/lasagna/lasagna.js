// @ts-check
export const EXPECTED_MINUTES_IN_OVEN = 40;
export const PREPARATION_MINUTES_PER_LAYER = 2;

export const remainingMinutesInOven = (minutesInOven) => (EXPECTED_MINUTES_IN_OVEN - minutesInOven) ?? 0;
export const preparationTimeInMinutes = (numLayers) => numLayers * PREPARATION_MINUTES_PER_LAYER;
export const totalTimeInMinutes = (numLayers, actualMinutesInOven) => preparationTimeInMinutes(numLayers) + actualMinutesInOven;