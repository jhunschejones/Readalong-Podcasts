require "date"

OFFSET = 0.060

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

srt_lines.each do |srt_line|
  number, timestamp, line = srt_line.split("\n")
  starttime, endtime = timestamp.split(" --> ")

  new_starttime = DateTime
    .strptime(starttime, "%H:%M:%S,%L")
    .to_time - OFFSET

  # output data like an .srt file again, rounding MS up to 10ths place for now
  puts number
  puts "#{new_starttime.round(2).strftime("%H:%M:%S,%L")} --> #{endtime}"
  puts line
  puts ""
end
