# First idea: Similar to a previous day, find a path, then for every tile
# not on that path, probe towards any edge and count number of intersections.
# If odd, the tile is in the interior.
# 
# Is there a simpler method? Can we count the interior as we go?
# Idea: count interior chunks like this
#
# ####### #######
# #IIIII# #
# #IIIII###
#
# As soon as we start moving left or right, we've created 3 edges of a square,
# which we know much be sealed. Maybe some annoying shapes to handle like
#
# ##############
# #IIIIIIIIIIII#
# #########IIII#
#         #IIII#
# ####### #IIII#
# #IIIII# #IIII#
# #IIIII###IIII#
# #IIIIIIIIIIII#
# ##############
#
# We know that shape is sealed, so must eventually make a N->E immediately
# followed by E->S for every open section.
#
# We could read in the input data as a graph, don't know terminology,
# but could be stored as a cyclic doubly linked-list. The colour data stuff
# suggests edges are important to part 2 so may work well there.
#
# Just filling in concave stuff shouldn't work, as example shows:
#
# ####### ?s are a nightmare to account for (left). Not sure a greedy
# #.....# algorithm that may fill the tile multiple times could handle
# ###?..# for it?
# ..#?..# 
# ..#?..# Though any three nodes will form *either* a concave or convex
# ###.XX# half-rectangle. Can we use that? X-marked bits are like taking
# #...X.. a bite out of a large rectangle.
# ##..XX#
# .#....# There's definitely an elegant algorithm lurking around here (that
# .###### I should probably know already :D)
#
# Playing around with pen and paper I can't come up with anything that allows
# us to add/remove areas by just traversing a linked list. Can't figure out
# an algorithm to recompose into triangles without a ton of annoying geometry. 
# I could do my ugly previous approach but doubt it'll be applicable for part 2.
# So, I'm gonna learn something new and read up on the theory. Maybe cheating but whatever!

# So,
# Shoestring formula: A = 0.5 * sum (of all i=0, i<n) y * (x_i-1 - x_i+1)
# Pick's theorem: A = interior points + (boundary points / 2) - 1
# ∴ interior points = A - b/2 +  1

with open("input.txt") as f:
	input = [l.split() for l in f.readlines()]
	
v = [(0, 0)]
b = 0
x, y = 0, 0
for dir, dist, _ in input:
	match dir:
		case 'U': dx, dy =  0, -1
		case 'R': dx, dy =  1,  0
		case 'D': dx, dy =  0,  1
		case  _ : dx, dy = -1,  0
	dist = int(dist)
	b += dist
	x += dx * dist
	y += dy * dist
	v.append((x, y))

A = 0.5 * sum(y * (v[(i - 1) % len(v)][0] - v[(i + 1) % len(v)][0]) for i, (_, y) in enumerate(v))
interior = int(A - b/2 + 1)
total = interior + b

print(total)