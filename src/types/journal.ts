export type UpdateType = "soil" | "sowing" | "irrigation" | "harvest" | "inspection";

export interface HarvestJournalEntry {
  id: string;
  farmId: string;
  date: string;
  type: UpdateType;
  title: string;
  notes: string;
  weather: string;
  images: string[];
}
