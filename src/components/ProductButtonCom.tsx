'use client'

import { Button } from "@base-ui/react"
import Text from "./ui/Text"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addToCart } from "@/app/(pages)/cart/actions/add-cart.actions"
import { CartRes } from "@/interfaces/cart/cart.interface"
import { toast } from "react-toastify"

export default function ProductButtonCom({prodId,isProductItem}:{prodId:string,isProductItem:boolean}) {

    const queryClient = useQueryClient()
   
    const {mutate} = useMutation<CartRes,Error,string>({
        mutationFn:addToCart,
        onSuccess:()=>{
            toast.success('item added')
             queryClient.invalidateQueries({queryKey:['cart']})
        },
        onError:(error)=>{
              toast.error(error.message||'login first')
        }
    })


    function addToCartFun()
    {
       mutate(prodId)
    }



    return (

        <Button onClick={addToCartFun} className="min-h-5 flex-1 rounded-xl bg-green-btn p-2 text-white transition-opacity hover:opacity-90">

            {!isProductItem?<Text id="addToCart" />:'+'}
        </Button>
    )
}
