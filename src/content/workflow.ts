import type { WorkflowStep } from "@/types/marketing";

export const workflowContent = {
  title: "A Connected Parish Administration Flow",
  steps: [
    { id: "1", label: "Review Dashboard" },
    { id: "2", label: "Manage Families & Members" },
    { id: "3", label: "Maintain Pastoral Records" },
    { id: "4", label: "Manage Stewardship" },
    { id: "5", label: "Coordinate Parish Communities" },
    { id: "6", label: "Review Projects & Campaigns" },
    { id: "7", label: "Review Reports & Insights" },
  ] satisfies WorkflowStep[],
};
