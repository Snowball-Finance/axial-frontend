export const adjustValues = (values: number[]) => {
  // 1. Separate integer and decimal part
  // 2. Store both in a new array of objects sorted by decimal part descending
  // 3. Add in original position to "put back" at the end
  const flooredAndSortedByDecimal = values
    .map((value, position) => ({
      floored: Math.floor(value),
      decimal: value - Number.parseInt(value + ""),
      position,
    }))
    .sort(({ decimal }, { decimal: otherDecimal }) => otherDecimal - decimal);

  const roundedTotal = values.reduce(
    (total, value) => total + Math.floor(value),
    0
  );
  let availableForDistribution = 100 - roundedTotal;

  // Add 1 to each value from what's available
  const adjustedValues = flooredAndSortedByDecimal.map((value) => {
    const { floored, ...rest } = value;
    let finalPercentage = floored;
    if (availableForDistribution > 0) {
      finalPercentage = floored + 1;
      availableForDistribution--;
    }

    return {
      finalPercentage,
      ...rest,
    };
  });

  // Put back and return the new values
  return adjustedValues
    .sort(
      ({ position }, { position: otherPosition }) => position - otherPosition
    )
    .map(({ finalPercentage }) => finalPercentage);
};
