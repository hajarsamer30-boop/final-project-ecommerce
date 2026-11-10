import * as zod from "zod";

export const loginScheme = zod.object({
  email: zod.string().nonempty().email(),
  password: zod
    .string()
    .nonempty()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    ),
});

export type loginSchemeType = zod.infer<typeof loginScheme>;
