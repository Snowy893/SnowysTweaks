ItemEvents.modification(event => {
    event.modify('sulfar_mod:sulfar_block', item => item.burnTime = 20000)
    event.modify('hexalia:mortar_and_pestle', item => item.maxStackSize = 1)
})

// Broken attempt at nerfing Friends&Foes reach potion
// StartupEvents.registry('potion', event => {
//     event.create('friendsandfoes:kjs/reaching')
//         .effect('friendsandfoes:reach', 18000)
//     event.create('friendsandfoes:kjs/long_reaching')
//         .effect('friendsandfoes:reach', 36000)
//     event.create('friendsandfoes:kjs/strong_reaching')
//         .effect('friendsandfoes:reach', 9000, 1)
// })
// MoreJSEvents.registerPotionBrewing(event => {
//     event.removeByPotion(null, null, 'friendsandfoes:reaching')
//     event.removeByPotion(null, null, 'friendsandfoes:long_reaching')
//     event.removeByPotion(null, null, 'friendsandfoes:strong_reaching')
//     event.addPotionBrewing('friendsandfoes:crab_claw', 'minecraft:awkward', 'friendsandfoes:kjs/reaching')
//     event.addPotionBrewing('minecraft:redstone', 'friendsandfoes:kjs/reaching', 'friendsandfoes:kjs/long_reaching')
//     event.addPotionBrewing('minecraft:glowstone_dust', 'friendsandfoes:kjs/reaching', 'friendsandfoes:kjs/strong_reaching')
// })

console.info('Loaded Snowy\'s Startup Tweaks')