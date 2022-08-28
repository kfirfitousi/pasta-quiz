/**
 * Get a random sample from an array, using the Fisher-Yates shuffle algorithm.
 * @param arr Array to sample from
 * @param n number of items to pick from `arr`
 * @returns Array containing `n` items chosen randomly from `arr`
 */
export const sample = <TItem>(arr: TItem[], n: number) => {
    const sample = arr.slice();
    const length = sample.length;
    n = Math.max(Math.min(n, length), 0);
    const last = length - 1;
    for (let i = 0; i < n; i++) {
        const rand = Math.floor(Math.random() * last);
        const temp = sample[i];
        sample[i] = sample[rand];
        sample[rand] = temp;
    }
    return sample.slice(0, n);
};

/**
 * Shuffle an array using the Fisher-Yates shuffle algorithm.
 * @param arr Array to shuffle
 * @returns Shuffled array
 */
export const shuffle = <TItem>(arr: TItem[]) => {
    return sample(arr, Infinity);
};
