export default (url: string): { video_id: string; time_start: number } | null => {
  var rx =
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/;

  var match = url.match(rx);

  var video_id = match?.[6];
  var time_start = parseInt(match?.[7]?.split("=")[1] + "");


  if (!video_id) {
    return null;
  }

  return { video_id, time_start };
};
