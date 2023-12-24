require 'set'

$grid = File.read("23/input.txt").split("\n")
$d = [[0, 1, 0, -1], [-1, 0, 1, 0]]
$len = $grid.length

def possible_neighbours(pos, visited)
  [0, 1, 2, 3].filter_map do |k|
    nx, ny = pos[0] + $d[0][k], pos[1] + $d[1][k]
    if nx < 0 or ny < 0 or nx >= $len or ny >= $len
      next
    end

    tile = $grid[ny][nx]
    if tile == '#'
      next
    end

    if visited === [nx, ny]
      next
    end

    [nx, ny]
  end
end

def scan_edge(pos, last)
  dist = 0
  visited = Set[last]
  while true
    if pos[0] == ($len - 2) and pos[1] == ($len - 1)
      return [pos, true, dist]
    end

    if pos[0] == 1 and pos[1] == 0 and last != [1, 0]
      return [pos, false, dist]
    end

    possible_next = possible_neighbours(pos, visited)
    if possible_next.length == 0
      return nil
    elsif possible_next.length == 1
      visited << pos
      pos = possible_next[0]
      dist += 1
      next
    end

    return [pos, possible_next, dist + 1]
  end
end

def gen_graph_recursive(last_node, start_next)
  pos2, possible_next, dist = scan_edge(start_next, last_node)
  if $graph[last_node] # does ruby have better way of doing this? do i care?
    if $graph[last_node].include?([pos2, dist])
      return
    end
    $graph[last_node] << [pos2, dist]
  else
    $graph[last_node] = [[pos2, dist]]
  end
  
  if possible_next == true or possible_next == nil # reached end
    return
  end
  
  if last_node != [1, 0] and possible_next == false # start
    return
  end

  possible_next.each do |next_pos|
    if last_node == next_pos
      next
    end
    unless $graph.key(pos2)
      gen_graph_recursive(pos2, next_pos)
    end
  end
end

$graph = {}

gen_graph_recursive([1, 0], [1, 0])
pp $graph

$dists = []

def traverse_graph(node, dist, set)
  if node[0] == ($len - 2) and node[1] == ($len - 1)
    $dists << dist
    return
  end

  $graph[node].each do |(next_node, next_dist)|
    unless set === next_node
      new_set = set.clone
      new_set << next_node
      traverse_graph(next_node, dist + next_dist, new_set)
    end
  end
end

traverse_graph([1, 0], 0, Set[nil, nil])
p $dists.length 
p $dists.max

# This is probably the shittiest solution I've written to one of these questions.
# It also takes about 3 minutes to complete. I'm really tired!!
