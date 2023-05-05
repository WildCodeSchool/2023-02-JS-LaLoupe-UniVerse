import video from "../assets/video.mp4";

export default function Video() {
  return (
    <div className="min-h-screen">
      <video controls src={video} className="m-auto mt-14">
        <track default kind="captions" src="/media/examples/friday.vtt" />
      </video>
    </div>
  );
}
