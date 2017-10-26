export type TEnhancedTour = TTour & { routeObj: TRoute | undefined };
export type TGroupedTours = {
  id: string;
  date: string;
  tour: TEnhancedTour;
  totalPoints: number;
  distance: number;
  elevation: number;
  participantCount: number;
  participants: (TPerson | undefined)[];
};