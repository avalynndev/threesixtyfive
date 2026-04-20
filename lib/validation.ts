import {z} from 'zod'

const isValidDate = (s:string) => {
    const [year,month,day] = s.split('-').map(Number)
    const d = new Date(year, month - 1, day)
    return d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate()
}


const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
  .refine(isValidDate, 'Invalid date')


export const wallpaperSchema = z.object({
  country: z
    .string()
    .min(2)
    .max(5)
    .default("us")
    .transform((v) => v.toLowerCase()),
  type: z.enum(["year", "life", "goal"]).default("year"),
  bg: z
    .string()
    .regex(/^[0-9A-Fa-f]{6}$/, "Invalid hex color")
    .default("000000"),
  accent: z
    .string()
    .regex(/^[0-9A-Fa-f]{6}$/, "Invalid hex color")
    .default("FFFFFF"),
  width: z.coerce.number().int().min(300).max(8000).default(1170),
  height: z.coerce.number().int().min(300).max(8000).default(2532),
  clockHeight: z.coerce.number().min(0).max(0.5).default(0.18),
  dob: dateSchema.optional(),
  lifespan: z.coerce.number().int().min(1).max(120).default(80),
  goal: dateSchema.optional(),
  goalStart: dateSchema.optional(),
  goalName: z.string().max(100).default("Goal"),
  format: z.enum(["png", "svg"]).default("png"),
}).refine(
    (data) => {
        if (data.goalStart && data.goal) return data.goalStart <= data.goal;
        return true;
    },
    { message: 'Goal start date must be on or before the goal date', path: ['goalStart']}
)

export type WallpaperParams = z.infer<typeof wallpaperSchema>