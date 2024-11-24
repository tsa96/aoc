import '../../lib';

const input = readInput().split('\n').map(Number);

part1(() => input.filter((_, i, arr) => arr[i] > arr[i - 1]).length);

part2(() => input.filter((_, i, arr) => arr[i + 3] > arr[i]).length);
