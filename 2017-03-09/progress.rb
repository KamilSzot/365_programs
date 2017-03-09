
def p(*strs)
  strs.each { |str| print str }
  $stdout.flush
end

require "curses"
include Curses
 
init_screen
begin
    curs_set(0) #invisible cursor
    puts
    11.times do |i|
        p "\x0D", "#" * (10-i), "=" * i, " ", "%3d %% Oxygen" % (100*(10-i)/10.0)
        sleep 1
    end
ensure
  close_screen
end