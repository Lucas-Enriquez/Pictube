export const Routes = {
	HOME: {
		path: '/',
		name: 'home'
	},
	CHARACTERS: {
		path: 'information/characters',
		name: 'Characters'
	},
	LOCATIONS: {
		path: '/information/locations',
		name: 'Locations'
	}
}

export interface Route {
	path: string
	name: string
}
