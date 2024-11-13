function clock() {
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();

  let console_clock_log =
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  return console_clock_log;
}

function color_success() {
  return "\x1b[32m%s\x1b[0m";
}

function color_warning() {
  return "\x1b[33m%s\x1b[0m";
}

function log_success(message: string) {
  console.log(color_success(), `[${clock()}] ` + message);
}

function log_warning(message: string) {
  console.log(color_warning(), `[${clock()}] ` + message);
}

export { log_success, log_warning };
