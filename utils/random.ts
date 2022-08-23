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

export const shuffle = <TItem>(arr: TItem[]) => {
    return sample(arr, Infinity);
};
