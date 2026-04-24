ServerEvents.recipes(event => {
    event.remove({ id: 'minecraft:lead' })
    event.remove({ id: 'minecraft:lodestone' })
    event.remove({ id: 'minecraft:powered_rail' })
    event.remove({ id: 'sulfar_mod:blaze_powder_sulfar_recipe' })
    event.remove({ id: 'hexalia:salt' })
    event.remove({ id: 'hexalia:salt_from_mortar' })

    event.replaceInput({ output: 'farmersdelight:fried_egg' }, 'minecraft:egg', '#c:eggs')
    event.replaceInput({ input: 'hexalia:salt' }, 'hexalia:salt', 'hearthandharvest:salt')
    event.replaceOutput({ output: 'hexalia:salt' }, 'hexalia:salt', 'hearthandharvest:salt')

    event.custom({
        type: 'hexalia:mortar_and_pestle',
        ingredients: [
            {
                item: 'hexalia:saltsprout'
            }
        ],
        output: {
            item: 'hearthandharvest:salt'
        }
    })
    event.custom({
        type: 'farmersdelight:cooking',
        cookingtime: 100,
        experience: 0.35,
        ingredients: [
            {
                item: 'biomesoplenty:dried_salt'
            }
        ],
        recipe_book_tab: 'misc',
        result: {
            count: 8,
            item: 'hearthandharvest:salt'
        }
    })
    event.custom({
        type: 'hexalia:mortar_and_pestle',
        ingredients: [
            {
                item: 'minecraft:blaze_powder'
            }
        ],
        output: {
            item: 'sulfar_mod:sulfar'
        }
    })
})

LootJS.modifiers(event =>
    event.addBlockLootModifier("hexalia:salt_block").replaceLoot("hexalia:salt", "hearthandharvest:salt", true))

console.info('Loaded Snowy\'s Recipe Tweaks')