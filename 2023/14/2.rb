module Rock
  NONE = '.'
  ROUND = 'O'
  SQUARE = '#'
end

module Direction
  CW = true
  CCW = false
end

class Dish
  attr_reader :len, :rows

  def initialize(input)
    @len = input.length
    raise "Weird input!" if @len != input[0].length

    @rows = input.map { |line| line.chars.map { |c|
      case c
      when 'O' then Rock::ROUND
      when '#' then Rock::SQUARE
      else Rock::NONE
      end } }

    # Pretend that North is up when actually we always store everything in east-facing rows for convenience
    rotate(Direction::CW)
  end

  def self.is_sorted(row)
    row.each_with_index do |rock, i|
      if i > 0 and rock == Rock::ROUND and row[i - 1] == Rock::NONE
        return false
      end
    end
    return true
  end

  def tilt
    @rows.each do |row|
      until Dish.is_sorted(row)
        (1..@len - 1).each do |i|
          if row[i] == Rock::ROUND and row[i - 1] == Rock::NONE
            row[i], row[i - 1] = row[i - 1], row[i]
          end
        end
      end
    end
  end

  def total_load
    @rows.map { |x| x.each_with_index.map {
      |y, i| (@len - i) * (y == Rock::ROUND ? 1 : 0)
    }.reduce(:+) }.reduce(:+)
  end

  def get_rotated(rows, direction)
    w = @len - 1
    # rows[y][x] is identity
    # 
    # 1 2  CW   3 1
    # 3 4  ->   4 2
    # 
    # 1 2  CCW  2 4
    # 3 4  ->   1 3
    # 
    (0..w).map { |i| (0..w).map { |j|
      direction == Direction::CCW ? rows[w - j][i] : rows[j][w - i]
    } }
  end

  def rotate(direction)
    @rows = get_rotated(@rows, direction)
  end

  def cycle
    tilt # Tilt N
    (1..3).each do
      # W, S, E
      rotate(Direction::CCW)
      tilt
    end
    rotate(Direction::CCW) # Back to N
  end

  def to_s
    # Simpler code if data is actually "east-facing" when north. 
    get_rotated(@rows, Direction::CCW).map { |row| row.join('') }.join("\n")
  end
end

dish = Dish.new(File.readlines("14/input.txt", chomp: true))

CYCLES = 1000
(1..1000).each do |cycle|
  dish.cycle
  puts "#{cycle} #{dish.total_load}"
end

# Graphing the output of above shows a cycle.
# By viewing output in a text document, it's easy to see it starts at 99,
# with a period of 36.
# (1000000000 - 99) % 36 = 1, so the second value (97241) in the cycle is the correct answer.