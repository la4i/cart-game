export function selectLevel(level: string | null) {
    let totalCards;
    switch (level) {
        case 'easy':
            totalCards = 6;
            break;

        case 'medium':
            totalCards = 12;
            break;

        default:
            totalCards = 18;
            break;
    }

    return totalCards;
}
