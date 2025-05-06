import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Photo Gallery | Deepak Kumar - Full-Stack Developer",
  description: "Visual showcase of Deepak Kumar's design work, photography, and creative projects.",
};

type PhotoItem = {
  id: number;
  title: string;
  category: string;
  src: string;
  width: number;
  height: number;
};

export default function PhotosPage() {
  // Sample photo gallery data - replace with your actual photos
  const photos: PhotoItem[] = [
    {
      id: 1,
      title: "Website Redesign Project",
      category: "Web Design",
      src: "/photos/placeholder-1.jpg",
      width: 1200,
      height: 800
    },
    {
      id: 2,
      title: "Mobile App Interface",
      category: "UI Design",
      src: "/photos/placeholder-2.jpg",
      width: 800,
      height: 1200
    },
    {
      id: 3,
      title: "Dashboard Analytics",
      category: "Web Development",
      src: "/photos/placeholder-3.jpg",
      width: 1200,
      height: 800
    },
    {
      id: 4,
      title: "E-commerce Product Page",
      category: "Web Design",
      src: "/photos/placeholder-4.jpg",
      width: 1000,
      height: 1000
    },
    {
      id: 5,
      title: "Landing Page Animation",
      category: "Motion Design",
      src: "/photos/placeholder-5.jpg",
      width: 1200,
      height: 800
    },
    {
      id: 6,
      title: "Portfolio Theme",
      category: "Web Design",
      src: "/photos/placeholder-6.jpg",
      width: 1200,
      height: 800
    },
    {
      id: 7,
      title: "Login Screen Prototype",
      category: "UI Design",
      src: "/photos/placeholder-7.jpg",
      width: 800,
      height: 1200
    },
    {
      id: 8,
      title: "Weather App UI",
      category: "Mobile Design",
      src: "/photos/placeholder-8.jpg",
      width: 800,
      height: 1200
    },
    {
      id: 9,
      title: "Corporate Website",
      category: "Web Development",
      src: "/photos/placeholder-9.jpg",
      width: 1200,
      height: 800
    }
  ];

  // Unique categories for filtering
  const categories = Array.from(new Set(photos.map(photo => photo.category)));

  return (
    <div className="py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            My <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Gallery</span>
          </h1>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            A visual showcase of my design work, photography, and creative projects.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          <button className="px-4 py-2 rounded-full bg-foreground text-background font-medium text-sm">
            All
          </button>
          {categories.map((category, index) => (
            <button 
              key={index}
              className="px-4 py-2 rounded-full border border-black/[.08] dark:border-white/[.145] hover:bg-black/[.05] dark:hover:bg-white/[.05] font-medium text-sm"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className="group relative aspect-square overflow-hidden rounded-lg bg-black/5 dark:bg-white/5 hover:shadow-lg transition-all"
            >
              {/* Replace this div with actual images when you have them */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-foreground/40">
                <div className="w-full h-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 flex items-center justify-center">
                  <span>Image Placeholder</span>
                </div>
              </div>
              {/* Uncomment when you have images 
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
              */}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white font-bold">{photo.title}</h3>
                <p className="text-white/70 text-sm">{photo.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
 