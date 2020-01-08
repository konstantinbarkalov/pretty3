import { linesT } from './types/general';
export function wrapLines(lines: linesT, maxLineWidth: number): linesT {
  const wrappedLines: string[] = [];
  lines.forEach((line) => {
    const wrappedSublinesinLineCount = Math.ceil(line.length / maxLineWidth);
    for (let i = 0; i < wrappedSublinesinLineCount; i++) {
      const wrappedSubline = line.substr(i * maxLineWidth, maxLineWidth);
      wrappedLines.push(wrappedSubline);
    }
    return wrappedLines;
  });
  return wrappedLines;
}
export function stringToLines(text:string):linesT {
  // to be less sensitive on input
  // and to allow cross-OS compatibility
  // with same (locked to any of EOLs) input
  const lines = text.split(/\r\n|\n/);
  return lines;
}
export function stringToWrappedLines(text:string, maxLineWidth:number):linesT {
  return wrapLines(stringToLines(text), maxLineWidth);
}