# Readalong Podcasts

### Overview
A web app to load SRT transcript files alongside podcast audio for Japanese language learners.

### Local Development
`./bin/run` will start a local development server and open a browser tab with the app running.

For more information about the development server, check out `./server/README.md`.

### Lessons about SRT files
After hand-writing an SRT file from scratch, I noticed it felt like the subtitles were starting just a little too late. This was easy to see when loading them using Language Reactor's built in video player, as playing a specific line cuts off the very start of the line.

As an experiment I used MPV to sync the subtitles to the audio file and it's retimed version had start times 0.04s sooner than what I was doing by hand (i.e. they appear to be subtracting 0.04 from the real start time of each line.) Unfortunately I don't think this is a perfect workaround because it also cuts 0.04 from the end time which I don't think is right.
