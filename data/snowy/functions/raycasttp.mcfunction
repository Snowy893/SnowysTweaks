# I wanted to see if I could get a version of this to work nicely
# without having it offset upwards but still be based off of where you're aiming,
# but my implementation made the player teleport into the ground sometimes
# because it just subtracted the y coord.
#
# The current logic that's here lets you clip through stuff and put your head in the ceiling.
# 
# I don't think I can make a version of this that's not jank in some way, so it's staying how it is for now.
execute anchored eyes run tp @s ^ ^ ^10