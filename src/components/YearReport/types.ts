export type TEnhancedTour = TTour & { routeObj: TRoute | undefined };
export type TGroupedTours = {
  id: string;
  participant: TPerson | undefined;
  totalPoints: number;
  distance: number;
  elevation: number;
  tourCount: number;
  tours: TEnhancedTour[]
};