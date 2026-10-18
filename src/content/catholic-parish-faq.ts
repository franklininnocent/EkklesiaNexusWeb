export type CatholicParishFaqItem = {
  id: string;
  question: string;
  answer: string;
};

/** English-only FAQ for /solutions/catholic-parishes — verified product scope only. */
export const catholicParishFaq: CatholicParishFaqItem[] = [
  {
    id: "who-for",
    question: "Who is EkklesiaNexus designed for?",
    answer:
      "Parish priests, secretaries, treasurers, and other authorized church staff who run day-to-day parish administration—not a parishioner self-service portal or check-in product.",
  },
  {
    id: "sacraments",
    question: "Does it support sacramental registers?",
    answer:
      "Yes. The parish application includes sacramental record workflows, certificate generation where your process uses it, and token-based certificate verification links your parish controls. It does not publish an open directory of sacramental data.",
  },
  {
    id: "bcc",
    question: "How do Life Groups or BCCs fit?",
    answer:
      "Basic Christian Communities (BCCs) are implemented in the product as Life Groups / BCC workflows alongside ministries and associations—so neighborhood faith communities stay visible next to family records.",
  },
  {
    id: "giving",
    question: "Is this online giving or a mobile donation app?",
    answer:
      "No. Stewardship features help staff record collections, plans, dues, and campaigns in the parish office. EkklesiaNexus does not market itself as a parishioner mobile-giving or card-processing gateway.",
  },
  {
    id: "check-in-volunteers",
    question: "Does it include check-in or volunteer scheduling?",
    answer:
      "No. Member check-in and volunteer scheduling suites are outside the marketed product scope. Evaluators looking primarily for rosters or door scanning should compare vendors that specialize in those tools.",
  },
  {
    id: "security",
    question: "How should IT evaluators think about access control?",
    answer:
      "The application uses role-based permissions and tenant isolation so each parish’s data stays scoped to authorized users. Ask for a guided conversation about your diocesan or parish IT requirements before relying on any security summary on a marketing page.",
  },
];
