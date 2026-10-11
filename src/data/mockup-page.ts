export const mockupNav = [
  { label: "Features", href: "/#features" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Demo", href: "/#demo" },
  { label: "Contact", href: "/#contact" },
] as const;

export const mockupHero = {
  titleLead: "EkklesiaNexus",
  /*titleAccent: "The Next Generation of",
  titleTail: "Church Management System.",*/
  subtitle:
    "The Next Generation of Church Management System.",
  primaryCta: "Request a Demo",
};

export const mockupTrust = {
  title: "Trusted by Forward-Thinking Ministries",
};

export const mockupFeatures = {
  title: "Features",
  subtitle:
    "EkklesiaNexus unifies people, giving, and ministry workflows — selected by forward-thinking ministries.",
  items: [
    {
      id: "members",
      title: "Families & Members",
      body: "Maintain households, members, and roles in one connected member directory.",
      tone: "cyan" as const,
    },
    {
      id: "giving",
      title: "Stewardship & Finance",
      body: "Record gifts, pledges, and stewardship in a family-first giving workflow.",
      tone: "amber" as const,
    },
    {
      id: "events",
      title: "Intelligent Analytics",
      body: "Transforms raw parish operational data into executive leadership health indicators and visual stewardship metrics.",
      tone: "purple" as const,
    },
    {
      id: "comms",
      title: "Sacramental Registers",
      body: "Preserve your parish’s sacramental history accurately and make important records available when they are needed.",
      tone: "sky" as const,
    },
    {
      id: "groups",
      title: "Ministries & Groups",
      body: "Organize life groups, ministries, and small-group participation in one place.",
      tone: "rose" as const,
    },
    {
      id: "volunteers",
      title: "Church-Native Workflows",
      body: "Engineered around authentic parish structures, Catholic sacramental canons, BCC wards, and Mass intentions.",
      tone: "indigo" as const,
    },
  ],
};

export const mockupSlider = {
  title: "A Connected Parish. A Clearer Mission.",
  subtitle: "Uniting every dimension of parish life through one intelligent platform.",
  items: [
    {
      id: "dashboard",
      title: "Dynamic Dashboard",
      body: "Your entire parish, thoughtfully connected in one intelligent view.",
      frame: "emerald" as const,
    },
    {
      id: "mobile",
      title: "Community Dashboard View",
      body: "Monitor your Basic Christian Community's growth, demographics, and membership status.",
      frame: "rose" as const,
    },
    {
      id: "family-financial",
      title: "Detailed Financial Insights",
      body: "Monitor parish stewardship health, outstanding contributions, and financial trends with precision.",
      frame: "emerald" as const,
      image: "/images/product/familyfinancialDashboard12.png",
      imageAlt:
        "Parish financial stewardship overview with collection health and weekly collection trend",
    },
    {
      id: "calendar",
      title: "Family Profile & Details",
      body: "A unified view of every parish family, relationships, and sacramental connections.\n" +
          "Strengthen parish connections.",
      frame: "purple" as const,
    },
    {
      id: "insights",
      title: "Mass & Intentions",
      body: "Where every celebration is sacred, and every intention is cherished. Honor every Mass intention with reverence, precision, and pastoral care.",
      frame: "cyan" as const,
    },
  ],
};

export const mockupTech = {
  title: "Performance & Security",
  subtitle:
    "Engineered for Excellence: Lightning-fast performance, enterprise-grade security, and uncompromising data protection you can trust.",
  items: [
    {
      id: "next",
      title: "Scalable Cloud SaaS",
      body: "Zero local server infrastructure needed. Automatic continuous updates and high availability multi-region cloud access.",
    },
    {
      id: "perf",
      title: "Modern & Intuitive",
      body: "Clean desktop and mobile responsive interface designed for rapid adoption by priests, staff, and volunteers.",
    },
    {
      id: "ui",
      title: "Enterprise Security",
      body: "Strict role-based access control, encrypted data storage, multi-tenant isolation, and complete audit logging.",
    },
  ],
};

export const mockupTestimonialsRow = {
  title: "Testimonials",
  subtitle: "Trusted by Pastors. Empowering Parishes Worldwide..",
  items: [
    {
      name: "Namo Barnes",
      role: "Pastor / Admin",
      quote: "This work now feels calm. Our members are organized and our pastors are supported.",
      tone: 200,
      imageSrc: "/images/testimonials/namo-barnes.png",
    },
    {
      name: "Marcus Hale",
      role: "Parish Admin",
      quote: "The tools we use each Sunday finally live in one place for the whole team.",
      tone: 24,
      imageSrc: "/images/testimonials/marcus-hale.png",
    },
    {
      name: "Jaraph Wilson",
      role: "Pastor",
      quote: "Families are easier to find, and giving follow-up no longer lives in a spreadsheet.",
      tone: 160,
      imageSrc: "/images/testimonials/jaraph-wilson.png",
    },
    {
      name: "Elena Brooks",
      role: "Ministry Lead",
      quote: "Volunteer teams know where to show up. That alone changed our week.",
      tone: 280,
      imageSrc: "/images/testimonials/elena-brooks.png",
    },
    {
      name: "Priya Menon",
      role: "Parish Treasurer",
      quote: "Receipts and outstanding dues are clear now. I can answer a family in the same visit.",
      tone: 48,
      imageSrc: "/images/testimonials/priya-menon.png",
    },
    {
      name: "Thomas Okonkwo",
      role: "Sacramental Records Secretary",
      quote: "Baptism and marriage registers are easier to find, and certificates take minutes, not an afternoon.",
      tone: 132,
      imageSrc: "/images/testimonials/thomas-okonkwo.png",
    },
    {
      name: "Claire D’Souza",
      role: "Family Ministry Coordinator",
      quote: "I can see the household, not just a name. Pastoral visits are planned with far less searching.",
      tone: 248,
      imageSrc: "/images/testimonials/claire-dsouza.png",
    },
  ],
};

export const mockupTestimonialsCards = {
  title: "Modern Testimonials",
  subtitle: "We love volunteer leaders who use satisfied pastors.",
  items: [
    {
      name: "Jason Ramos",
      role: "Pastor / Admin",
      quote:
        "EkklesiaNexus keeps our parish records, giving, and follow-up in a workflow our volunteers can actually use.",
      tone: 210,
    },
    {
      name: "Jessen Dillon",
      role: "Pastor / Admin",
      quote:
        "We moved from scattered notes to one family view. Sunday follow-up is finally simple.",
      tone: 32,
    },
    {
      name: "Desteni Robins",
      role: "Pastor / Admin",
      quote:
        "Leaders can see who is serving, who gave, and who needs a pastoral visit — without extra tools.",
      tone: 265,
    },
  ],
};

/** Temporary static pricing while the published catalog section is commented out. */
export const mockupPricing = {
  title: "Pricing Overview",
  taxDisclaimer:
    "* Applicable taxes are calculated transparently in accordance with prevailing government regulations.",
  plans: [
    {
      id: "seed",
      name: "Starter",
      tagline: "Everything a small parish needs to keep family and sacrament records.",
      tone: "seed" as const,
      featured: false,
      currency_code: "INR",
      monthly_price: "1499",
      annual_price: "14990",
      limits: [
        { label: "People", value: "250" },
        { label: "Staff Users", value: "2" },
        { label: "Storage", value: "5120" },
      ],
      features: [
        "Church Profile",
        "Roles & Permissions",
        "Notifications",
        "Contributions",
        "Family Records",
        "Member Records",
        "Sacrament Records",
        "Basic Reports",
      ],
    },
    {
      id: "growth",
      name: "Standard",
      badge: "Most Popular",
      tagline: "Contributions, ministries and leadership for growing parishes.",
      tone: "growth" as const,
      featured: true,
      currency_code: "INR",
      monthly_price: "2999",
      annual_price: "29990",
      limits: [
        { label: "People", value: "1,000" },
        { label: "Staff Users", value: "5" },
        { label: "Storage", value: "20,480" },
      ],
      includes_label: "Everything in Starter, plus:",
      features: [
        "Advanced Roles & Permissions",
        "Audit Log",
        "Export",
        "Contribution Plans",
        "Financial Dashboard",
        "Church Leadership",
        "Ministries & Associations",
        "Advanced Dashboards",
      ],
    },
    {
      id: "summit",
      name: "Professional",
      tagline: "Advanced finance, analytics and automation for large parishes.",
      tone: "summit" as const,
      featured: false,
      currency_code: "INR",
      monthly_price: "4999",
      annual_price: "49990",
      limits: [
        { label: "People", value: "2,500" },
        { label: "Staff Users", value: "10" },
        { label: "Storage", value: "25,600" },
      ],
      includes_label: "Everything in Standard, plus:",
      features: [
        "Multiple Workflows",
        "Advanced Communication",
        "Advanced Financial Reporting",
        "Advanced Ministry Management",
        "Mass Intentions",
        "Advanced Analytics",
      ],
    },
  ],
};

// Dynamic catalog title — unused while the homepage uses mockupPricing above.
// export const mockupPricingTitle = "Pricing Overview";

export const mockupCta = {
  title: "Enterprise Edition — Your Vision. Our Expertise.",
  subtitle:
    "Discover bespoke workflows, advanced analytics, and tailored integrations crafted around your unique needs. Partner with our team to create a scalable solution that grows with your organization and strengthens your mission.",
  button: "Get Started",
};

export const mockupContact = {
  title: "Contact",
  subtitle: "Connect with Our Team — Get in touch to explore a solution tailored to your needs..",
};

export const mockupFooter = {
  links: [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Blog", href: "#blog" },
  ],
};
