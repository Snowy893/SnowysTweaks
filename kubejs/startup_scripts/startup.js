ItemEvents.modification(event => {
    event.modify("minecraft:potion", item => item.maxStackSize = 4);
    event.modify("minecraft:splash_potion", item => item.maxStackSize = 4);
    event.modify("minecraft:lingering_potion", item => item.maxStackSize = 4);
    ["", "hopper_", "chest_", "furnace_", "tnt_", "command_block_"].forEach(cart =>
        event.modify("minecraft:" + cart + "minecart", item => item.maxStackSize = 4));
    [
        "minecraft:oak",
        "minecraft:birch",
        "minecraft:acacia",
        "minecraft:cherry",
        "minecraft:jungle",
        "minecraft:spruce",
        "minecraft:dark_oak",
        "minecraft:mangrove",
        "biomesoplenty:fir",
        "biomesoplenty:pine",
        "biomesoplenty:maple",
        "biomesoplenty:redwood",
        "biomesoplenty:mahogany",
        "biomesoplenty:jacaranda",
        "biomesoplenty:palm",
        "biomesoplenty:willow",
        "biomesoplenty:dead",
        "biomesoplenty:magic",
        "biomesoplenty:umbran",
        "biomesoplenty:hellbark",
        "biomesoplenty:empyreal",
        "biomesoplenty:stone_pine",
        "biomesoplenty:cottonwood",
        "biomesoplenty:willow",
    ].forEach(wood => {
        event.modify(wood + "_boat", item => item.maxStackSize = 4);
        event.modify(wood + "_chest_boat", item => item.maxStackSize = 4);
    });
    event.modify("minecraft:saddle", item => item.maxStackSize = 16);
    event.modify("hexalia:mortar_and_pestle", item => item.maxStackSize = 1);
    event.modify("friendsandfoes:crab_claw", item => item.maxStackSize = 1);
    ["anchor", "cannon", "helm", "mast", "sail"].forEach(equippable =>
        event.modify("whaleborne:" + equippable, item => item.maxStackSize = 16));

    event.modify("sulfar_mod:sulfar_block", item => item.burnTime = 20000);

    event.modify("minecraft:fishing_rod", item => item.maxDamage = 64*2);
    event.modify("tide:stone_fishing_rod", item => item.maxDamage = 96*2);
    event.modify("tide:iron_fishing_rod", item => item.maxDamage = 128*2);
    event.modify("tide:golden_fishing_rod", item => item.maxDamage = 72*2);
    event.modify("tide:crystal_fishing_rod", item => item.maxDamage = 160*2);
    event.modify("tide:diamond_fishing_rod", item => item.maxDamage = 256*2);
    // event.modify("tide:netherite_fishing_rod", item => item.maxDamage = 1024*2);
    event.modify("tide:midas_fishing_rod", item => item.maxDamage = 512*1.5);
});

ItemAttributes.modify(attributes => {
    let crabClawSlots = ["mainhand", "offhand"];
    crabClawSlots.forEach(slot => {
        attributes.add(Ingredient.of("friendsandfoes:crab_claw"), "forge:entity_reach", 0.25, "addition", slot);
        attributes.add(Ingredient.of("friendsandfoes:crab_claw"), "forge:block_reach", 1, "addition", slot);
    });
});

MoreJSEvents.registerPotionBrewing(event => {
    event.removeByPotion(null, null, "additionaladditions:haste_potion");
    event.addPotionBrewing("minecraft:golden_apple", "minecraft:awkward", "additionaladditions:haste_potion");
});

console.info("Loaded Snowy's Startup Tweaks");