import { Stage } from "./song";
import { stageSchema } from "./song.schema";

export function isStage(value: string): value is Stage {
  return stageSchema.safeParse(value).success;
}
