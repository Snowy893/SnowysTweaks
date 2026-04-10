console.info('Loaded Snowy\'s Recipe Tweaks')
ServerEvents.recipes(event => {
	event.remove({ id: 'minecraft:lead' })
	event.remove({ id: 'minecraft:lodestone' })
})