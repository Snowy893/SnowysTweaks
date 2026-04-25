ItemEvents.modification(event => {
    event.modify('sulfar_mod:sulfar_block', item => item.burnTime = 20000)
    event.modify('hexalia:mortar_and_pestle', item => item.maxStackSize = 1)
})
console.info('Loaded Snowy\'s Startup Tweaks')