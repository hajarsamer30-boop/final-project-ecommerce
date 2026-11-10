import { getTokenFun } from '@/libs/get-token'
import { jwtDecode } from 'jwt-decode'
import React, { Suspense } from 'react'
import OrdersCom from './Orders'

export default async function page() {


    const token = await getTokenFun()
    if (!token)
        throw new Error('unauthorize')

    const decoded = jwtDecode<{ id: string }>(token)


    return (
        <OrdersCom uId={decoded.id}></OrdersCom>
    )
}
