import { en, type Messages } from "../../messages/en";
import { pt } from "../../messages/pt";
import type { Locale } from "./config";

export type { Messages };
export const messages: Record<Locale, Messages> = { en, pt };
