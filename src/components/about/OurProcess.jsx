
import Link from "next/link";
import {
  ArrowRight,
  Upload,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ClipboardList,
} from "lucide-react";

const processSteps = [
  {
    number: "01",
    icon: Upload,
    title: "Share Your Images",
    description:
      "Send your images, project requirements, and specific editing instructions.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Expert Editing",
    description:
      "Our team manually edits your images with a focus on precision and natural-looking results.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Quality Review",
    description:
      "Review each image for clean edges, consistency, and attention to detail before delivery.",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Final Delivery",
    description:
      "Receive your finished images in the agreed format, ready for your intended use.",
  },
];

export default function OurProcess() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
            How We Work
          </p>

          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            A Clear Process.
            <span className="block text-white/45">
              A Careful Finish.
            </span>
          </h2>

          <p className="mt-6 leading-8 text-white/60">
            From your first instructions to the final files, our workflow
            keeps communication clear and quality at the center of every
            project.
          </p>
        </div>

        {/* Process steps */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition-colors duration-300 hover:border-amber-400/40 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-semibold text-amber-400/80">
                    {step.number}
                  </span>

                  <div className="rounded-xl bg-amber-400/10 p-3 text-amber-400">
                    <Icon size={23} />
                  </div>
                </div>

                <h3 className="mt-7 text-lg font-semibold">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/55">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* Final CTA */}
        <div className="mt-16 rounded-3xl border border-white/10 bg-white/[0.035] px-6 py-10 text-center sm:px-10 sm:py-14">
          <div className="mx-auto mb-5 inline-flex rounded-full bg-amber-400/10 p-3 text-amber-400">
            <ClipboardList size={27} />
          </div>

          <h3 className="text-2xl font-semibold sm:text-3xl">
            Have a Project in Mind?
          </h3>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-white/60">
            Tell us about your images and requirements. We'll help you
            explore the right image-editing solution for your project.
          </p>

          <Link
            href="/quote"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-7 py-3.5 font-semibold text-black transition-colors hover:bg-amber-300"
          >
            Get a Quote
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
