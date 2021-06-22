import { colors, Npc } from './model/Npc';

export function isString(variable: any) {
  return typeof variable === 'string' || variable instanceof String;
}

export function arrayUp<T>(array: T[], element: T) {
  const index = array.indexOf(element);

  if (index > 0) {
    [array[index], array[index - 1]] = [array[index - 1], array[index]];
  }
}

export function arrayDown<T>(array: T[], element: T) {
  const index = array.indexOf(element);

  if (index >= 0 && index < array.length - 1) {
    [array[index], array[index + 1]] = [array[index + 1], array[index]];
  }
}

export function sortNpc(array: Npc[]) {
  array.sort((a, b) => {
    if (a.color !== b.color) {
      const aIndex = colors.indexOf(a.color);
      const bIndex = colors.indexOf(b.color);
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      }

      if (aIndex) {
        return 1;
      }

      if (bIndex) {
        return -1;
      }

      return a.color.localeCompare(b.color);
    }

    return a.name.localeCompare(b.name);
  });
}