require 'set'

picks = Set.new []

while picks.length < 6 do
    picks.add(rand(1..49))
end

print picks.sort
