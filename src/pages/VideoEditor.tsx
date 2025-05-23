import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/SectionHeading";
import { VideoNoiseReducer } from "@/components/VideoNoiseReducer";
import { SEO } from "@/components/SEO";

export default function VideoEditor() {
  return (
    <Layout>
      <SEO
        title="Video Noise Reducer | Da'sayonce Tools"
        description="Reduce background noise from your videos with our easy-to-use video noise reduction tool."
        keywords="video editing, noise reduction, audio filter, video tools"
      />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Video Noise Reducer</h1>
            <p className="text-xl text-muted-foreground">
              Enhance your video's audio quality by removing unwanted background
              noise
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeading
              title="Clean Up Your Video Audio"
              subtitle="Upload a video and adjust noise reduction settings to enhance audio clarity."
            />

            <VideoNoiseReducer className="mt-6" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="How It Works"
            subtitle="Understanding our noise reduction process"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                <span className="font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Upload</h3>
              <p className="text-muted-foreground">
                Upload your video file with background noise or unwanted audio
                artifacts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                <span className="font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Adjust</h3>
              <p className="text-muted-foreground">
                Fine-tune the noise reduction level and frequency filter to
                target specific types of noise.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                <span className="font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Save</h3>
              <p className="text-muted-foreground">
                Preview the results in real-time and save your noise-reduced
                video when satisfied.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Tips for Best Results"
            subtitle="Get the most out of our noise reduction tool"
            centered
          />

          <div className="max-w-3xl mx-auto mt-8 space-y-6">
            <div className="border-l-4 border-primary pl-6 py-2">
              <h4 className="font-bold">Start with moderate settings</h4>
              <p className="text-muted-foreground">
                Begin with noise reduction at 40-60% and adjust based on
                results. Too high can affect voice quality.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6 py-2">
              <h4 className="font-bold">Target specific frequencies</h4>
              <p className="text-muted-foreground">
                For air conditioner hum or computer fans, try a low frequency
                filter (100-300Hz). For hiss, use higher settings.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6 py-2">
              <h4 className="font-bold">Preview before saving</h4>
              <p className="text-muted-foreground">
                Always listen to your processed audio before finalizing to
                ensure you've found the optimal balance.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6 py-2">
              <h4 className="font-bold">Use good source material</h4>
              <p className="text-muted-foreground">
                While our tool can improve audio quality, starting with the best
                possible recording will yield better results.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
