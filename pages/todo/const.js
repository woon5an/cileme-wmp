const BREAKFAST = 'breakfast'
const LUNCH = 'lunch'
const DINNER = 'dinner'
const SNACK = 'snack'
const CAKE = 'cake'
const FRUIT = 'fruit'
export const FOOD_ARR = ['breakfast','lunch','dinner', 'snack', 'cake', 'fruit']
export const FOOD_MAP = {
	[BREAKFAST]: {
		label: '🍳BREAKFAST',
		prop: 'breakfast',
		score: 20
	},
	[LUNCH]:{
		label: '🍜LUNCH',
		prop: 'lunch',
		score: 40
	},
	[DINNER]: {
		label: '🍲DINNER',
		prop: 'dinner',
		score: 40
	},
	[SNACK]: {
		label: '🍘SNACK',
		prop: 'snack',
		score: -20
	},
	[CAKE]: {
		label: '🍰CAKE',
		prop: 'cake',
		score: -20
	},
	[FRUIT]: {
		label: '🍊FRUIT',
		prop: 'fruit',
		score: 20
	}
}