export const getGreeting = () => {
    const hourOfDay = new Date().getHours();
    if (hourOfDay >= 4 && hourOfDay < 12) {
        return 'Good Morning';
    }
    if (hourOfDay >= 12 && hourOfDay < 17) {
        return 'Good Afternoon';
    }
    return 'Good Evening';
};
