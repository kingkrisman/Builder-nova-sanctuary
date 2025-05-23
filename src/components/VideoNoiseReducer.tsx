import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UploadCloud, Volume2, VolumeX, Play, Pause, Save } from "lucide-react";

interface VideoNoiseReducerProps {
  className?: string;
}

export function VideoNoiseReducer({ className }: VideoNoiseReducerProps) {
  // Refs for media elements and processing nodes
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Audio context and nodes
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const analyserNodeRef = useRef<AnalyserNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);

  // UI state
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [processingEnabled, setProcessingEnabled] = useState(true);
  const [noiseReductionLevel, setNoiseReductionLevel] = useState(50);
  const [filterFrequency, setFilterFrequency] = useState(800);

  // Initialize audio processing when video is loaded
  useEffect(() => {
    if (!videoRef.current || !videoLoaded) return;

    // Initialize audio context on first load or after user interaction
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();

      // Create audio processing nodes
      sourceNodeRef.current = audioContextRef.current.createMediaElementSource(
        videoRef.current,
      );
      gainNodeRef.current = audioContextRef.current.createGain();
      analyserNodeRef.current = audioContextRef.current.createAnalyser();
      filterNodeRef.current = audioContextRef.current.createBiquadFilter();

      // Configure nodes
      filterNodeRef.current.type = "lowpass";
      filterNodeRef.current.frequency.value = filterFrequency;
      filterNodeRef.current.Q.value = 1;

      // Connect the nodes
      sourceNodeRef.current.connect(filterNodeRef.current);
      filterNodeRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(analyserNodeRef.current);
      analyserNodeRef.current.connect(audioContextRef.current.destination);
    }

    // Update filter settings when slider changes
    if (filterNodeRef.current) {
      filterNodeRef.current.frequency.value = filterFrequency;
    }

    // Apply gain/volume based on noise reduction (inverse relationship)
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = processingEnabled
        ? 1 - noiseReductionLevel * 0.005
        : 1;
    }
  }, [videoLoaded, processingEnabled, noiseReductionLevel, filterFrequency]);

  // Clean up audio context on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Handle video file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files[0]) return;

    const file = files[0];
    setVideoFile(file);

    // Create object URL for video element
    const videoURL = URL.createObjectURL(file);
    if (videoRef.current) {
      videoRef.current.src = videoURL;
      videoRef.current.onloadeddata = () => {
        setVideoLoaded(true);
      };
    }
  };

  // Handle video playback controls
  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      // Resume AudioContext if it was suspended (browser policy)
      if (audioContextRef.current?.state === "suspended") {
        audioContextRef.current.resume();
      }
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  // Save processed video (would require server-side processing for actual noise reduction)
  const saveProcessedVideo = () => {
    alert(
      "Full video noise processing requires server-side processing. This would typically send the video to a server with advanced audio processing capabilities.",
    );

    // In a real implementation, you would:
    // 1. Capture the current audio settings
    // 2. Send the video to a server endpoint
    // 3. Process with a dedicated audio library (e.g., ffmpeg)
    // 4. Return the processed video for download
  };

  // Trigger file input click
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`flex flex-col space-y-6 ${className}`}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Video Noise Reducer</CardTitle>
          <CardDescription>
            Upload a video to reduce background noise and enhance audio clarity
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Video Preview */}
          <div className="relative aspect-video bg-slate-950 rounded-md overflow-hidden flex items-center justify-center">
            {!videoLoaded ? (
              <div
                className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
                onClick={handleUploadClick}
              >
                <UploadCloud className="w-12 h-12 text-slate-400 mb-2" />
                <p className="text-slate-400">Click to upload a video</p>
              </div>
            ) : (
              <video
                ref={videoRef}
                className="w-full h-full"
                controls={false}
                onEnded={() => setIsPlaying(false)}
              />
            )}
          </div>

          {/* Video Controls */}
          {videoLoaded && (
            <div className="space-y-6">
              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-4">
                <Button variant="outline" size="icon" onClick={togglePlayPause}>
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Noise Reduction Controls */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="noise-toggle"
                    className="cursor-pointer flex items-center gap-2"
                  >
                    {processingEnabled ? (
                      <Volume2 className="h-4 w-4" />
                    ) : (
                      <VolumeX className="h-4 w-4" />
                    )}
                    Noise Reduction
                  </Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setProcessingEnabled(!processingEnabled)}
                  >
                    {processingEnabled ? "Enabled" : "Disabled"}
                  </Button>
                </div>

                <Slider
                  disabled={!processingEnabled}
                  value={[noiseReductionLevel]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setNoiseReductionLevel(value[0])}
                />

                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>{noiseReductionLevel}%</span>
                  <span>High</span>
                </div>
              </div>

              {/* Frequency Filter */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="filter-frequency">
                    Frequency Filter (Hz)
                  </Label>
                  <span className="text-sm">{filterFrequency} Hz</span>
                </div>

                <Slider
                  value={[filterFrequency]}
                  min={100}
                  max={20000}
                  step={100}
                  onValueChange={(value) => setFilterFrequency(value[0])}
                  disabled={!processingEnabled}
                />

                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low (100Hz)</span>
                  <span>Mid</span>
                  <span>High (20kHz)</span>
                </div>
              </div>
            </div>
          )}

          {/* Hidden file input */}
          <Input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleUploadClick}>
            <UploadCloud className="mr-2 h-4 w-4" />
            {videoLoaded ? "Change Video" : "Upload Video"}
          </Button>

          {videoLoaded && (
            <Button
              onClick={saveProcessedVideo}
              disabled={!processingEnabled || !videoLoaded}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Processed Video
            </Button>
          )}
        </CardFooter>
      </Card>

      <div className="text-sm text-muted-foreground">
        <p>
          <strong>Note:</strong> This component provides real-time noise
          filtering during playback. For more advanced noise cancellation,
          server-side processing with dedicated audio libraries would be
          required.
        </p>
        <p className="mt-2">
          Lower frequency filters help reduce background hum and rumble, while
          higher noise reduction levels help with static noise.
        </p>
      </div>
    </div>
  );
}

export default VideoNoiseReducer;
