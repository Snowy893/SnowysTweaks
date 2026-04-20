ServerEvents.recipes(event => {
	event.remove({ id: 'minecraft:lead' })
	event.remove({ id: 'minecraft:lodestone' })
	event.replaceInput(
		{ output: 'farmersdelight:fried_egg' },
		'minecraft:egg',
		'#c:eggs'
	)
})
console.info('Loaded Snowy\'s Recipe Tweaks')