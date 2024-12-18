// SWOT Classification Function
const classifySWOT = (item) => {
  // Strength Indicators
  const isStrength =
    item.relevance > 3 ||
    item.likelihood > 3 ||
    item.sector === "Energy" ||
    item.country === "United States of America";

  // Weakness Indicators
  const isWeakness =
    item.relevance < 2 ||
    item.likelihood < 2 ||
    item.impact === "" ||
    item.end_year === "";

  // Opportunity Indicators
  const isOpportunity =
    item.topic === "battery" ||
    item.topic === "oil" ||
    item.pestle === "Technological" ||
    (item.insight && item.insight.toLowerCase().includes("market"));

  // Threat Indicators
  const isThreat =
    item.topic === "war" ||
    item.pestle === "Political" ||
    (item.insight && item.insight.toLowerCase().includes("recession"));

  // Prioritize classification
  if (isStrength) return "Strengths";
  if (isWeakness) return "Weaknesses";
  if (isOpportunity) return "Opportunities";
  if (isThreat) return "Threats";

  return "Unclassified";
};
export default classifySWOT;
