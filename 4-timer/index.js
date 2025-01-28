function convertToHours(timerArray) {
    let correctArr = timerArray.slice(2);
    let res = correctArr.map((element) => Number(element));
    return (res[0] * 3600 + res[1] * 60 + res[2]) * 1000;
  }
  
  (function(args) {
    args = process.argv.slice(2);
  
    if (args.some((item) => isNaN(item))) throw new Error("Проверьте корректность чисел");
    
    if (args.length == 1) {
      let timer = Number(args[0] * 1000);
      timing(timer);
      console.log(`Таймер установлен на: ${args[0]} секунд.`);
    } else if (args.length == 3) {
      let timer = convertToHours(process.argv);
      timing(timer);
      console.log(`Таймер установлен на: ${args[0]} час, ${args[1]} минут и ${args[2]} секунд.`);
    } else {
      console.log("Добавьте три аргумента в формате час-имнут-секунда...");
    }
  })()
  
  function timing(time) {
    function formatTime(totalSeconds) {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return `${String(hours).padStart(2, "0")} час, ${String(minutes).padStart(
        2,
        "0"
      )} минут и ${String(seconds).padStart(2, "0")} секунд`;
    }
  
    let totalSeconds = Math.floor(time / 1000);
    const interval = setInterval(() => {
      console.log(`Таймер выполнится через: ${formatTime(totalSeconds)}`);
      --totalSeconds;
    }, 1000);
  
    setTimeout(() => {
      console.log("Таймер выполнился");
      clearInterval(interval);
    }, time);
  }