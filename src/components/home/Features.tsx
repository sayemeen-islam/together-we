import {
  CalendarDays,
  HandHeart,
  MapPin,
  Users,
} from "lucide-react";

const features = [
  {
    icon: CalendarDays,
    title: "Discover Events",
    description:
      "Find upcoming community events and explore opportunities to contribute.",
    color: "bg-[#F5E7E1] text-[#C76B4A]",
  },
  {
    icon: HandHeart,
    title: "Make an Impact",
    description:
      "Join meaningful initiatives and turn your willingness to help into action.",
    color: "bg-[#E9EDDF] text-[#687A45]",
  },
  {
    icon: Users,
    title: "Build Connections",
    description:
      "Meet like-minded people who share your passion for helping communities.",
    color: "bg-[#F5E7E1] text-[#C76B4A]",
  },
  {
    icon: MapPin,
    title: "Support Locally",
    description:
      "Take part in local activities and help make your neighborhood better.",
    color: "bg-[#E9EDDF] text-[#687A45]",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#687A45]">
            What We Offer
          </span>
          <h2 className="mt-3 text-3xl font-bold text-[#30352B] sm:text-4xl">
            One Platform, Many Ways to Help
          </h2>
          <p className="mt-4 leading-7 text-[#77766F]">
            Everything you need to discover opportunities, connect with
            others, and make a positive difference.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-2xl border border-[#EAE5DF] bg-[#FAF8F5] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl ${feature.color}`}
                >
                  <Icon size={27} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#30352B]">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#77766F]">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}