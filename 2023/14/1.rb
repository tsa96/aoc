module Rock
  NONE = 0
  ROUND = 1
  SQUARE = 2
end

class Dish
  attr_reader :len, :rows

  def initialize(input)
    @len = input.length
    raise "Weird input!" if @len != input[0].length

    @rows = *(0..@len - 1).map { |i| (0..@len - 1).map { |j|
      case input[j][i]
      when 'O' then Rock::ROUND
      when '#' then Rock::SQUARE
      else Rock::NONE
      end
    } }
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

  def to_s
    @rows.map { |row| row.join(' ') }.join("\n")
  end
end

dish = Dish.new(File.readlines("14/input.txt", chomp: true)) # chomp :D
puts dish.to_s
puts "Tilting"
dish.tilt
puts dish.to_s
puts "Total load"
puts dish.total_load

# This was my first ever Ruby program. This language is really cool!!