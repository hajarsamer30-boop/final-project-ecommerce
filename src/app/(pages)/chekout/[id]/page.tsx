import ChecktCom from "../ChecoutCom"
import { Suspense } from "react";
export default async function page({params}:{params:Promise<{id:string}>}) {
 
 
  const {id} = await params

  return (
    <Suspense fallback={'loading...'}>
      <ChecktCom cartId={id}></ChecktCom>
    </Suspense>
  )
}
