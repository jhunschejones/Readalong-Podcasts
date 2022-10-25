(() => {
  const app = {
    dateFromTimestamp: (string) => {
      // Convert .srt timestamp (Hours:Minutes:Seconds,Milliseconds) into a date object
      let date = new Date();
      let [hours, minutes, secondsPlusMilis] = string.split(":");
      let [seconds, millis] = secondsPlusMilis.split(",");
      date.setHours(+hours); // Set the hours, using implicit type coercion
      date.setMinutes(minutes);
      date.setSeconds(seconds);
      date.setMilliseconds(millis);
      return date;
    },
    // millisToTimestamp: (millis) => {
    //   // creating an .srt timestamp here Hours:Minutes:Seconds,Milliseconds
    //   return new Date(millis).toISOString().slice(11, 23).replace(".", ",");
    // },
    timestampToSeconds: (timestamp) => {
      // takes an .srt style timestamp and converts it to a floating point milliseconds value
      const date = app.dateFromTimestamp(timestamp)
      return (date.getHours() * 3600) + (date.getMinutes() * 60) + date.getSeconds() + (date.getMilliseconds() / 1000);
    },
    buildSentences: (rawSrt) => {
      const lines = rawSrt.split("\n\n");
      lines.forEach(line => {
        const [lineNumber, timestamp, sentenceText] = line.split("\n");
        const [startTime, endTime] = timestamp.split(" --> ");
        const sentence = document.createElement("p");
        sentence.textContent = sentenceText;
        sentence.classList.add("sentence");
        sentence.setAttribute("id", `line-${lineNumber}`);
        sentence.dataset.startTime = startTime;
        sentence.dataset.endTime = endTime;
        app.sentencesContainer.appendChild(sentence);
        sentence.addEventListener("click", () => {
          app.playSentence(startTime, endTime);
        });
      });
    },
    playSentence: (startTime, endTime) => {
      // it feels like we need additional offset here so the browser can keep up
      app.audioPlayer.currentTime = app.timestampToSeconds(startTime) - 0.1;
      app.endTime = app.timestampToSeconds(endTime);
      app.audioPlayer.play();
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    app.audioPlayer = new Audio(document.querySelector("#sentences-container").dataset.audioSrc);
    app.sentencesContainer = document.querySelector("#sentences-container");

    fetch("public/audio/nihongo-switch-E001.srt")
      .then((resp) => resp.text())
      .then((rawSrt) => app.buildSentences(rawSrt));

    app.audioPlayer.addEventListener("timeupdate", (event) => {
      if (app.endTime) {
        // event.target.currentTime is a floating point value in seconds
        if (event.target.currentTime >= app.endTime) {
          app.audioPlayer.pause();
          app.endTime = undefined;
        }
      }
    });
  });
})();
