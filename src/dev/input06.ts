type hugeT = {
  [key: string]: hugeT;
} | hugeT[] | number | string | Map<number | string, hugeT> | Set<hugeT> | Iterable<hugeT>;

function buildHugePrimitiveKey(counter: number): string {
  return `node #${counter} key`;
}
function buildHugePrimitiveValue(counter: number): string | number {
  return `node #${counter} value`;
}
function buildHugeArray(depthToGo: number, size: number, counter: number): {huge: hugeT[]; counter: number} {
  const huge: hugeT[] = [];
  for (let i = 0; i < size; i++) {
    if (depthToGo > 0) {
      const {huge: sub, counter: updatedCounter} = buildHuge(depthToGo - 1, size, counter);
      huge.push(sub);
      counter = updatedCounter;
    } else {
      huge.push(buildHugePrimitiveValue(counter));
      counter++;
    }
  }
  return {huge, counter};
}
function buildHugeObject(depthToGo: number, size: number, counter: number): {huge: hugeT; counter: number} {
  const huge: hugeT = {};
  for (let i = 0; i < size; i++) {
    const key = buildHugePrimitiveKey(counter);
    if (depthToGo > 0) {
      const {huge: sub, counter: updatedCounter} = buildHuge(depthToGo - 1, size, counter);
      huge[key] = sub;
      counter = updatedCounter;
    } else {
      huge[key] = buildHugePrimitiveValue(counter);
      counter++;
    }
  }
  return {huge, counter};
}
function buildHugeSet(depthToGo: number, size: number, counter: number): {huge: Set<hugeT>; counter: number} {
  const {huge: rawHuge, counter: updatedCounter} = buildHugeArray(depthToGo, size, counter);
  const huge = new Set(rawHuge);
  return {huge, counter: updatedCounter};
}
function buildHugeMap(depthToGo: number, size: number, counter: number): {huge: Map<string, hugeT>; counter: number} {
  const {huge: rawHuge, counter: updatedCounter} = buildHugeObject(depthToGo, size, counter);
  const huge = new Map(Object.entries(rawHuge));
  return {huge, counter: updatedCounter};
}
function buildHugeIterable(depthToGo: number, size: number, counter: number): {huge: Iterable<hugeT>; counter: number} {
  const {huge: rawHuge, counter: updatedCounter} = buildHugeArray(depthToGo, size, counter);
  const hugeIterable = {
    [Symbol.iterator]: rawHuge[Symbol.iterator],
  };
  return {huge: hugeIterable, counter: updatedCounter};
}
const hugeBuilders = [
  buildHugeArray,
  buildHugeObject,
  buildHugeSet,
  buildHugeMap,
  buildHugeIterable
];

function buildHuge(depthToGo: number, size: number, counter = 0): {huge: hugeT; counter: number} {
  const hugeBuildersId = counter % hugeBuilders.length;
  const hugeBuilder = hugeBuilders[hugeBuildersId];
  return hugeBuilder(depthToGo, size, counter);
}
const { huge } = buildHuge(4, 6);
export default huge;