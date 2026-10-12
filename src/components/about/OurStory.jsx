
import { Target, CheckCircle2, Sparkles } from "lucide-react";

const values = [
  "Precision in every detail",
  "Consistency across every project",
  "Commitment to client requirements",
  "Careful attention to image quality",
];

export default function OurStory() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left: Mission and values */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-10">
          <div className="mb-8 flex items-center gap-4">
            <div className="rounded-2xl bg-amber-400/10 p-4 text-amber-400">
              <Target size={30} />
            </div>

            <div>
              <p className="text-sm text-white/45">Our mission</p>
              <h3 className="text-xl font-semibold">
                Making Images Work Harder.
              </h3>
            </div>
          </div>

          <p className="text-base leading-8 text-white/65">
            Great product photography deserves equally great post-production.
            We focus on the details that help businesses communicate quality,
            build confidence, and maintain a consistent visual identity.
          </p>

          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-sm font-medium uppercase tracking-widest text-amber-400">
              Our Core Values
            </p>

            <div className="mt-5 space-y-4">
              {values.map((value) => (
                <div key={value} className="flex items-start gap-3">
                  <CheckCircle2
                    size={19}
                    className="mt-1 shrink-0 text-amber-400"
                  />
                  <p className="text-sm leading-6 text-white/70">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Our story */}
        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
            Who We Are
          </p>

          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Thoughtful Editing.
            <span className="block text-white/45">
              Professional Results.
            </span>
          </h2>

          <p className="mt-7 leading-8 text-white/65">
            Prism Studio focuses on professional image post-production
            for businesses, photographers, agencies, and online retailers.
            We believe the best editing enhances an image without losing
            what makes the original photograph special.
          </p>

          <p className="mt-5 leading-8 text-white/65">
            Our approach combines skilled manual editing, clear communication,
            and careful quality checks to deliver images that meet each
            project's requirements.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <div className="rounded-xl bg-amber-400/10 p-3 text-amber-400">
              <Sparkles size={22} />
            </div>

            <div>
              <p className="font-medium text-white">
                Quality Comes First
              </p>
              <p className="mt-1 text-sm text-white/50">
                Every image deserves careful attention.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
