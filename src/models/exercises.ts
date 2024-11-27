export interface Exercise {
  id: number;
  label: string;
  path: string;
  caption: string;
}

export interface WeeklyExercises {
  week: string;
  label: string;
  exercises: Exercise[];
}
