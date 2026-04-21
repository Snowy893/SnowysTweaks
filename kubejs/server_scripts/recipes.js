ServerEvents.recipes(event => {
	event.remove({ id: 'minecraft:lead' })
	event.remove({ id: 'minecraft:lodestone' })
	event.remove({ id: 'minecraft:powered_rail' })
	event.remove({ id: 'sulfar_mod:blaze_powder_sulfar_recipe' })
	event.replaceInput(
		{ output: 'farmersdelight:fried_egg' },
		'minecraft:egg',
		'#c:eggs'
	)
})
console.info('Loaded Snowy\'s Recipe Tweaks')