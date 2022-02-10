/**
 * Returns a random Int number in range (min - max) both being included
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export function generateRandomIntNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Converts received number to format used for text amounts in the app
 * @param {*} amount 
 * @returns {string} amount with money format: '$NNN.00' | '$N,NNN.00'
 */
export function convertNumberToMoneyString(amount) {
    return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
    });
}
