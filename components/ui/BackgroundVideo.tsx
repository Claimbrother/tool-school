export default function BackgroundVideo() {
  return (
    <div className="fixed inset-0 -z-50 w-full h-full overflow-hidden bg-neutral-900">
      
      {/* Das eigentliche Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
      >
        <source src="/videos/video_preview_h264.mp4" type="video/mp4" />
        Dein Browser unterstützt das Video-Tag nicht.
      </video>

      {/* Optional: Ein Overlay-Gradient, damit dein Liquid-Glass-UI und der Text besser lesbar bleiben */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900/80 pointer-events-none" />
    </div>
  );
}