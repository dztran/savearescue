// Route helpers shared by screens. Kept separate from router.js to avoid an
// import cycle (router.js imports every screen).
export const TAB_ROUTES = ['AdoptView', 'ShelterView', 'Hotline', 'PetServices', 'BreedView'];

// React Navigation 7 no longer resolves a screen name inside a navigator that
// has not been mounted yet, so tab screens are reached through the 'Tabs' route.
export function navigateTo(navigation, routeName, params) {
    if (TAB_ROUTES.includes(routeName)) {
        navigation.navigate('Tabs', { screen: routeName, params });
    } else {
        navigation.navigate(routeName, params);
    }
}
