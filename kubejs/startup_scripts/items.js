ItemEvents.modification(event => {
    event.modify('sulfar_mod:sulfar', item => item.burnTime = 800)
    event.modify('sulfar_mod:sulfar_block', item => item.burnTime = 8000)
})
console.info('Loaded Snowy\'s Item Tweaks')