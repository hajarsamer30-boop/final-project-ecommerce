import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest){

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`)
    const payload = await res.json()
      console.log(payload)

    return NextResponse.json({
      "message":'success',
      data:payload
    })

}