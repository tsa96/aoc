require 'set'

$grid = File.read("23/input.txt").split("\n")
$paths = []
$d = [[0, 1, 0, -1], [-1, 0, 1, 0]] # being fancy with something from prev day's answer
$len = $grid.length

def explore_path(pos, dist, searched, dir)
  while true
    if pos[0] == ($len - 2) and pos[1] == ($len - 1)
      $paths << dist
      break
    end

    possible_next = *(0..3).filter_map do |k|
      nx, ny = pos[0] + $d[0][k], pos[1] + $d[1][k]
      if nx < 0 or ny < 0 or nx >= $len or ny >= $len
        next
      end

      tile = $grid[ny][nx]
      if tile == '#'
        next
      end

      if searched === [nx, ny]
        next
      end

      if tile == '>' and (dir == 3 or ($grid[ny][nx + 1] == '#' or searched === [nx + 1, ny]))
        next
      end
      
      if tile == 'v' and (dir == 0 or ($grid[ny + 1][nx] == '#' or searched === [nx, ny + 1]))
        next
      end

      [[nx, ny], k]
    end

    if possible_next.length == 0
      break
    end

    pos, dir = possible_next.pop
    possible_next.each do |(pos2, dir2)|
      new_set = searched.clone
      new_set << pos2
      explore_path(pos2, dist + 1, new_set, dir2)
    end

    searched << pos
    dist += 1
  end
end

explore_path([1, 0], 0, Set[], [0, 1])

pp $paths
pp $paths.max

