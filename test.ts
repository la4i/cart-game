import { selectLevel } from './src/index';
import { it, describe, expect } from '@jest/globals';

describe('selectLevel', () => {
    describe('level', () => {
        it('should return the correct number of cards', () => {
            const level = 'easy';
            const totalCards = 6;
            expect(selectLevel(level)).toBe(totalCards);
        });
    });
});
