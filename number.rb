file_to_number =
  if ARGV[0]
    ARGV[0]
  else
    puts "Drag file here to number:"
    print "> "
    $stdin.gets.chomp.strip.gsub("\\", "")
  end

raise "Couldn't find file '#{file_to_number}'" unless File.exists?(file_to_number)

real_line_number = 1
file_lines = File.read(file_to_number).split("\n\n")

# For creating .srt files this reads out each line then adds a number and a newline
file_lines.each do |line|

  line_without_line_number = line
    .split("\n")
    # If there are already line numbers in this file, remove them
    .map { |bit| bit.to_i.to_s == real_line_number.to_s ? nil : bit.strip }
    .compact
    .join("\n")

  puts real_line_number
  puts line_without_line_number
  puts "" unless real_line_number == file_lines.size

  real_line_number += 1
end

# NOTE: the format for an .srt file is:
# line number
# timestamp
# line

# 1
# 00:00:00,000 --> 00:00:00,000
# 山本郁の日本語スイッチ

# Timestamps have milliseconds to three decimal points after the comma
# Hours:Minutes:Seconds,Milliseconds
