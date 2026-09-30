export const MISSIONS_DATA = [
  {
    id: 'mission-1',
    number: '01',
    codeName: 'THE VEIL',
    title: 'CURSED CAMPUS — "THE VEIL"',
    kanji: '帳',
    threatLevel: 'Grade 1',
    category: 'Navigation',
    tagline: 'Campus Discovery & Dynamic Journey Architecture',
    missionBrief:
      'A mysterious Veil has disrupted navigation across the university. Students are struggling to locate important places, services, and activities.',
    pairA: {
      technique: 'CURSED SIGHT',
      objective: 'Discover the campus architecture and spatial landmarks.',
      investigate: [
        'Academic blocks',
        'Seminar halls',
        'Central library',
        'Cafeterias & food courts',
        'Sports complexes',
        'Important landmarks & direction boards',
      ],
      buildModule: 'Visual Campus Discovery / Navigation Module',
      possibleFeatures: [
        'Interactive campus map / spatial grid',
        'Location cards with metadata & timings',
        'Instant multi-parameter search',
        'Category filters (Academic, Dining, Sports)',
        'Original campus photographs & visual cues',
      ],
    },
    pairB: {
      technique: 'CURSED MOVEMENT',
      objective: 'Help students physically navigate and traverse through the campus.',
      investigate: [
        'Pathways, corridors & pedestrian flow',
        'Elevators, stairs & accessibility ramps',
        'Distance estimation & transit timing',
        'Nearest amenities & comfort stations',
      ],
      buildModule: 'Route & Journey Direction Module',
      possibleFeatures: [
        'Live "Where am I?" pinpointing',
        'Dynamic "Where do I need to go?" routing',
        'Suggested fastest / barrier-free routes',
        'Nearby facilities along the path',
        'Important intermediate checkpoints',
      ],
    },
    finalDomain: {
      name: 'Campus Discovery + Navigation System',
      formula: 'DISCOVER → NAVIGATE → ARRIVE',
      description:
        'A unified platform where a lost student can visually discover their destination (Pair A) and immediately receive an actionable, step-by-step navigation path to arrive safely (Pair B).',
    },
    cursedArtifact:
      'At least 3 original campus photographs of key blocks/landmarks integrated into the interface.',
  },
  {
    id: 'mission-2',
    number: '02',
    codeName: 'THE FIRST-YEAR TRIAL',
    title: 'JUJUTSU HIGH — "THE FIRST-YEAR TRIAL"',
    kanji: '試',
    threatLevel: 'Grade 1',
    category: 'Student Life',
    tagline: 'CU Student Survival & Immersion Operating System',
    missionBrief:
      'A new student has entered Jujutsu High with absolutely no idea how to survive the campus. Imagine Chandigarh University is their Jujutsu High.',
    pairA: {
      technique: 'THE SORCERER\'S GUIDE',
      objective: 'Answer the existential question: "Where do I go?"',
      investigate: [
        'Administrative offices & registrar desks',
        'Academic lecture theaters & lab blocks',
        'Libraries, book banks & reading rooms',
        'Food joints, mess halls & tuck shops',
        'Hostel offices & student care centers',
      ],
      buildModule: 'New Student Campus Guide & Spatial Directory',
      possibleFeatures: [
        'Categorized freshman handbook',
        'Departmental office locator with contact info',
        'Essential desk directory (Accounts, ERP, Proctor)',
        'Cafeteria menus & operating hours',
        'Searchable freshman survival FAQ',
      ],
    },
    pairB: {
      technique: 'THE TRAINING MANUAL',
      objective: 'Answer the student life question: "What can I do?"',
      investigate: [
        'Technical & cultural student clubs',
        'Sports arenas, gymnasiums & leagues',
        'Active student communities & societies',
        'Upcoming campus fests & hackathons',
        'Hands-on workshops & seminar calendar',
      ],
      buildModule: 'Student Life & Community Engagement Module',
      possibleFeatures: [
        'Club discovery matrix with joining requirements',
        'Campus event timetable & calendar sync',
        'Sports facility booking & team matchmakers',
        'Community showcase & senior sorcerer tips',
        'Interactive interest matching quiz',
      ],
    },
    finalDomain: {
      name: 'CU Student Survival System',
      formula: '"WHERE DO I GO?" + "WHAT CAN I DO?"',
      description:
        'A comprehensive freshman cockpit answering physical campus logistics through the Guide (Pair A) and unlocking social, technical, and extracurricular life through the Manual (Pair B).',
    },
    cursedArtifact:
      'At least 3 real student interaction spots or club notice boards photographed on campus.',
  },
  {
    id: 'mission-3',
    number: '03',
    codeName: 'ENERGY MANAGEMENT',
    title: 'CURSED ENERGY MANAGEMENT',
    kanji: '力',
    threatLevel: 'Special Grade',
    category: 'Productivity',
    tagline: 'Student Life Balance & Recharge Platform',
    missionBrief:
      'Every sorcerer has limited cursed energy. Students have limited time and cognitive stamina. Design an intelligent system that helps students balance demanding university life.',
    pairA: {
      technique: 'ENERGY DETECTION',
      objective: 'Map and optimize where students expend time and cognitive energy.',
      investigate: [
        'Class timetables & attendance thresholds',
        'Lab assignments & submission deadlines',
        'Quiet study spaces & library cubicles',
        'Project group study zones',
        'Personal academic goals & sprint milestones',
      ],
      buildModule: 'Student Productivity & Schedule Engine',
      possibleFeatures: [
        'Visual academic calendar & assignment tracker',
        'Cursed Energy drain calculator (heavy lab vs lecture)',
        'Deadlines countdown radar',
        'Quiet study hall availability tracker',
        'Daily focus sprint planner',
      ],
    },
    pairB: {
      technique: 'ENERGY RECOVERY',
      objective: 'Map and activate places where students can recharge and decompress.',
      investigate: [
        'Recreational parks & open green lawns',
        'Sports grounds, indoor gaming & table tennis',
        'Chill spots, tea points & smoothie bars',
        'Mindfulness nooks & wellness centers',
      ],
      buildModule: 'Student Wellbeing & Recovery Module',
      possibleFeatures: [
        'Burnout detection & forced break suggestions',
        'Campus recharge spot directory with vibe tags',
        'Quick 15-minute relaxation activity guides',
        'Hydration & nutrition reminders',
        'Peer de-stress event invites',
      ],
    },
    finalDomain: {
      name: 'Student Life Balance Platform',
      formula: 'PLAN → WORK → RECOVER → REPEAT',
      description:
        'An equilibrium dashboard where academic workload expenditure (Pair A) is automatically counterbalanced by intelligent wellbeing and recreation recommendations (Pair B).',
    },
    cursedArtifact:
      'At least 3 real productivity hotspots and 3 verified recovery/chill zones documented on campus.',
  },
  {
    id: 'mission-4',
    number: '04',
    codeName: 'THE CURSED FOREST',
    title: 'THE CURSED FOREST — CAMPUS SUSTAINABILITY',
    kanji: '森',
    threatLevel: 'Grade 1',
    category: 'Sustainability',
    tagline: 'Green CU Eco-Action & Exorcism Platform',
    missionBrief:
      'A mysterious cursed energy source is degrading the environment around Jujutsu High. Teams must design a system to identify and reduce environmental problems on campus.',
    pairA: {
      technique: 'CURSED DETECTION',
      objective: 'Audit and map physical environmental assets and waste vectors.',
      investigate: [
        'Waste bins & segregated disposal stations',
        'E-waste & plastic recycling collection hubs',
        'Green foliage, trees & landscaped zones',
        'Drinking water refill stations',
        'Energy wastage (lights/ACs left on in empty halls)',
        'Solar panels & green infrastructure',
      ],
      buildModule: 'Campus Sustainability Map & Eco-Directory',
      possibleFeatures: [
        'Interactive campus eco-map with filterable layers',
        'Water fountain purity & status tracker',
        'Recycling bin type & capacity locator',
        'Energy consumption heat-zone indicator',
      ],
    },
    pairB: {
      technique: 'CURSED EXORCISM',
      objective: 'Mobilize student action and incentivize environmental cleanups.',
      investigate: [
        'Litter reporting mechanisms & geocoding',
        'Student gamification & karma tokens',
        'Campus-wide green challenges',
        'Departmental sustainability rankings',
      ],
      buildModule: 'Eco-Exorcism & Student Action Mechanism',
      possibleFeatures: [
        'One-click "Cursed Waste" photo reporting tool',
        'Green Karma / Cursed Energy exorcism points',
        'Inter-department leaderboard for sustainability',
        'Weekly campus green quests (e.g. BYO bottle)',
        'Verified impact metrics (kg plastic saved)',
      ],
    },
    finalDomain: {
      name: 'Green CU Eco-Platform',
      formula: 'DETECT → REPORT → ACT → TRACK',
      description:
        'A living sustainability network where Pair A discovers the environmental infrastructure and Pair B gamifies student intervention to eliminate waste across campus.',
    },
    cursedArtifact:
      'At least 3 real campus sustainability observations (waste bins, solar units, or green zones) photographed.',
  },
  {
    id: 'mission-5',
    number: '05',
    codeName: 'SHIBUYA INCIDENT',
    title: 'SHIBUYA INCIDENT — CAMPUS EMERGENCY',
    kanji: '変',
    threatLevel: 'Special Grade',
    category: 'Emergency',
    tagline: 'Campus Emergency Companion & Crisis Navigator',
    missionBrief:
      'A Shibuya Incident-style emergency has occurred. Students need a fictional prototype that helps them quickly understand what is happening, where resources are, and what action they must take.',
    pairA: {
      technique: 'CURSED DETECTION',
      objective: 'Map and broadcast critical safety infrastructure and hazard zones.',
      investigate: [
        'Security control rooms & campus gates',
        'Medical dispensaries & ambulance bays',
        'Fire escapes, alarms & muster points',
        'Emergency shelter buildings',
        'Important campus perimeter landmarks',
      ],
      buildModule: 'Emergency Geolocation & Hazard System',
      possibleFeatures: [
        'Live incident radar with danger radius alerts',
        'Emergency helpline speed-dial directory',
        'Nearest medical / security room locator',
        'Safe-haven navigation routes bypassing hazards',
        'Live campus broadcast banner',
      ],
    },
    pairB: {
      technique: 'CURSED RESPONSE',
      objective: 'Equip students with rapid action guides and crisis coordination tools.',
      investigate: [
        'Emergency action protocols (medical, fire, lockdown)',
        'Checklists for immediate student safety',
        'Crowdsourced crisis incident verification',
        'Family/guardian safety status broadcasting',
      ],
      buildModule: 'Emergency Response Playbook & Triage Guide',
      possibleFeatures: [
        '"What Should I Do Right Now?" dynamic action wizard',
        'One-tap SOS distress signal with room number',
        '"I Am Safe" broadcast ping for peers',
        'Interactive step-by-step first-aid protocols',
        'Crowdsourced hazard reporting concept',
      ],
    },
    finalDomain: {
      name: 'Campus Emergency Companion',
      formula: 'LOCATE → UNDERSTAND → RESPOND',
      description:
        'A high-urgency crisis suite where spatial danger detection (Pair A) combines with actionable, calm step-by-step response guidance (Pair B) to protect students.',
    },
    cursedArtifact:
      'At least 3 documented campus safety/medical/emergency landmark points identified on campus.',
  },
  {
    id: 'mission-6',
    number: '06',
    codeName: 'CURSED EVENT NETWORK',
    title: 'CURSED EVENT NETWORK — CAMPUS HAPPENINGS',
    kanji: '網',
    threatLevel: 'Grade 1',
    category: 'Events',
    tagline: 'NexaSoul Mission & Event Inscription Network',
    missionBrief:
      'Jujutsu High has dozens of missions, training sessions, and events, but sorcerers don\'t know what is happening or where to participate. Campus events are scattered across disparate channels.',
    pairA: {
      technique: 'MISSION DETECTION',
      objective: 'Discover, curate, and index all scattered university events and clubs.',
      investigate: [
        'Departmental tech symposiums & codefests',
        'Cultural dance, music & drama auditions',
        'Guest lectures, industry workshops & AMA sessions',
        'Sports tournaments & e-sports battles',
        'Student club recruitment drives',
      ],
      buildModule: 'Event & Club Discovery Engine',
      possibleFeatures: [
        'Unified event catalog with smart category filters',
        'Search by date, venue, host club, and entry fee',
        'Trending missions & popular event highlights',
        'Personalized event suggestions based on tags',
        'Interactive timeline view of upcoming sprints',
      ],
    },
    pairB: {
      technique: 'MISSION ACCEPTANCE',
      objective: 'Streamline participation, ticketing, scheduling, and attendance.',
      investigate: [
        'Seamless 1-click registration flows',
        'Ticket/pass generation & QR verification concepts',
        'Calendar synchronization (Google/Outlook)',
        'Attendance tracking & certificate claim portals',
      ],
      buildModule: 'Event Participation & Inscription Portal',
      possibleFeatures: [
        'One-tap squad/solo event registration form',
        'Digital Pass / Cursed Seal ticket pass generation',
        'Add to Calendar integration',
        'Live participant counter & seat countdown',
        'Personal mission passport (participation history)',
      ],
    },
    finalDomain: {
      name: 'NexaSoul Mission Network',
      formula: 'DISCOVER → ACCEPT → PARTICIPATE',
      description:
        'A full-lifecycle campus events ecosystem where Pair A provides a rich, unified discovery engine and Pair B delivers frictionless registration and proof-of-participation.',
    },
    cursedArtifact:
      'At least 3 original photographs/evidence pieces of campus event posters, venues, or seminar boards.',
  },
  {
    id: 'mission-7',
    number: '07',
    codeName: 'DOMAIN EXPANSION',
    title: 'THE DOMAIN EXPANSION — PERSONALIZED CAMPUS',
    kanji: '展',
    threatLevel: 'Special Grade',
    category: 'Intelligence',
    tagline: 'My CU Domain — Hyper-Personalized Campus Interface',
    missionBrief:
      'Every sorcerer possesses distinct cursed techniques; every student possesses unique ambitions, technical skills, and career goals. Build an adaptive system tailored to the individual.',
    pairA: {
      technique: 'SORCERER PROFILE',
      objective: 'Capture, structure, and model comprehensive student identity.',
      investigate: [
        'Academic discipline, branch, and current year',
        'Technical skillsets (Frontend, AI, Systems, Design)',
        'Career aspirations (Startup, Big Tech, Research)',
        'Extracurricular passions & hobby clusters',
        'Learning style & daily availability budget',
      ],
      buildModule: 'Sorcerer Identity & Archetype Profiler',
      possibleFeatures: [
        'Interactive profile builder / onboarding wizard',
        'Skill radar & cursed technique attribute chart',
        'Goal setting & interest tag selection',
        'Exportable student sorcerer identity card',
        'Dynamic data schema that powers Pair B\'s engine',
      ],
    },
    pairB: {
      technique: 'DOMAIN RECOMMENDATION',
      objective: 'Build an intelligent matchmaking engine consuming Pair A\'s profile data.',
      investigate: [
        'Club recommendations matching student skills',
        'Relevant hackathons & paper presentations',
        'Faculty mentors & specialized lab facilities',
        'Peer study group recommendations',
      ],
      buildModule: 'Personalized Domain Recommendation Engine',
      possibleFeatures: [
        'Personalized feed: "Recommended for Your Domain"',
        'Tailored club & event match percentages',
        'Curated campus learning pathways',
        'Relevant mentor & facility suggestions',
        'Adaptive UI theme reflecting user\'s chosen path',
      ],
    },
    finalDomain: {
      name: 'My CU Domain (Personalized OS)',
      formula: 'KNOW ME → UNDERSTAND ME → RECOMMEND FOR ME',
      description:
        'A deeply integrated AI/product architecture where Pair A models the rich user profile schema, which Pair B immediately ingests to compute hyper-relevant campus recommendations.',
    },
    cursedArtifact:
      'At least 3 real student persona profiles or interest surveys collected from campus peers.',
  },
  {
    id: 'mission-8',
    number: '08',
    codeName: 'CURSED MISSION BOARD',
    title: 'CURSED MISSION BOARD — CAMPUS QUESTS',
    kanji: '命',
    threatLevel: 'Special Grade',
    category: 'Gamification',
    tagline: 'CU Student Quest, XP & Level-Up Platform',
    missionBrief:
      'Jujutsu High receives hundreds of mission scrolls; students have hundreds of daily opportunities. Create a gamified quest board that transforms campus exploration into an adventure.',
    pairA: {
      technique: 'MISSION SCOUTS',
      objective: 'Scout, create, and categorize real campus quests and challenges.',
      investigate: [
        'Library exploration quests (Find a rare research book)',
        'Coding & hackathon challenges (Submit a pull request)',
        'Campus wellness quests (Walk 5,000 steps around sports lawn)',
        'Community quests (Attend a technical club seminar)',
        'Secret campus trivia & landmark easter eggs',
      ],
      buildModule: 'Mission Discovery Board & Quest Catalog',
      possibleFeatures: [
        'Categorized Quest Scrolls (🔵 Workshop, 🟢 Library, 🔴 Coding, 🟣 Club)',
        'Difficulty grades (Grade 4 to Special Grade quests)',
        'Bounty & XP reward tags per mission',
        'Location-tagged quest pins across campus',
        'Daily rotating mission bulletin',
      ],
    },
    pairB: {
      technique: 'MISSION OPERATIVES',
      objective: 'Track mission progress, verify completions, and reward sorcerers.',
      investigate: [
        'Accepting quests & active quest logbook',
        'Proof-of-completion verification (photo/code upload)',
        'Experience points (XP), leveling system & grade promotions',
        'Special Grade badge unlocks & peer leaderboards',
      ],
      buildModule: 'Mission Tracking & Progression Engine',
      possibleFeatures: [
        'Active mission dashboard with progress bars',
        'One-click "Complete Mission" with proof submission',
        'Sorcerer Level & XP progress bar (Grade 4 → Special Grade)',
        'Achievement badge showcase & unlock animations',
        'Campus-wide builder leaderboard',
      ],
    },
    finalDomain: {
      name: 'CU Mission & Quest Board',
      formula: 'DISCOVER → ACCEPT → COMPLETE → LEVEL UP',
      description:
        'A thrilling gamification ecosystem where Pair A uncovers and catalogs campus quests, while Pair B delivers the progression, leveling, and achievement architecture.',
    },
    cursedArtifact:
      'At least 3 tangible quest proof checkpoints or challenge locations mapped on campus.',
  },
];

export const INTEGRATION_MECHANIC = {
  title: 'THE INTEGRATION MECHANIC',
  subtitle: 'One Mission → Two Cursed Techniques → Two Modules → One Final Domain',
  description:
    'Every team of 4 sorcerers is split into Pair A and Pair B. Both pairs tackle the exact same overarching mission, but approach it from complementary angles. During the final phase of the sprint, both modules must be merged into ONE functional, seamless frontend domain.',
  steps: [
    {
      step: '01',
      title: 'ONE COMMON MISSION',
      desc: 'Both pairs receive the same classified campus challenge.',
    },
    {
      step: '02',
      title: 'TWO CURSED TECHNIQUES',
      desc: 'Pair A investigates discovery/architecture; Pair B investigates action/interaction.',
    },
    {
      step: '03',
      title: 'TWO DISTINCT MODULES',
      desc: 'Each pair engineers a standalone, high-polish frontend component.',
    },
    {
      step: '04',
      title: 'ONE FINAL DOMAIN',
      desc: 'Both modules are unified into a cohesive, production-grade product.',
    },
  ],
  cursedArtifactRule: {
    title: 'THE CURSED ARTIFACT MANDATE',
    subtitle: 'Mandatory Real-World Exploration Requirement',
    rule: 'During the sprint, each pair MUST explore the campus and collect real-world evidence (e.g. at least 3 original campus photographs, real environmental observations, or verified landmark data). Your final presentation must state: "We discovered X on campus → therefore we built Y". Generic AI templates with stock photos will be exorcised!',
  },
};
