
import * as zod from 'zod'

export const registerScheme = zod.object({
    name:zod.string().nonempty('this field is required').min(2).max(10),
    email:zod.string().nonempty().email(),
    password:zod.string().nonempty().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    rePassword:zod.string().nonempty(),
    phone:zod.string().nonempty().regex(/^(002)?01[0-25]\d{8}$/)
}).refine((data)=>data.password===data.rePassword,{
    error:'password , rePassword dont match',
    path:['rePassword']
})

export type regitsreSchemeType = zod.infer<typeof registerScheme>