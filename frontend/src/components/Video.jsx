import video from "../assets/video.mp4";

export default function Video() {
  return (
    <video controls src={video} className="m-auto">
      <track default kind="captions" src="/media/examples/friday.vtt" />
    </video>
  );
}
