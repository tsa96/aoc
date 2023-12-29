require 'set'

class Node
  attr_accessor :name, :neighbours

  def initialize(name)
    @name = name
    @neighbours = []
  end
end

def parse
  lines = File.read('25/input.txt').lines(chomp: true)
  nodes = Set.new(lines.flat_map { |l| l.sub(':', '').split }).reduce({}) { |hash, name| hash[name] = Node.new(name); hash }
  lines.each do |line|
    node = nodes[/^.+(?=:)/.match(line)[0]]
    /(?<=: ).+$/.match(line)[0].split.each do |con|
      unless node.neighbours.include?(con)
        node.neighbours << con
      end
      unless nodes[con].neighbours.include?(node.name)
        nodes[con].neighbours << node.name
      end
    end
  end
  nodes
end

lines = parse
pp lines