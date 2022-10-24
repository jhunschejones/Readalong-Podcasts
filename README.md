# Readalong Podcasts

### Overview
A web app to load SRT transcript files alongside podcast audio for Japanese language learners.

### Local Development
`./bin/run` will start a local development server and open a browser tab with the app running.

For more information about the development server, check out `./server/README.md`.

### Lessons about SRT files
After hand-writing an SRT file from scratch, I noticed it felt like the subtitles were starting just a little too late. This was easy to see when loading them using Language Reactor's built in video player, as playing a specific line cuts off the very start of the line.

As an experiment I used MPV to sync the subtitles to the audio file and it's retimed version had start times 0.06s sooner than what I was doing by hand (i.e. they appear to be subtracting 0.06 from the real start time of each line.)

To solve this problem, I added the `offset.rb` script which can be run with a hand-written SRT file to subtract 0.060s from the start time of every line in the SRT without affecting the end times (like retiming the subs would do.) This allows me to continue hand-writing SRT files using the exact start and stop times in the audio, then adjust the offset for kinder performance in subtitle readers.
