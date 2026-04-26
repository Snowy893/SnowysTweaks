ItemEvents.modification(event => {
    event.modify("sulfar_mod:sulfar_block", item => item.burnTime = 20000);
    event.modify("hexalia:mortar_and_pestle", item => item.maxStackSize = 1);
});

MoreJSEvents.registerPotionBrewing(event => {
    let disabledPotions = ["reaching", "long_reaching", "strong_reaching"];
    disabledPotions.forEach(potion => {
        event.removeByPotion(null, null, potion);
        event.removeByPotion(potion, null, null);
    });
});

ItemAttributes.modify(attributes => {
    let crabClawSlots = ["mainhand", "offhand"];
    crabClawSlots.forEach(slot => {
        attributes.add(Ingredient.of("friendsandfoes:crab_claw"), "forge:entity_reach", 0.25, "addition", slot);
        attributes.add(Ingredient.of("friendsandfoes:crab_claw"), "forge:block_reach", 1, "addition", slot);
    });
});

console.info("Loaded Snowy's Startup Tweaks");