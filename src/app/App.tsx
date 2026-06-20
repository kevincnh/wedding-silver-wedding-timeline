import { useState, useRef, useEffect } from "react";
import { X, Play, Pause, Music, Sparkles, Send, Check, Heart, HelpCircle, Award, Volume2, VolumeX } from "lucide-react";
import confetti from "canvas-confetti";

const milestones = [
  {
    year: 2000,
    label: "The Beginning",
    era: "Year One",
    description:
      "On a warm June afternoon, Eleanor and George exchanged vows in a small garden ceremony surrounded by family. Their first dance lasted long after the music stopped.",
    detail: "Honeymoon in Lisbon · First home in Bristol · A cat named Figaro",
    image: "https://images.unsplash.com/photo-1625690988910-fedcd2be5e2e?w=560&h=420&fit=crop&auto=format",
    imageAlt: "A tender wedding kiss",
    side: "right",
  },
  {
    year: 2005,
    label: "Taking Root",
    era: "Five Years",
    description:
      "They planted a garden, welcomed their daughter Clara into the world, and bought the old house on Maple Street with the creaking porch they always promised to fix — and never did.",
    detail: "Daughter Clara born · Moved to Maple Street · George's first marathon",
    image: "https://images.unsplash.com/photo-1739932907333-e518dc4fb674?w=560&h=420&fit=crop&auto=format",
    imageAlt: "Couple standing near a tree in golden light",
    side: "left",
  },
  {
    year: 2010,
    label: "A Decade of Us",
    era: "Ten Years",
    description:
      "Their tenth anniversary brought a long-awaited trip to the Amalfi Coast. Eleanor kept a journal of every meal; George photographed every sunset. Both agreed it was the best holiday of their lives.",
    detail: "Italy trip · Son Thomas born · Eleanor's first exhibition",
    image: "https://images.unsplash.com/photo-1761674291544-bdfb5216a40a?w=560&h=420&fit=crop&auto=format",
    imageAlt: "Elderly couple holding hands in a garden",
    side: "right",
  },
  {
    year: 2015,
    label: "Seasons of Grace",
    era: "Fifteen Years",
    description:
      "With the children growing older, they rediscovered each other — morning walks became rituals, Saturday markets became adventures. George retired from teaching; Eleanor opened her pottery studio.",
    detail: "Eleanor opens her studio · George retires · Clara leaves for university",
    image: "https://images.unsplash.com/photo-1760722531515-a2b2d5013879?w=560&h=420&fit=crop&auto=format",
    imageAlt: "Couple walking joyfully outdoors together",
    side: "left",
  },
  {
    year: 2020,
    label: "Quiet Devotion",
    era: "Twenty Years",
    description:
      "A year that asked the world to slow down found them grateful for a small house, a warm kitchen, and twenty years of knowing how to simply be together. They read aloud to each other every evening.",
    detail: "Grandchild Lily born · Completed the coastal path walk · 1,000 evenings of reading",
    image: "https://images.unsplash.com/photo-1672640770474-e1d8a28fd0d2?w=560&h=420&fit=crop&auto=format",
    imageAlt: "A tender quiet moment between two people",
    side: "right",
  },
  {
    year: 2025,
    label: "Silver & Gold",
    era: "Twenty-Five Years",
    description:
      "A silver jubilee. The porch still creaks. The garden still blooms. And every morning, George brings Eleanor her tea before she asks. Some things, thankfully, never change.",
    detail: "This celebration · Our whole family together · A lifetime of gratitude",
    image: "https://images.unsplash.com/photo-1761682815710-8d584fec0e51?w=560&h=420&fit=crop&auto=format",
    imageAlt: "Smiling couple in a timeless portrait",
    side: "left",
  },
];

const photos = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1761674291544-bdfb5216a40a?w=800&h=1100&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1761674291544-bdfb5216a40a?w=500&h=650&fit=crop&auto=format",
    alt: "Elderly couple holding hands in a sunlit garden",
    caption: "Still hand in hand, after all these years.",
    aspect: "portrait",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1514415008039-efa173293080?w=1000&h=700&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1514415008039-efa173293080?w=600&h=420&fit=crop&auto=format",
    alt: "Man kissing woman on the cheek beside a body of water",
    caption: "Every kiss still feels like the first.",
    aspect: "landscape",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1739932907333-e518dc4fb674?w=900&h=700&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1739932907333-e518dc4fb674?w=560&h=420&fit=crop&auto=format",
    alt: "Couple standing near a tree, smiling",
    caption: "Rooted together, growing toward the light.",
    aspect: "landscape",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1625690988276-0a7b0cdf3d5d?w=700&h=1050&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1625690988276-0a7b0cdf3d5d?w=420&h=620&fit=crop&auto=format",
    alt: "Man in white shirt hugging woman in white dress",
    caption: "In every embrace, a thousand memories.",
    aspect: "portrait",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1760722531515-a2b2d5013879?w=900&h=600&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1760722531515-a2b2d5013879?w=560&h=370&fit=crop&auto=format",
    alt: "Elderly couple walking together outdoors with joy",
    caption: "Adventure is sweeter when shared.",
    aspect: "landscape",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1761682815710-8d584fec0e51?w=700&h=1000&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1761682815710-8d584fec0e51?w=420&h=600&fit=crop&auto=format",
    alt: "Smiling couple in a timeless portrait",
    caption: "Joy written in the lines of a lifetime.",
    aspect: "portrait",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1625690988910-fedcd2be5e2e?w=900&h=700&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1625690988910-fedcd2be5e2e?w=560&h=420&fit=crop&auto=format",
    alt: "Man kissing woman tenderly during celebration",
    caption: "Twenty-five years, and love only deepens.",
    aspect: "landscape",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1672640770474-e1d8a28fd0d2?w=700&h=1050&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1672640770474-e1d8a28fd0d2?w=420&h=630&fit=crop&auto=format",
    alt: "A tender moment between two people who love each other deeply",
    caption: "In quiet moments, love speaks loudest.",
    aspect: "portrait",
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1739932905664-b7b4c0056f21?w=900&h=650&fit=crop&auto=format",
    thumb: "https://images.unsplash.com/photo-1739932905664-b7b4c0056f21?w=560&h=400&fit=crop&auto=format",
    alt: "Couple together near a tree in golden light",
    caption: "Where you are is where I want to be.",
    aspect: "landscape",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Where did Eleanor and George spend their wedding honeymoon in 2000?",
    options: ["Paris", "Rome", "Lisbon", "Venice"],
    answer: "Lisbon",
  },
  {
    id: 2,
    question: "What is the name of their pet cat who shared their Maple Street house?",
    options: ["Figaro", "Oliver", "Milo", "Luna"],
    answer: "Figaro",
  },
  {
    id: 3,
    question: "Which beautiful coast did they visit for their tenth anniversary in 2010?",
    options: ["Amalfi Coast", "French Riviera", "Costa del Sol", "Cinque Terre"],
    answer: "Amalfi Coast",
  },
  {
    id: 4,
    question: "What creative venture did Eleanor open after George retired from teaching?",
    options: ["Bakery", "Flower shop", "Pottery studio", "Bookstore"],
    answer: "Pottery studio",
  },
];

function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.8 },
    colors: ["#d4af37", "#c0c0c0", "#7a5c20", "#e8ddd0"],
  });
}

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 my-2">
      <div className="h-px w-12 bg-accent opacity-80" />
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-accent opacity-80">
        <path d="M12 2 L13.5 9 L20 9 L14.5 13 L16.5 20 L12 16 L7.5 20 L9.5 13 L4 9 L10.5 9 Z" fill="currentColor" />
      </svg>
      <div className="h-px w-12 bg-accent opacity-80" />
    </div>
  );
}

function SilverBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-5 py-2 border border-accent/60 rounded-full text-accent text-sm font-semibold tracking-[0.2em] uppercase" style={{ fontFamily: "'Cormorant Unicase', serif" }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2 L13.5 9 L20 9 L14.5 13 L16.5 20 L12 16 L7.5 20 L9.5 13 L4 9 L10.5 9 Z" />
      </svg>
      Silver Anniversary
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2 L13.5 9 L20 9 L14.5 13 L16.5 20 L12 16 L7.5 20 L9.5 13 L4 9 L10.5 9 Z" />
      </svg>
    </div>
  );
}

export default function App() {
  // Global States
  const [theme, setTheme] = useState<"silver" | "midnight" | "rose">("silver");
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<typeof milestones[0] | null>(null);

  // Guestbook State
  const [wishes, setWishes] = useState([
    { name: "Clara & Thomas", text: "Happy 25th Anniversary! You both are such an inspiration to us all. 💖", date: "June 19, 2025" },
    { name: "Uncle Arthur", text: "Eleanor and George, wishing you another 25 years of beautiful sunsets and shared books.", date: "June 18, 2025" },
    { name: "The Collins Family", text: "A beautiful couple and a beautiful lifetime together. Happy Silver Jubilee!", date: "June 19, 2025" },
  ]);
  const [newName, setNewName] = useState("");
  const [newText, setNewText] = useState("");

  // Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Audio Reference
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Elegant soft piano instrumental
    audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => console.log("Audio play blocked by browser. Wait for user interaction."));
    }
    setIsPlaying(!isPlaying);
  };

  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim()) return;

    const newWish = {
      name: newName,
      text: newText,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    };

    setWishes([newWish, ...wishes]);
    setNewName("");
    setNewText("");
    triggerConfetti();
  };

  const handleQuizAnswer = (option: string) => {
    setSelectedOption(option);
    const isCorrect = option === quizQuestions[currentQuizIndex].answer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentQuizIndex < quizQuestions.length - 1) {
        setCurrentQuizIndex((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        setQuizCompleted(true);
        if (score + (isCorrect ? 1 : 0) === quizQuestions.length) {
          triggerConfetti();
        }
      }
    }, 1200);
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setScore(0);
    setQuizCompleted(false);
  };

  // Lightbox navigation
  const openPhoto = (id: number) => setActivePhoto(id);
  const closePhoto = () => setActivePhoto(null);
  const prevPhoto = () => {
    if (activePhoto === null) return;
    const idx = photos.findIndex((p) => p.id === activePhoto);
    setActivePhoto(photos[(idx - 1 + photos.length) % photos.length].id);
  };
  const nextPhoto = () => {
    if (activePhoto === null) return;
    const idx = photos.findIndex((p) => p.id === activePhoto);
    setActivePhoto(photos[(idx + 1) % photos.length].id);
  };

  const currentPhoto = photos.find((p) => p.id === activePhoto) ?? null;

  // Split photos into 3 columns for masonry
  const col1 = [photos[0], photos[3], photos[6]];
  const col2 = [photos[1], photos[4], photos[7]];
  const col3 = [photos[2], photos[5], photos[8]];

  return (
    <div className={`theme-${theme} min-h-screen bg-background text-foreground transition-colors duration-500`} style={{ fontFamily: "'Lora', serif" }}>
      
      {/* Floating Control Panel */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        
        {/* Theme Selectors */}
        <div className="flex gap-2 bg-card/90 backdrop-blur-md border border-border/80 p-2 rounded-full shadow-xl pointer-events-auto transition-transform duration-300 hover:scale-105">
          <button
            onClick={() => setTheme("silver")}
            className={`w-8 h-8 rounded-full border-2 transition-all ${theme === "silver" ? "border-accent scale-110" : "border-transparent opacity-70"}`}
            style={{ backgroundColor: "#faf6f0" }}
            title="Silver Classic"
          />
          <button
            onClick={() => setTheme("midnight")}
            className={`w-8 h-8 rounded-full border-2 transition-all ${theme === "midnight" ? "border-accent scale-110" : "border-transparent opacity-70"}`}
            style={{ backgroundColor: "#0d1117" }}
            title="Midnight Gold"
          />
          <button
            onClick={() => setTheme("rose")}
            className={`w-8 h-8 rounded-full border-2 transition-all ${theme === "rose" ? "border-accent scale-110" : "border-transparent opacity-70"}`}
            style={{ backgroundColor: "#fbf5f5" }}
            title="Rose Garden"
          />
        </div>

        {/* Ambient Player Button */}
        <button
          onClick={toggleMusic}
          className={`flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground shadow-xl transition-all duration-300 pointer-events-auto hover:scale-110 ${isPlaying ? "animate-pulse" : ""}`}
          title="Toggle Ambient Audio"
        >
          {isPlaying ? <Volume2 size={22} className="animate-spin" style={{ animationDuration: '4s' }} /> : <VolumeX size={22} />}
        </button>
      </div>

      {/* Hero */}
      <header className="relative overflow-hidden">
        <div
          className="relative h-[70vh] min-h-[520px] flex flex-col items-center justify-center text-center px-6"
          style={{
            background: "linear-gradient(160deg, var(--card) 0%, var(--background) 45%, var(--card) 100%)",
          }}
        >
          {/* Decorative background text */}
          <span
            className="absolute inset-0 flex items-center justify-center text-accent/5 select-none pointer-events-none"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(80px, 18vw, 220px)", fontWeight: 600, letterSpacing: "-0.02em" }}
            aria-hidden="true"
          >
            XXV
          </span>

          <div className="relative z-10 flex flex-col items-center gap-4">
            <SilverBadge />
            <h1
              className="text-foreground leading-tight mt-2"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.4rem, 6vw, 5rem)", fontWeight: 400, letterSpacing: "-0.01em" }}
            >
              Eleanor &amp; George
            </h1>
            <Ornament />
            <p
              className="text-muted-foreground max-w-md text-lg leading-relaxed italic"
              style={{ fontFamily: "'Lora', serif", fontWeight: 400 }}
            >
              Twenty-five years of laughter, tears, quiet mornings,<br className="hidden sm:inline" /> and the profound grace of choosing each other — every day.
            </p>
            <p className="text-accent text-base font-semibold tracking-widest uppercase mt-1" style={{ fontFamily: "'Cormorant Unicase', serif" }}>
              Married · June 19, 2000
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />
        </div>
      </header>

      {/* Intro quote */}
      <section className="max-w-2xl mx-auto px-6 py-16 text-center">
        <Ornament />
        <blockquote
          className="mt-6 text-foreground/80 text-xl leading-relaxed italic"
          style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400 }}
        >
          "Grow old along with me — the best is yet to be."
        </blockquote>
        <p className="text-muted-foreground text-sm mt-3 tracking-wider" style={{ fontFamily: "'Cormorant Unicase', serif" }}>
          — Robert Browning
        </p>
        <div className="mt-8 text-muted-foreground text-base leading-7 max-w-prose mx-auto" style={{ fontFamily: "'Lora', serif" }}>
          <p>
            These photographs trace the story of two people who found in each other not merely a partner, but a home.
            Through seasons and years, through celebration and stillness, their love has only grown more luminous.
          </p>
          <p className="mt-4">
            We gather these moments — candid glances, gentle touches, and radiant smiles — as a testament to what endures.
            A silver wedding is not just a milestone. It is a portrait of devotion made visible.
          </p>
        </div>
        <Ornament />
      </section>

      {/* Timeline Section */}
      <section className="px-4 sm:px-8 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className="text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: "'Cormorant Unicase', serif" }}
          >
            Our Story
          </h2>
          <p
            className="text-foreground"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 400, fontStyle: "italic" }}
          >
            Twenty-five years, chapter by chapter
          </p>
          <p className="text-muted-foreground text-xs mt-2 italic">Click any milestone card to explore details</p>
          <Ornament />
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
          <div className="lg:hidden absolute left-1.5 top-0 bottom-0 w-px bg-border" />

          <div className="flex flex-col gap-12 sm:gap-16">
            {milestones.map((m, i) => {
              const isRight = m.side === "right";
              return (
                <div key={m.year} className={`relative flex items-start gap-0 ${isRight ? "flex-row" : "flex-row-reverse"} lg:gap-0`}>
                  {/* Content side */}
                  <div className={`w-full lg:w-[calc(50%-2rem)] ${isRight ? "lg:pr-12 lg:text-right" : "lg:pl-12 lg:text-left"} pl-10 lg:pl-0`}>
                    <button
                      onClick={() => { setSelectedMilestone(m); triggerConfetti(); }}
                      className="w-full text-left group bg-card border border-border/60 p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:border-accent/40 focus:outline-none"
                      style={{ borderRadius: "2px" }}
                    >
                      <div className={`flex items-center gap-3 mb-4 ${isRight ? "lg:justify-end" : "lg:justify-start"}`}>
                        <span
                          className="text-accent font-semibold tracking-widest"
                          style={{ fontFamily: "'Cormorant Unicase', serif", fontSize: "0.8rem", letterSpacing: "0.2em" }}
                        >
                          {m.era}
                        </span>
                        <span className="h-px w-8 bg-accent/50 hidden sm:block" />
                        <span
                          className="text-accent"
                          style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 400 }}
                        >
                          {m.year}
                        </span>
                      </div>

                      <h3
                        className="text-foreground mb-3"
                        style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.35rem", fontWeight: 400, fontStyle: "italic" }}
                      >
                        {m.label}
                      </h3>

                      <p className="text-muted-foreground text-sm leading-7 mb-4 line-clamp-3" style={{ fontFamily: "'Lora', serif" }}>
                        {m.description}
                      </p>

                      <p
                        className="text-accent/85 text-xs tracking-wider"
                        style={{ fontFamily: "'Cormorant Unicase', serif", letterSpacing: "0.12em" }}
                      >
                        {m.detail}
                      </p>
                    </button>
                  </div>

                  <div className="hidden lg:flex flex-col items-center w-16 shrink-0 pt-8">
                    <div className="w-4 h-4 rounded-full bg-accent ring-4 ring-background border border-accent/30 z-10" />
                  </div>

                  <div className="absolute left-0 top-8 flex lg:hidden flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-accent ring-2 ring-background" />
                  </div>

                  {/* Image side */}
                  <div className={`hidden lg:block w-[calc(50%-2rem)] ${isRight ? "lg:pl-12" : "lg:pr-12"}`}>
                    <div className="overflow-hidden aspect-[4/3] bg-muted shadow-md" style={{ borderRadius: "2px" }}>
                      <img
                        src={m.image}
                        alt={m.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Memory Trivia Quiz */}
      <section className="py-16 px-6 bg-card border-y border-border/40">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2
              className="text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-2"
              style={{ fontFamily: "'Cormorant Unicase', serif" }}
            >
              Interactive Trivia
            </h2>
            <p
              className="text-foreground"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 400, fontStyle: "italic" }}
            >
              How Well Do You Know Them?
            </p>
            <Ornament />
          </div>

          <div className="bg-background border border-border p-6 sm:p-10 rounded-lg shadow-lg">
            {!quizCompleted ? (
              <div>
                <div className="flex justify-between items-center text-xs tracking-wider mb-6 text-muted-foreground uppercase" style={{ fontFamily: "'Cormorant Unicase', serif" }}>
                  <span>Question {currentQuizIndex + 1} of {quizQuestions.length}</span>
                  <span>Score: {score}</span>
                </div>
                <h3 className="text-foreground text-lg sm:text-xl font-normal leading-relaxed mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {quizQuestions[currentQuizIndex].question}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {quizQuestions[currentQuizIndex].options.map((opt) => {
                    const isSelected = selectedOption === opt;
                    const isCorrect = opt === quizQuestions[currentQuizIndex].answer;
                    let btnStyle = "border-border hover:border-accent hover:bg-card";

                    if (selectedOption) {
                      if (isCorrect) {
                        btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-300";
                      } else if (isSelected) {
                        btnStyle = "border-rose-500 bg-rose-50 text-rose-800 dark:bg-rose-950/20 dark:text-rose-300";
                      } else {
                        btnStyle = "opacity-50 border-border";
                      }
                    }

                    return (
                      <button
                        key={opt}
                        disabled={!!selectedOption}
                        onClick={() => handleQuizAnswer(opt)}
                        className={`text-left px-5 py-4 border rounded transition-all duration-300 text-sm font-medium ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <Award className="mx-auto text-accent mb-4" size={56} />
                <h3 className="text-2xl font-normal mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Quiz Completed!
                </h3>
                <p className="text-lg mb-6">
                  You scored <span className="font-semibold text-accent">{score}</span> out of <span className="font-semibold">{quizQuestions.length}</span>.
                </p>
                <p className="text-muted-foreground max-w-md mx-auto mb-8 italic">
                  {score === quizQuestions.length
                    ? "Perfect score! You must be family or a very close friend! 💖"
                    : score >= 2
                    ? "Great job! You know Eleanor & George quite well. ✨"
                    : "Time to read their story above! 📖"}
                </p>
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 bg-accent text-accent-foreground font-semibold uppercase tracking-wider text-xs rounded shadow-md hover:bg-accent/90 transition-all duration-300"
                  style={{ fontFamily: "'Cormorant Unicase', serif" }}
                >
                  Play Again
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-4 sm:px-8 py-20 max-w-6xl mx-auto">
        <h2
          className="text-center text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-10"
          style={{ fontFamily: "'Cormorant Unicase', serif" }}
        >
          A life in portraits
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            {col1.map((p) => (
              <button
                key={p.id}
                onClick={() => openPhoto(p.id)}
                className="group relative block w-full overflow-hidden bg-muted text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                style={{ borderRadius: "2px" }}
              >
                <div className={`relative overflow-hidden ${p.aspect === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                  <img
                    src={p.thumb}
                    alt={p.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-full px-4 pb-4 pt-12 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white text-sm italic leading-snug" style={{ fontFamily: "'Lora', serif" }}>
                        {p.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:gap-4 sm:mt-10">
            {col2.map((p) => (
              <button
                key={p.id}
                onClick={() => openPhoto(p.id)}
                className="group relative block w-full overflow-hidden bg-muted text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                style={{ borderRadius: "2px" }}
              >
                <div className={`relative overflow-hidden ${p.aspect === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                  <img
                    src={p.thumb}
                    alt={p.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-full px-4 pb-4 pt-12 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white text-sm italic leading-snug" style={{ fontFamily: "'Lora', serif" }}>
                        {p.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:gap-4 sm:mt-5">
            {col3.map((p) => (
              <button
                key={p.id}
                onClick={() => openPhoto(p.id)}
                className="group relative block w-full overflow-hidden bg-muted text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                style={{ borderRadius: "2px" }}
              >
                <div className={`relative overflow-hidden ${p.aspect === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                  <img
                    src={p.thumb}
                    alt={p.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-full px-4 pb-4 pt-12 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white text-sm italic leading-snug" style={{ fontFamily: "'Lora', serif" }}>
                        {p.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Guestbook Wishing Well */}
      <section className="py-16 px-6 bg-card border-t border-border/40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2
              className="text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-2"
              style={{ fontFamily: "'Cormorant Unicase', serif" }}
            >
              Wishing Well
            </h2>
            <p
              className="text-foreground"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 400, fontStyle: "italic" }}
            >
              Send Your Blessings
            </p>
            <Ornament />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            
            {/* Form */}
            <form onSubmit={handleWishSubmit} className="md:col-span-1 bg-background border border-border p-6 rounded-lg shadow">
              <h3 className="text-md font-semibold tracking-wider mb-4 uppercase" style={{ fontFamily: "'Cormorant Unicase', serif" }}>Leave a Wish</h3>
              <div className="mb-4">
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Eleanor's sister Mary"
                  className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:border-accent bg-transparent text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Your Wish</label>
                <textarea
                  required
                  rows={4}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Share a sweet memory or anniversary blessing..."
                  className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:border-accent bg-transparent text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground py-2.5 rounded font-semibold text-xs uppercase tracking-wider hover:opacity-95 transition"
                style={{ fontFamily: "'Cormorant Unicase', serif" }}
              >
                <Send size={14} /> Send Blessing
              </button>
            </form>

            {/* Wishes Grid */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[380px] overflow-y-auto pr-2">
              {wishes.map((w, index) => (
                <div key={index} className="bg-background border border-border/80 p-5 rounded relative shadow-sm hover:shadow transition-shadow">
                  <Heart className="absolute top-4 right-4 text-accent/20" size={16} />
                  <p className="text-sm italic mb-4 leading-relaxed text-foreground/90">
                    "{w.text}"
                  </p>
                  <div className="border-t border-border/50 pt-2 flex justify-between items-center">
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider" style={{ fontFamily: "'Cormorant Unicase', serif" }}>
                      — {w.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {w.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-20 text-center px-6"
        style={{ background: "linear-gradient(180deg, var(--background) 0%, var(--card) 100%)" }}
      >
        <Ornament />
        <p
          className="mt-6 text-foreground text-2xl italic"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
        >
          Here is to the next twenty-five.
        </p>
        <p className="text-accent text-base font-semibold mt-3 tracking-widest uppercase" style={{ fontFamily: "'Cormorant Unicase', serif" }}>
          With all our love
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-accent/40" />
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-accent">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
          </svg>
          <div className="h-px w-16 bg-accent/40" />
        </div>
        <p className="text-accent/70 text-sm mt-10 tracking-widest font-medium" style={{ fontFamily: "'Cormorant Unicase', serif" }}>
          Eleanor &amp; George · 2000 — 2025
        </p>
      </footer>

      {/* Lightbox Modal */}
      {currentPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closePhoto}
        >
          <button
            className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors"
            onClick={closePhoto}
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl font-light transition-colors px-4 py-2"
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl font-light transition-colors px-4 py-2"
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            aria-label="Next"
          >
            ›
          </button>
          <div
            className="max-w-3xl max-h-[88vh] mx-16 flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentPhoto.url}
              alt={currentPhoto.alt}
              className="max-w-full max-h-[78vh] object-contain shadow-2xl"
              style={{ borderRadius: "2px" }}
            />
            <p className="text-white/80 text-sm italic text-center" style={{ fontFamily: "'Lora', serif" }}>
              {currentPhoto.caption}
            </p>
          </div>
        </div>
      )}

      {/* Milestone Detail Drawer / Popup */}
      {selectedMilestone && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
          onClick={() => setSelectedMilestone(null)}
        >
          <div
            className="bg-background border border-border w-full max-w-2xl rounded-lg overflow-hidden shadow-2xl transition-all duration-300 transform scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[250px] sm:h-[320px]">
              <img
                src={selectedMilestone.image}
                alt={selectedMilestone.imageAlt}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedMilestone(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-accent font-semibold tracking-widest text-xs uppercase" style={{ fontFamily: "'Cormorant Unicase', serif" }}>
                  {selectedMilestone.era}
                </span>
                <span className="text-accent text-2xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {selectedMilestone.year}
                </span>
              </div>
              <h3 className="text-foreground text-xl font-normal italic mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                {selectedMilestone.label}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {selectedMilestone.description}
              </p>
              <div className="border-t border-border/60 pt-4 flex items-center gap-3">
                <Sparkles size={16} className="text-accent" />
                <span className="text-xs text-accent tracking-wider font-semibold uppercase" style={{ fontFamily: "'Cormorant Unicase', serif" }}>
                  {selectedMilestone.detail}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
