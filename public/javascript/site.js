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
    millisToTimestamp: (millis) => {
      // creating an .srt timestamp here Hours:Minutes:Seconds,Milliseconds
      return new Date(millis).toISOString().slice(11, 23).replace(".", ",");
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    app.audioPlayer = document.querySelector("#audio-player");

    fetch("public/audio/nihongo-switch-E001.srt")
      .then((resp) => resp.text())
      .then((rawSrt) => console.log(rawSrt));

    app.audioPlayer.addEventListener("timeupdate", (event) => {
      // event.target.currentTime is a floating point value in seconds
      const currentTimestamp = app.millisToTimestamp(event.target.currentTime * 1000);
      console.log(currentTimestamp);

      const startTime = app.dateFromTimestamp("00:03:28,000");
      const endTime = app.dateFromTimestamp("00:03:30,000");
      const currentTime = app.dateFromTimestamp(currentTimestamp);
      console.log(currentTime >= startTime && currentTime <= endTime);
    });
  });
})();
