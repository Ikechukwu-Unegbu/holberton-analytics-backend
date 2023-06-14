class GenericHelper{
    // Helper functions
    generateRandomToken(length = 32) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
        for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
        }
        return token;
    }

    calculateTokenExpiration(durationInDays = 3) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + durationInDays);
        expirationDate.setHours(23, 59, 59, 999); // Set the time to the end of the day
        return expirationDate;
    }
      
}

export default new GenericHelper()