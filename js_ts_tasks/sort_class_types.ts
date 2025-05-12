/**
 * 📚 Задание:
 * Реализуйте универсальный класс `SortLimited` с использованием generic и ограничением типов.
 */

class BubbleSort {
  sort(array: (string | number)[]): (string | number)[] {
    return [] as (string | number)[];
  }
}

class QuickSort {
  sort(array: (string | number)[]): (string | number)[] {
    return [] as (string | number)[];
  }
}

class MergeSort {
  sort(array: (string | number)[]): (string | number)[] {
    return [] as (string | number)[];
  }
}

class Sort {
  constructor(
    public array: (string | number)[],
    private method: BubbleSort | QuickSort | MergeSort
  ) {}

  sort(): (string | number)[] {
    return this.method.sort(this.array);
  }
}

// ----------------------------------------------------
// Правильный ответ вот такой именно потому что тип метода нужно руками протипизировать (array: T[]): T[]
// Если мы будем добавлять кастомный тип T и кастомный метод для его сортировки, типизировать нужно именно так

export interface SortingMethod<T> {
  sort(array: T[]): T[];
}

class SortUniversal<T> {
  constructor(public array: T[], private method: SortingMethod<T>) {}

  sort(): T[] {
    return this.method.sort(this.array);
  }
}
