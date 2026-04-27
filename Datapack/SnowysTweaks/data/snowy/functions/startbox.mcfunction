gamerule spawnRadius 0
execute in minecraft:overworld run fill -4 86 4 -28 92 28 barrier hollow
execute in minecraft:the_nether run fill -5 63 -1 4 63 5 barrier keep
execute in minecraft:the_nether run fill -5 67 -1 4 67 5 barrier keep
execute in minecraft:the_nether run fill -5 63 5 -5 67 -1 barrier keep
execute in minecraft:the_nether run fill 4 63 5 4 67 -1 barrier keep
execute in minecraft:the_nether run fill -5 63 5 4 67 5 barrier keep
execute in minecraft:the_nether run fill -5 63 -1 4 67 -1 barrier keep
execute in minecraft:overworld run fill -16 128 24 -16 128 24 repeating_command_block{powered: 0b, auto: 1b, UpdateLastExecution: 1b, conditionMet: 1b, Command: "execute as @a[x=-16,y=93,z=16,distance=..2] run tp @s -16 87 16", TrackOutput:0b}