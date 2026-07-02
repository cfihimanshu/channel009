import { Article } from "../types";

const authors = {
  john: { name: "John Doe", avatar: "https://i.pravatar.cc/150?u=john" },
  jane: { name: "Jane Smith", avatar: "https://i.pravatar.cc/150?u=jane" },
  rahul: { name: "Rahul Sharma", avatar: "https://i.pravatar.cc/150?u=rahul" },
  priya: { name: "Priya Patel", avatar: "https://i.pravatar.cc/150?u=priya" },
  alex: { name: "Alex Johnson", avatar: "https://i.pravatar.cc/150?u=alex" }
};

const placeholderContent = `
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
<br/>
<p>Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus.</p>
<br/>
<blockquote>"This is a crucial moment for the industry, and we must adapt to these rapid changes," said the expert in a recent interview.</blockquote>
<br/>
<p>In hac habitasse platea dictumst. Curabitur at lacus ac velit ornare lobortis. Curabitur ut elementum nisl. Integer dictum sem nec mi ultricies varius. Donec a purus non sapien feugiat varius sed at ipsum. Sed a velit urna.</p>
`;

export const articles: Article[] = [
  {
    id: "1",
    slug: "global-markets-rally-amidst-tech-surge",
    title: "Global Markets Rally Amidst Unprecedented Tech Sector Surge",
    excerpt: "Stock markets worldwide saw record highs today as major technology companies reported better-than-expected earnings for the third quarter.",
    content: placeholderContent,
    category: "Business",
    author: authors.jane,
    image: "https://picsum.photos/seed/1/800/450",
    publishedAt: "2 hours ago",
    readTime: "5 min read",
    tags: ["Finance", "Technology", "Stocks"],
    featured: true
  },
  {
    id: "2",
    slug: "election-commission-announces-dates",
    title: "Election Commission Announces Key Polling Dates for Upcoming State Elections",
    excerpt: "In a highly anticipated press conference, the Election Commission revealed the schedule for the upcoming assembly elections across five states.",
    content: placeholderContent,
    category: "Politics",
    author: authors.rahul,
    image: "https://picsum.photos/seed/2/800/450",
    publishedAt: "4 hours ago",
    readTime: "4 min read",
    tags: ["Elections", "Politics", "India"],
    featured: false
  },
  {
    id: "3",
    slug: "new-ai-model-promises-breakthrough",
    title: "New AI Model Promises Breakthrough in Medical Diagnostics",
    excerpt: "Researchers have unveiled a new artificial intelligence system that can detect early signs of rare diseases with 95% accuracy.",
    content: placeholderContent,
    category: "Technology",
    author: authors.alex,
    image: "https://picsum.photos/seed/3/800/450",
    publishedAt: "5 hours ago",
    readTime: "6 min read",
    tags: ["AI", "Healthcare", "Innovation"],
    featured: true
  },
  {
    id: "4",
    slug: "championship-finals-thrilling-conclusion",
    title: "Championship Finals Reach Thrilling Conclusion as Underdogs Triumph",
    excerpt: "In an unexpected turn of events, the underdog team secured a dramatic victory in the final seconds of the championship match.",
    content: placeholderContent,
    category: "Sports",
    author: authors.john,
    image: "https://picsum.photos/seed/4/800/450",
    publishedAt: "6 hours ago",
    readTime: "3 min read",
    tags: ["Sports", "Championship", "Football"],
    featured: false
  },
  {
    id: "5",
    slug: "climate-summit-reaches-historic-agreement",
    title: "Global Climate Summit Reaches Historic Agreement on Emissions",
    excerpt: "Leaders from over 190 countries have finally agreed on a binding resolution to significantly reduce carbon emissions by 2030.",
    content: placeholderContent,
    category: "World",
    author: authors.priya,
    image: "https://picsum.photos/seed/5/800/450",
    publishedAt: "8 hours ago",
    readTime: "7 min read",
    tags: ["Climate", "Environment", "World"],
    featured: true
  },
  {
    id: "6",
    slug: "box-office-records-broken",
    title: "Latest Sci-Fi Epic Shatters Box Office Records Opening Weekend",
    excerpt: "The much-anticipated science fiction film has grossed over $200 million globally in its first three days, setting a new industry benchmark.",
    content: placeholderContent,
    category: "Entertainment",
    author: authors.jane,
    image: "https://picsum.photos/seed/6/800/450",
    publishedAt: "10 hours ago",
    readTime: "4 min read",
    tags: ["Movies", "Hollywood", "Box Office"],
    featured: false
  },
  {
    id: "7",
    slug: "breakthrough-in-quantum-computing",
    title: "Researchers Announce Major Milestone in Quantum Computing Stability",
    excerpt: "A team of international scientists has successfully maintained quantum coherence for a record-breaking duration, paving the way for practical applications.",
    content: placeholderContent,
    category: "Science",
    author: authors.alex,
    image: "https://picsum.photos/seed/7/800/450",
    publishedAt: "12 hours ago",
    readTime: "8 min read",
    tags: ["Physics", "Quantum", "Research"],
    featured: false
  },
  {
    id: "8",
    slug: "new-dietary-guidelines-published",
    title: "Health Ministry Publishes Updated Dietary Guidelines for 2026",
    excerpt: "The new recommendations place a stronger emphasis on plant-based proteins and suggest further reductions in processed sugar consumption.",
    content: placeholderContent,
    category: "Health",
    author: authors.priya,
    image: "https://picsum.photos/seed/8/800/450",
    publishedAt: "14 hours ago",
    readTime: "5 min read",
    tags: ["Nutrition", "Wellness", "Diet"],
    featured: false
  },
  {
    id: "9",
    slug: "startup-funding-hits-new-high",
    title: "Tech Startup Funding Hits New High in Q1 2026",
    excerpt: "Venture capital investments in early-stage tech startups have seen a massive 40% year-over-year increase, signaling strong market confidence.",
    content: placeholderContent,
    category: "Business",
    author: authors.jane,
    image: "https://picsum.photos/seed/9/800/450",
    publishedAt: "16 hours ago",
    readTime: "4 min read",
    tags: ["Startups", "VC", "Finance"],
    featured: false
  },
  {
    id: "10",
    slug: "historic-monument-restoration-complete",
    title: "Restoration of Iconic National Monument Finally Complete",
    excerpt: "After five years of meticulous work, the beloved historical site is ready to reopen its doors to the public this weekend.",
    content: placeholderContent,
    category: "India",
    author: authors.rahul,
    image: "https://picsum.photos/seed/10/800/450",
    publishedAt: "18 hours ago",
    readTime: "3 min read",
    tags: ["Heritage", "Culture", "Tourism"],
    featured: false
  },
  {
    id: "11",
    slug: "space-telescope-captures-stunning-nebula",
    title: "Next-Gen Space Telescope Captures Unprecedented View of Distant Nebula",
    excerpt: "The latest images released by the space agency offer an incredibly detailed look at star formation in a galaxy 50 million light-years away.",
    content: placeholderContent,
    category: "Science",
    author: authors.alex,
    image: "https://picsum.photos/seed/11/800/450",
    publishedAt: "20 hours ago",
    readTime: "6 min read",
    tags: ["Space", "Astronomy", "NASA"],
    featured: true
  },
  {
    id: "12",
    slug: "tennis-prodigy-wins-grand-slam",
    title: "19-Year-Old Tennis Prodigy Shocks the World with First Grand Slam Title",
    excerpt: "In a stunning upset, the unseeded teenager defeated the world number one in straight sets to claim the prestigious championship.",
    content: placeholderContent,
    category: "Sports",
    author: authors.john,
    image: "https://picsum.photos/seed/12/800/450",
    publishedAt: "1 day ago",
    readTime: "5 min read",
    tags: ["Tennis", "Grand Slam", "Sports"],
    featured: false
  },
  {
    id: "13",
    slug: "smartphone-sales-decline",
    title: "Global Smartphone Sales Continue to Decline as Upgrade Cycles Lengthen",
    excerpt: "Consumers are holding onto their devices longer than ever, causing a 5% drop in global smartphone shipments this quarter.",
    content: placeholderContent,
    category: "Technology",
    author: authors.jane,
    image: "https://picsum.photos/seed/13/800/450",
    publishedAt: "1 day ago",
    readTime: "4 min read",
    tags: ["Mobile", "Tech Trends", "Economy"],
    featured: false
  },
  {
    id: "14",
    slug: "music-festival-announces-lineup",
    title: "Premier Summer Music Festival Announces Star-Studded Lineup",
    excerpt: "Fans are eagerly anticipating this year's festival, which will feature headlining performances from top global artists across multiple genres.",
    content: placeholderContent,
    category: "Entertainment",
    author: authors.priya,
    image: "https://picsum.photos/seed/14/800/450",
    publishedAt: "1 day ago",
    readTime: "3 min read",
    tags: ["Music", "Festivals", "Culture"],
    featured: false
  },
  {
    id: "15",
    slug: "new-infrastructure-bill-passed",
    title: "Parliament Passes Sweeping New Infrastructure Bill",
    excerpt: "The controversial bill, aimed at overhauling the nation's transportation networks, finally passed after months of heated debate.",
    content: placeholderContent,
    category: "Politics",
    author: authors.rahul,
    image: "https://picsum.photos/seed/15/800/450",
    publishedAt: "2 days ago",
    readTime: "7 min read",
    tags: ["Government", "Law", "Infrastructure"],
    featured: false
  },
  {
    id: "16",
    slug: "study-links-sleep-to-longevity",
    title: "Groundbreaking Study Links Specific Sleep Patterns to Increased Longevity",
    excerpt: "Researchers have discovered that maintaining a consistent sleep schedule may be more important than the total hours slept for long-term health.",
    content: placeholderContent,
    category: "Health",
    author: authors.alex,
    image: "https://picsum.photos/seed/16/800/450",
    publishedAt: "2 days ago",
    readTime: "5 min read",
    tags: ["Sleep", "Research", "Wellness"],
    featured: false
  },
  {
    id: "17",
    slug: "european-union-new-trade-deal",
    title: "European Union Finalizes Massive New Trade Agreement",
    excerpt: "The landmark deal is expected to eliminate tariffs on thousands of goods and significantly boost cross-border commerce.",
    content: placeholderContent,
    category: "World",
    author: authors.jane,
    image: "https://picsum.photos/seed/17/800/450",
    publishedAt: "2 days ago",
    readTime: "6 min read",
    tags: ["Trade", "EU", "Economy"],
    featured: false
  },
  {
    id: "18",
    slug: "local-startup-acquired",
    title: "Local E-Commerce Startup Acquired by Retail Giant for $500M",
    excerpt: "The acquisition marks one of the largest exits for a homegrown company in the region's history, promising major expansion.",
    content: placeholderContent,
    category: "Business",
    author: authors.john,
    image: "https://picsum.photos/seed/18/800/450",
    publishedAt: "3 days ago",
    readTime: "4 min read",
    tags: ["Acquisition", "Retail", "Tech"],
    featured: false
  },
  {
    id: "19",
    slug: "cricket-world-cup-preparations",
    title: "Final Preparations Underway for the Upcoming Cricket World Cup",
    excerpt: "Stadiums are being renovated and security measures finalized as the country gears up to host the biggest event in international cricket.",
    content: placeholderContent,
    category: "Sports",
    author: authors.rahul,
    image: "https://picsum.photos/seed/19/800/450",
    publishedAt: "3 days ago",
    readTime: "3 min read",
    tags: ["Cricket", "World Cup", "India"],
    featured: false
  },
  {
    id: "20",
    slug: "new-electric-vehicle-unveiled",
    title: "Major Automaker Unveils Affordable Long-Range Electric Vehicle",
    excerpt: "The new model promises a 400-mile range on a single charge with a starting price that undercuts current market leaders.",
    content: placeholderContent,
    category: "Technology",
    author: authors.alex,
    image: "https://picsum.photos/seed/20/800/450",
    publishedAt: "4 days ago",
    readTime: "5 min read",
    tags: ["EV", "Automotive", "Green Tech"],
    featured: false
  }
];

export const trendingTopics = ["Global Elections", "AI Revolution", "Climate Crisis", "Olympics 2026", "Market Trends", "Space Exploration"];
