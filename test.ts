
import { it, describe, expect } from '@jest/globals';
import { selectLevel } from './functiontest';

describe('selectLevel', () => {
    describe('level', () => {
        it('should return the correct number of cards', () => {
            const level = 'easy';
            const totalCards = 6;
            expect(selectLevel(level)).toBe(totalCards);
        });
    });
});
