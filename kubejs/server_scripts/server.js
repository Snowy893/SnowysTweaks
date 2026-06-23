/**
 * @param {Internal.RecipeJS} event
 * @param {string|Internal.ItemStack} output
 * @param {Internal.Ingredient|Internal.Ingredient[]} ingredients
 */
function mortarAndPestleRecipe(event, output, ingredients) {
    let outputItem = !(output instanceof Item) ? Item.of(output) : output;
    let ingredientsArray = !(ingredients instanceof Array) ? [ingredients] : ingredients;
    event.shapeless(outputItem, [{ item: "hexalia:mortar_and_pestle" }].concat(ingredientsArray))
        .keepIngredient("hexalia:mortar_and_pestle");
    event.custom({
        type: "hexalia:mortar_and_pestle",
        ingredients: ingredientsArray,
        output: outputItem
    });
}

/**
 * @param {Internal.RecipeJS} event
 * @param {string} ore
 * @param {string} ingot
 * @param {number} bonus1
 * @param {number} bonus2
 * @param {number} bonus3
 */
function alloySmelterOreRecipe(event, ore, ingot, bonus1, bonus2, bonus3) {
    event.custom({
        type: "alloy_smelter:smelting",
        ingredients: [
            { item: ore },
            { item: ore },
            { item: ore },
            { item: ore },
            { item: ore },
        ],
        result: {
            item: ingot,
            count: 5 + bonus1,
        },
        smeltingTime: 400,
        fuelPerTick: 1,
        requiredTier: 1,
    });

    event.custom({
        type: "alloy_smelter:smelting",
        ingredients: [
            { item: ore },
            { item: ore },
            { item: ore },
            { item: ore },
            { item: ore },
        ],
        result: {
            item: ingot,
            count: 5 + bonus2,
        },
        smeltingTime: 320,
        fuelPerTick: 1,
        requiredTier: 2,
    });

    event.custom({
        type: "alloy_smelter:smelting",
        ingredients: [
            { item: ore },
            { item: ore },
            { item: ore },
            { item: ore },
            { item: ore },
        ],
        result: {
            item: ingot,
            count: 5 + bonus3,
        },
        smeltingTime: 240,
        fuelPerTick: 1,
        requiredTier: 3,
    });
}

let crushedHerbs = [];

ServerEvents.tags("item", event =>
    event.get("hexalia:crushed_herbs").getObjectIds().forEach(id => crushedHerbs.push(Item.of(id))));

ServerEvents.recipes(event => {
    event.remove({ id: "minecraft:lead" });
    event.remove({ id: "minecraft:lodestone" });
    event.remove({ id: "minecraft:powered_rail" });
    event.remove({ id: "sulfar_mod:blaze_powder_sulfar_recipe" });
    event.remove({ id: "hexalia:salt" });
    event.remove({ id: "hexalia:salt_block" });
    event.remove({ id: "hexalia:salt_from_mortar" });
    event.remove({ id: "hexalia:leather_from_salt" });
    event.remove({ id: "workstations:coking/quartz" });
    event.remove({ id: "projectvibrantjourneys:cindercane_to_blaze_powder" });
    event.remove({ id: "projectvibrantjourneys:glowcap_to_glowstone_dust" });
    event.remove({ id: "winteroverhaul:skates" });
    event.remove({ id: "hearthandharvest:cotton_candy" });
    ["copper", "gold", "iron"].forEach(ingot => {
        event.remove({ id: "alloy_smelter:smelting/tier1/" + ingot + "_ingot" });
        event.remove({ id: "alloy_smelter:smelting/tier1/double_" + ingot + "_ingot" });
        event.remove({ id: "alloy_smelter:smelting/tier2/" + ingot + "_ingot" });
        event.remove({ id: "alloy_smelter:smelting/tier2/double_" + ingot + "_ingot" });
        event.remove({ id: "alloy_smelter:smelting/tier3/" + ingot + "_ingot" });
        event.remove({ id: "alloy_smelter:smelting/tier3/double_" + ingot + "_ingot" });
    });
    event.remove({ id: "ring_of_enderchest:ring_of_enderchest" });

    // Remake the mortar and pestle crafting table recipes such that the mortar and pestle isn't lost on crafting
    ["shaped", "shapeless"].forEach(type =>
        event.forEachRecipe({ type: "minecraft:crafting_" + type, input: "hexalia:mortar_and_pestle" }, recipe => {
            // Reverse the order so that mortar and pestle appears first in the recipe
            let ingredients = recipe.getOriginalRecipeIngredients().reversed().toArray();
            let output = recipe.originalRecipeResult;

            event[type](output, ingredients)
                .keepIngredient("hexalia:mortar_and_pestle")
                .id(recipe.getId());
        }));

    event.replaceInput({ output: "farmersdelight:fried_egg" }, "minecraft:egg", "#c:eggs");

    event.shapeless("minecraft:fire_charge", [
        { item: "sulfar_mod:sulfar" },
        { item: "sulfar_mod:sulfar" },
        { item: "minecraft:gunpowder" },
        { item: "sulfar_mod:sulfar" },
    ]).id("sulfar_mod:fire_charge_sulfar_recipe");

    event.shapeless("hearthandharvest:syrup_crate", [
        { item: "hearthandharvest:syrup_bottle" },
        { item: "hearthandharvest:syrup_bottle" },
        { item: "hearthandharvest:syrup_bottle" },
        { item: "hearthandharvest:syrup_bottle" },
        { item: "hearthandharvest:syrup_bottle" },
        { item: "hearthandharvest:syrup_bottle" },
        { item: "hearthandharvest:syrup_bottle" },
        { item: "hearthandharvest:syrup_bottle" },
        { item: "hearthandharvest:syrup_bottle" },
    ]).id("hearthandharvest:kjs/syrup_crate");

    event.shapeless(Item.of("hearthandharvest:salt", 9), [
        { item: "hexalia:salt_block" }
    ]).id("hexalia:kjs/salt_block");

    event.smelting("sulfar_mod:sulfar", "projectvibrantjourneys:cindercane", 1.0, 200)
        .id("sulfar_mod:kjs/sulfar_from_smelting_cindercane");

    event.smelting("sulfar_mod:sulfar", "sulfar_mod:nether_sulfar_ore", 1.0, 200)
        .id("sulfar_mod:kjs/sulfar_from_smelting_nether_sulfar_ore");

    event.smithing("winteroverhaul:skates", "minecraft:string", "minecraft:leather_boots", "minecraft:iron_ingot")
        .id("winteroverhaul:kjs/skates_from_smithing_table");

    event.custom({
        type: "farmersdelight:cooking",
        cookingtime: 100,
        experience: 0.35,
        ingredients: [{ item: "biomesoplenty:dried_salt" }],
        recipe_book_tab: "misc",
        result: {
            item: "hearthandharvest:salt",
            count: 8,
        },
    });

    event.custom({
        type: "farmersdelight:cooking",
        container: { item: "minecraft:bucket" },
        cookingtime: 100,
        experience: 0.35,
        ingredients: [{ item: "biomesoplenty:porous_flesh" }],
        recipe_book_tab: "misc",
        result: { item: "biomesoplenty:blood_bucket" },
    });

    new Map(Object.entries({
        cobblestone: "rocks",
        mossy_cobblestone: "mossy_rocks",
        sandstone: "sandstone_rocks",
        red_sandstone: "red_sandstone_rocks",
        ice: "ice_chunks",
    })).forEach((output, ingredient) => {
        event.custom({
            type: "farmersdelight:cutting",
            ingredients: [{ item: ingredient }],
            result: [{ item: "projectvibrantjourneys:" + output, count: 4 }],
            tool: {
                type: "farmersdelight:tool_action",
                action: "pickaxe_dig",
            },
        });
    });

    event.custom({
        type: "hexalia:mortar_and_pestle",
        ingredients: [{ item: "hexalia:saltsprout" }],
        output: { item: "hearthandharvest:salt" },
    });

    event.custom({
        type: "hexalia:mortar_and_pestle",
        ingredients: [{ item: "hexalia:silk_fiber" }],
        output: { item: "minecraft:string", count: 3 },
    });

    mortarAndPestleRecipe(event, Item.of("sulfar_mod:sulfar", 2), { item: "minecraft:blaze_powder" });
    mortarAndPestleRecipe(event, "minecraft:flint", { item: "minecraft:gravel" });
    mortarAndPestleRecipe(event, "minecraft:glowstone_dust", { item: "projectvibrantjourneys:glowcap" });
    mortarAndPestleRecipe(event, "hearthandharvest:cotton_candy", [
        { item: "minecraft:stick" },
        { item: "hearthandharvest:cotton" },
        { item: "minecraft:sugar" },
    ]);
    mortarAndPestleRecipe(event, Item.of("hexalia:salt", 2), [
        { item: "hearthandharvest:salt" },
        { tag: "hexalia:crushed_herbs" },
    ]);

    event.custom({
        type: "hexalia:ritual_table",
        ingredients: [{ item: "hexalia:air_node" }].concat(crushedHerbs),
        output: { item: "minecraft:phantom_membrane" },
    }).id("hexalia:kjs/phantom_membrane_ritual_table");

    event.custom({
        type: "hexalia:ritual_table",
        ingredients: [
            { item: "minecraft:rotten_flesh" },
            { item: "hearthandharvest:salt" },
            { item: "hearthandharvest:salt" },
        ],
        output: { item: "minecraft:leather" },
    }).id("hexalia:kjs/leather_ritual_table");

    alloySmelterOreRecipe(event, "minecraft:raw_gold", "minecraft:gold_ingot", 0, 1, 3);
    alloySmelterOreRecipe(event, "minecraft:raw_iron", "minecraft:iron_ingot", 0, 1, 3);
    alloySmelterOreRecipe(event, "minecraft:raw_copper", "minecraft:copper_ingot", 0, 1, 3);
    alloySmelterOreRecipe(event, "minecraft:ancient_debris", "minecraft:netherite_scrap", 0, 0, 1);
    alloySmelterOreRecipe(event, "pigsteel:pigsteel_chunk", "minecraft:iron_nugget", 1, 2, 4);
    alloySmelterOreRecipe(event, "pigsteel:porkslag", "minecraft:iron_ingot", 0, 1, 3);

    event.shaped("ring_of_enderchest:ring_of_enderchest",
        [
            " S ",
            "SES",
            " O ",
        ],
        {
            E: "minecraft:ender_eye",
            S: "minecraft:echo_shard",
            O: "minecraft:obsidian",
        },
    ).id("ring_of_enderchest:kjs/ring_of_enderchest");
});

const potions = ["minecraft:splash_potion", "minecraft:lingering_potion"];

ItemEvents.rightClicked(potions, event => {
    event.server.scheduleInTicks(1, () =>
        potions.forEach(potion => event.player.addItemCooldown(potion, 30)));
});

LootJS.modifiers(event =>
    event.addBlockLootModifier("hexalia:salt_block").replaceLoot("hexalia:salt", "hearthandharvest:salt", true));

console.info("Loaded Snowy's Server Tweaks");