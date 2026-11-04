
import { Camera } from "lucide-react";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1758599668429-121d54188b9c?w=700&q=85",
    alt: "Volunteers cleaning a park and collecting litter in trash bags",
    title: "Community Cleanup Drive",
    size: "sm:col-span-2 sm:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1755599629285-91cc09a185c7?w=700&q=85",
    alt: "Volunteers stacking food boxes for community distribution",
    title: "Food Distribution Drive",
    size: "",
  },
  {
    src: "https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?w=700&q=85",
    alt: "A volunteer donating blood during a blood donation drive",
    title: "Blood Donation Camp",
    size: "",
  },
  {
    src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=700&q=85",
    alt: "Environmental conservation and nature protection activity",
    title: "Environmental Conservation",
    size: "",
  },
  {
    src: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=700&q=85",
    alt: "People collaborating and participating in community service",
    title: "Community Support",
    size: "",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#687A45]">
            <Camera size={17} />
            Our Impact in Pictures
          </span>

          <h2 className="mt-3 text-3xl font-bold text-[#30352B] sm:text-4xl">
            Moments That Brought Us Together
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#77766F] sm:text-base">
            Take a look back at community service activities that bring
            people together to create positive change through kindness,
            teamwork, and service.
          </p>
        </div>

        <div className="grid auto-rows-[190px] grid-cols-1 gap-4 sm:auto-rows-[220px] sm:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((image) => (
            <div
              key={image.title}
              className={`group relative overflow-hidden rounded-2xl ${image.size}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

              <h3 className="absolute bottom-5 left-5 text-lg font-semibold text-white">
                {image.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
