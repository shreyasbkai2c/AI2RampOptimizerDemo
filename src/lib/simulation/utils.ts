/**
 * Simple seeded random number generator for deterministic demo scenarios.
 */
export class SeededRNG {
    private seed: number;

    constructor(seed: number) {
        this.seed = seed;
    }

    /**
     * Returns a pseudorandom float between 0 and 1.
     */
    next(): number {
        const x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    }

    /**
     * Returns a pseudorandom integer between min and max (inclusive).
     */
    nextInt(min: number, max: number): number {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }

    /**
     * Picks a random item from an array.
     */
    pick<T>(array: T[]): T {
        return array[this.nextInt(0, array.length - 1)];
    }

    /**
     * Returns true with a given probability (0..1).
     */
    chance(probability: number): boolean {
        return this.next() < probability;
    }
}

// Global instance for convenience, can be re-seeded
export const rng = new SeededRNG(42);
