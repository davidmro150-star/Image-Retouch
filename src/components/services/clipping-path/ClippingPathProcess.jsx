
import Link from "next/link";
import {
  ArrowRight,
  Upload,
  PenTool,
  ScanSearch,
  Download,
  Scissors,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Submit Your Images",
    description:
      "Share your product images along with your background and file-format requirements.",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Manual Path Creation",
    description:
      "Our editors carefully draw paths around the required objects and product contours.",
  },
  {
    number: "03",
    icon: ScanSearch,
    title: "Edge Inspection",
    description:
      "We inspect the paths and cutouts for accuracy, smooth edges, and missing details.",
  },
  {
    number: "04",
    icon: Download,
    title: "Final Delivery",
    description:
      "Receive your completed images in the agreed format for your workflow.",
  },
];

export default function ClippingPathProcess() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
            How We Work
          </p>

          <h2 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
            Precision at Every Step.
          </h2>

          <p className="mt-6 leading-8 text-white/60">
            Our workflow prioritizes accurate paths, careful edge
            inspection, and dependable delivery.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ number, icon: Icon, title, description }) => (
            <article key={number}>
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-black">
                  {number}
                </span>

                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-400/40 text-amber-400">
                  <Icon size={24} />
                </div>
              </div>

              <h3 className="mt-6 text-lg font-semibold">{title}</h3>

              <p className="mt-3 text-sm leading-7 text-white/55">
                {description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-6 rounded-3xl border border-amber-400/50 bg-white/[0.025] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div className="flex items-center gap-4">
            <div className="hidden rounded-full border border-amber-400/40 p-4 text-amber-400 sm:block">
              <Scissors size={28} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                Ready to Get Started?
              </p>

              <h3 className="mt-2 text-xl font-semibold sm:text-2xl">
                Give Your Products a Clean Finish.
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/55">
                Tell us about your clipping path requirements.
              </p>
            </div>
          </div>

          <Link
            href="/quote"
            className="inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-amber-400 px-6 py-3.5 font-semibold text-black transition-colors hover:bg-amber-300"
          >
            Get a Quote
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
