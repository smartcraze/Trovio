import bcrypt from "bcryptjs";
import User from "./models/User";
import dbConnect from "./mongodb";

export async function seedDatabase() {
  await dbConnect();

  const count = await User.countDocuments();
  if (count > 0) {
    console.log("Database already seeded with", count, "users.");
    return;
  }

  console.log("Seeding database with 3 default creator profiles...");

  const defaultPasswordHash = await bcrypt.hash("password123", 10);

  const creators = [
    {
      username: "creative_mind",
      password: defaultPasswordHash,
      name: "Elena Rostova",
      bio: "Digital Artist & Creative Director. Creating visual stories that blend surrealism and warm futuristic aesthetics.",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80",
      theme: "sunset-boulevard",
      socials: {
        instagram: "https://instagram.com/elena_design",
        twitter: "https://twitter.com/elena_draws",
        website: "https://elena.design",
      },
      links: [
        {
          id: "link-elena-1",
          title: "My Creative Portfolio",
          url: "https://elena.design/portfolio",
          isDeepLink: false,
          clickCount: 245,
        },
        {
          id: "link-elena-2",
          title: "Follow my Behance",
          url: "https://behance.net/elena_design",
          isDeepLink: true,
          clickCount: 189,
        },
        {
          id: "link-elena-3",
          title: "YouTube Channel - Vlogs & Process",
          url: "https://youtube.com/@elena_design",
          isDeepLink: true,
          clickCount: 312,
        },
      ],
      products: [
        {
          id: "prod-elena-1",
          title: "Surreal Color Grading LUTs",
          description:
            "Transform your photos and videos with my custom Lightroom and Premiere LUTs.",
          price: 29,
          imageUrl:
            "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80",
          purchaseUrl: "https://buy.stripe.com/mock_elena_1",
        },
        {
          id: "prod-elena-2",
          title: "Photoshop Masterclass: Advanced Composition",
          description:
            "Learn how to blend lighting, shadows, and perspective to create stunning surreal compositions.",
          price: 79,
          imageUrl:
            "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80",
          purchaseUrl: "https://buy.stripe.com/mock_elena_2",
        },
      ],
    },
    {
      username: "tech_lead",
      password: defaultPasswordHash,
      name: "Alex Mercer",
      bio: "Software Engineer & Open Source Advocate. Building high-performance microservices and modern web apps.",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80",
      theme: "tech-innovation",
      socials: {
        github: "https://github.com/alex_mercer",
        twitter: "https://twitter.com/alex_dev",
        website: "https://mercer.dev",
      },
      links: [
        {
          id: "link-alex-1",
          title: "GitHub Repositories",
          url: "https://github.com/alex_mercer",
          isDeepLink: true,
          clickCount: 512,
        },
        {
          id: "link-alex-2",
          title: "Personal Technical Blog",
          url: "https://mercer.dev/blog",
          isDeepLink: false,
          clickCount: 389,
        },
        {
          id: "link-alex-3",
          title: "Join my Tech Newsletter",
          url: "https://mercer.substack.com",
          isDeepLink: false,
          clickCount: 672,
        },
      ],
      products: [
        {
          id: "prod-alex-1",
          title: "Next.js 16 Production Starter Kit",
          description:
            "Fully configured boilerplates with Tailwind CSS, Biome, MongoDB, and NextAuth. Save 20+ hours.",
          price: 49,
          imageUrl:
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
          purchaseUrl: "https://buy.stripe.com/mock_alex_1",
        },
        {
          id: "prod-alex-2",
          title: "System Design: Zero to Scale Course",
          description:
            "Master databases, load balancers, caching, and scalability patterns for technical interviews.",
          price: 129,
          imageUrl:
            "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
          purchaseUrl: "https://buy.stripe.com/mock_alex_2",
        },
        {
          id: "prod-alex-3",
          title: "Clean Code Checklist (E-Book)",
          description:
            "A compact PDF guide listing best practices for writing maintainable and scalable code.",
          price: 12,
          imageUrl:
            "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
          purchaseUrl: "https://buy.stripe.com/mock_alex_3",
        },
      ],
    },
    {
      username: "sound_design",
      password: defaultPasswordHash,
      name: "Marcus Vance",
      bio: "Audio Engineer & Synthesizer Enthusiast. Designing cinematic sample packs and ambient tracks.",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80",
      theme: "ocean-depths",
      socials: {
        spotify: "https://open.spotify.com/artist/marcus_vance",
        youtube: "https://youtube.com/@marcus_sounds",
        instagram: "https://instagram.com/marcus_sounds",
      },
      links: [
        {
          id: "link-marcus-1",
          title: "Listen on Spotify",
          url: "https://open.spotify.com/artist/marcus_vance",
          isDeepLink: true,
          clickCount: 812,
        },
        {
          id: "link-marcus-2",
          title: "Synth Rig Setup Video Tour",
          url: "https://youtube.com/watch?v=rig_tour",
          isDeepLink: true,
          clickCount: 429,
        },
        {
          id: "link-marcus-3",
          title: "SoundCloud Tracks",
          url: "https://soundcloud.com/marcus_vance",
          isDeepLink: true,
          clickCount: 310,
        },
      ],
      products: [
        {
          id: "prod-marcus-1",
          title: "Cinematic Synth Patches (Serum)",
          description:
            "100+ premium patches for Serum synth tailored for dark ambient and cyberpunk scoring.",
          price: 39,
          imageUrl:
            "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
          purchaseUrl: "https://buy.stripe.com/mock_marcus_1",
        },
        {
          id: "prod-marcus-2",
          title: "Ambient Soundscapes Sample Pack",
          description:
            "1.2 GB of organic pads, industrial drone loops, and field recordings in WAV format.",
          price: 59,
          imageUrl:
            "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
          purchaseUrl: "https://buy.stripe.com/mock_marcus_2",
        },
      ],
    },
  ];

  await User.insertMany(creators);
  console.log("Database seeded successfully with 3 creators.");
}
