export const gameSegments = {
  bodyVertical: [
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
  ],
  bodyVerticalWithFood: [
    [0, 1, 1, 0],
    [1, 0, 1, 1],
    [1, 1, 0, 1],
    [0, 1, 1, 0],
  ],
  bodyHorizontal: [
    [0, 0, 0, 0],
    [1, 1, 0, 1],
    [1, 0, 1, 1],
    [0, 0, 0, 0],
  ],
  bodyHorizontalWithFood: [
    [0, 1, 1, 0],
    [1, 1, 0, 1],
    [1, 0, 1, 1],
    [0, 1, 1, 0],
  ],
  tailLeft: [
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ],
  tailRight: [
    [0, 0, 0, 0],
    [0, 0, 1, 1],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ],
  tailUp: [
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ],
  tailDown: [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
  ],
  headLeft: [
    [0, 0, 1, 0],
    [1, 1, 0, 1],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ],
  headLeftFood: [
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [0, 1, 1, 1],
    [1, 0, 0, 0],
  ],
  headRight: [
    [0, 1, 0, 0],
    [1, 0, 1, 1],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ],
  headRightFood: [
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 1],
  ],
  headUp: [
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [1, 0, 1, 0],
    [0, 1, 1, 0],
  ],
  headUpFood: [
    [1, 0, 0, 1],
    [0, 1, 1, 0],
    [1, 0, 1, 0],
    [0, 1, 1, 0],
  ],
  headDown: [
    [0, 1, 1, 0],
    [1, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
  ],
  headDownFood: [
    [0, 1, 1, 0],
    [1, 0, 1, 0],
    [0, 1, 1, 0],
    [1, 0, 0, 1],
  ],
  turnBottomRight: [
    [0, 1, 1, 0],
    [1, 0, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
  ],
  turnBottomRightWithFood: [
    [1, 1, 1, 0],
    [1, 0, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
  ],
  turnTopRight: [
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [1, 0, 1, 0],
    [0, 1, 1, 0],
  ],
  turnTopRightWithFood: [
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [1, 0, 1, 0],
    [1, 1, 1, 0],
  ],
  turnBottomLeft: [
    [0, 1, 1, 0],
    [0, 1, 0, 1],
    [0, 0, 1, 1],
    [0, 0, 0, 0],
  ],
  turnBottomLeftWithFood: [
    [0, 1, 1, 1],
    [0, 1, 0, 1],
    [0, 0, 1, 1],
    [0, 0, 0, 0],
  ],
  turnTopLeft: [
    [0, 0, 0, 0],
    [0, 0, 1, 1],
    [0, 1, 0, 1],
    [0, 1, 1, 0],
  ],
  turnTopLeftWithFood: [
    [0, 0, 0, 0],
    [0, 0, 1, 1],
    [0, 1, 0, 1],
    [0, 1, 1, 1],
  ],
  food: [
    [0, 1, 0, 0],
    [1, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
  ],
};

export const mapSnake = ({
  snake,
  gridWidth,
  gridHeight,
  food,
  eatenFood,
  superFood,
}: {
  snake: { x: number; y: number }[];
  gridWidth: number;
  gridHeight: number;
  food: { x: number; y: number };
  superFood?: { x: number; y: number };
  eatenFood: { x: number; y: number }[];
}): { x: number; y: number; segment: number[][] }[] => {
  return snake.map((segment, index, array) => {
    const previousSegment = array[index + 1];
    const nextSegment = array[index - 1];
    const withFood = eatenFood.some(
      ({ x, y }) => x === segment.x && y === segment.y,
    );

    if (index === 0) {
      if (segment.x === previousSegment.x) {
        if (
          segment.y - previousSegment.y === -1 ||
          (segment.y === gridHeight - 1 && previousSegment.y === 0)
        ) {
          if (
            (food.x === segment.x && food.y - segment.y === -1) ||
            (superFood?.x === segment.x && superFood?.y - segment.y === -1)
          ) {
            return { ...segment, segment: gameSegments.headUpFood };
          }
          return { ...segment, segment: gameSegments.headUp };
        }
        if (
          segment.y - previousSegment.y === 1 ||
          (segment.y === 0 && previousSegment.y === gridHeight - 1)
        ) {
          if (
            (food.x === segment.x && food.y - segment.y === 1) ||
            (superFood?.x === segment.x && superFood?.y - segment.y === 1)
          ) {
            return { ...segment, segment: gameSegments.headDownFood };
          }
          return { ...segment, segment: gameSegments.headDown };
        }
      }
      if (segment.y === previousSegment.y) {
        if (
          segment.x - previousSegment.x === -1 ||
          (segment.x === gridWidth - 1 && previousSegment.x === 0)
        ) {
          if (
            (food.y === segment.y && food.x - segment.x === -1) ||
            (superFood?.y === segment.y && superFood?.x - segment.x === -1)
          ) {
            return { ...segment, segment: gameSegments.headLeftFood };
          }
          return { ...segment, segment: gameSegments.headLeft };
        }
        if (
          segment.x - previousSegment.x === 1 ||
          (segment.x === 0 && previousSegment.x === gridWidth - 1)
        ) {
          if (
            (food.y === segment.y && food.x - segment.x === 1) ||
            (superFood?.y === segment.y && superFood?.x - segment.x === 1)
          ) {
            return { ...segment, segment: gameSegments.headRightFood };
          }
          return { ...segment, segment: gameSegments.headRight };
        }
      }
    }

    if (index === array.length - 1) {
      if (segment.x === nextSegment.x) {
        if (
          segment.y - nextSegment.y === -1 ||
          (segment.y === gridHeight - 1 && nextSegment.y === 0)
        ) {
          return { ...segment, segment: gameSegments.tailDown };
        }
        if (
          segment.y - nextSegment.y === 1 ||
          (segment.y === 0 && nextSegment.y === gridHeight - 1)
        ) {
          return { ...segment, segment: gameSegments.tailUp };
        }
      }
      if (segment.y === nextSegment.y) {
        if (
          segment.x - nextSegment.x === -1 ||
          (segment.x === gridWidth - 1 && nextSegment.x === 0)
        ) {
          return { ...segment, segment: gameSegments.tailRight };
        }
        if (
          segment.x - nextSegment.x === 1 ||
          (segment.x === 0 && nextSegment.x === gridWidth - 1)
        ) {
          return { ...segment, segment: gameSegments.tailLeft };
        }
      }
    }

    if (segment.x === previousSegment.x && segment.x === nextSegment.x) {
      return {
        ...segment,
        segment: withFood
          ? gameSegments.bodyVerticalWithFood
          : gameSegments.bodyVertical,
      };
    }

    if (segment.y === previousSegment.y && segment.y === nextSegment.y) {
      return {
        ...segment,
        segment: withFood
          ? gameSegments.bodyHorizontalWithFood
          : gameSegments.bodyHorizontal,
      };
    }

    // Moving right
    if (
      segment.x - previousSegment.x === 1 ||
      (previousSegment.x === gridWidth - 1 && segment.x === 0)
    ) {
      if (
        nextSegment.y - segment.y === 1 ||
        (segment.y === gridHeight - 1 && nextSegment.y === 0)
      )
        return {
          ...segment,
          segment: withFood
            ? gameSegments.turnTopRightWithFood
            : gameSegments.turnTopRight,
        };
      if (
        nextSegment.y - segment.y === -1 ||
        (segment.y === 0 && nextSegment.y === gridHeight - 1)
      )
        return {
          ...segment,
          segment: withFood
            ? gameSegments.turnBottomRightWithFood
            : gameSegments.turnBottomRight,
        };
    }

    // Moving left
    if (
      segment.x - previousSegment.x === -1 ||
      (previousSegment.x === 0 && segment.x === gridWidth - 1)
    ) {
      if (
        nextSegment.y - segment.y === 1 ||
        (segment.y === gridHeight - 1 && nextSegment.y === 0)
      )
        return {
          ...segment,
          segment: withFood
            ? gameSegments.turnTopLeftWithFood
            : gameSegments.turnTopLeft,
        };
      if (
        nextSegment.y - segment.y === -1 ||
        (segment.y === 0 && nextSegment.y === gridHeight - 1)
      )
        return {
          ...segment,
          segment: withFood
            ? gameSegments.turnBottomLeftWithFood
            : gameSegments.turnBottomLeft,
        };
    }

    // Moving down
    if (
      segment.y - previousSegment.y === 1 ||
      (previousSegment.y === gridHeight - 1 && segment.y === 0)
    ) {
      if (
        nextSegment.x - segment.x === 1 ||
        (segment.x === gridWidth - 1 && nextSegment.x === 0)
      )
        return {
          ...segment,
          segment: withFood
            ? gameSegments.turnBottomLeftWithFood
            : gameSegments.turnBottomLeft,
        };
      if (
        nextSegment.x - segment.x === -1 ||
        (segment.x === 0 && nextSegment.x === gridWidth - 1)
      )
        return {
          ...segment,
          segment: withFood
            ? gameSegments.turnBottomRightWithFood
            : gameSegments.turnBottomRight,
        };
    }

    // Moving up
    if (
      segment.y - previousSegment.y === -1 ||
      (previousSegment.y === 0 && segment.y === gridHeight - 1)
    ) {
      if (
        nextSegment.x - segment.x === 1 ||
        (segment.x === gridWidth - 1 && nextSegment.x === 0)
      )
        return {
          ...segment,
          segment: withFood
            ? gameSegments.turnTopLeftWithFood
            : gameSegments.turnTopLeft,
        };
      if (
        nextSegment.x - segment.x === -1 ||
        (segment.x === 0 && nextSegment.x === gridWidth - 1)
      )
        return {
          ...segment,
          segment: withFood
            ? gameSegments.turnTopRightWithFood
            : gameSegments.turnTopRight,
        };
    }

    return { ...segment, segment: gameSegments.bodyVertical };
  });
};
