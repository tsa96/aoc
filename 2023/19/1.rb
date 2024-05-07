input = File.read("19/input.txt").split("\n\n")

workflows = input[0].split("\n").to_h do |line|
  [
    /^[a-z]+(?={)/.match(line)[0],
    /(?<={).+(?=})/.match(line)[0].split(',').map do |str|
      s = str.split(':')
      s.length > 1 ?
        {
          type: s[0][0],
          gt: s[0][1] == '>',
          rating: s[0][2..].to_i,
          next: s[1]
        } :
        {
          next: s[0]
        }
    end
  ]
end

parts = input[1].split("\n").map { |line| line[1..-2] }.map do |line|
  line.split(',').map do |s|
    {
      type: s[0],
      value: s[2..].to_i
    }
  end
end

total = parts.sum do |part|
  workflow = workflows["in"]
  loop do
    next_workflow = workflow.each do |rule|
      if rule[:type]
        rating = part.find { |p| p[:type] == rule[:type] }[:value]
        if rule[:gt] ? rating > rule[:rating] : rating < rule[:rating]
          break rule[:next]
        end
      else
        break rule[:next]
      end
    end
    
    if next_workflow == 'A'
      break part.sum {|h| h[:value]}
    elsif next_workflow == 'R'
      break 0
    else
      workflow = workflows[next_workflow]
    end
  end
end

p total