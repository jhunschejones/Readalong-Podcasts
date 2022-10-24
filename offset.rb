require "date"

OFFSET = 0.040

file_to_offset =
  if ARGV[0]
    ARGV[0]
  else
    puts "Drag SRT file here to offset:"
    print "> "
    $stdin.gets.chomp.strip.gsub("\\", "")
  end

raise "Couldn't find file '#{file_to_offset}'" unless File.exists?(file_to_offset)

srt_lines = File.read(file_to_offset).split("\n\n")

# This reads out each line of an SRT then adds 0.04 to the start time
srt_lines.each do |srt_line|
  number, timestamp, line = srt_line.split("\n")
  starttime, endtime = timestamp.split(" --> ")

  new_starttime = DateTime
    .strptime(starttime, "%H:%M:%S,%L")
    .to_time + OFFSET

  # output data like an .srt file again
  puts number
  puts "#{new_starttime.strftime("%H:%M:%S,%L")} --> #{endtime}"
  puts line
  puts ""
end
