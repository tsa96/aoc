input = File.read("19/input.txt").split("\n\n")

$workflows = input[0].split("\n").to_h do |line|
  [
    /^[a-z]+(?={)/.match(line)[0],
    /(?<={).+(?=})/.match(line)[0].split(',').map do |str|
      s = str.split(':')
      s.length > 1 ?
        {
          type: s[0][0],
          lt: s[0][1] == "<",
          rating: s[0][2..].to_i,
          next: s[1]
        } :
        {
          next: s[0]
        }
    end
  ]
end

$sum = 0

def do_workflow(workflow, ranges, visited)
  workflow.each do |rule|
    type, nxt, lt, rating = [rule[:type], rule[:next], rule[:lt], rule[:rating]]

    idx = lt ? 0 : 1
    opp_idx = (idx - 1) * -1
    if !type or lt ? (ranges[type][idx] < rating) : (ranges[type][idx] > rating)
      new_ranges = Marshal.load(Marshal.dump(ranges))
      if type
        new_ranges[type][opp_idx] = rating + (lt ? -1 : 1)
      end

      if nxt == 'A'
        pp visited
        $sum += new_ranges.values.map { |r| r[1] - r[0] + 1 }.reduce(:*)
      elsif nxt != 'R'
        do_workflow($workflows[nxt], new_ranges, visited + " -> #{nxt}")
      end

      unless type
        break
      end
    end

    cmp = [rating, ranges[type][idx]]
    ranges[type][idx] = lt ? cmp.max : cmp.min
  end
end

do_workflow($workflows["in"], { "x" => [1, 4000], "m" => [1, 4000], "a" => [1, 4000], "s" => [1, 4000] }, "in")

p $sum
