"use client";

import { useState } from "react";
import { singleProductRes } from "./[id]/apis/product.api";
import Image from "next/image";
import { motion } from "framer-motion";

// إنشاء Motion Component من Next.js Image
const MotionImage = motion.create(Image);

export default function ImgCom({ res }: { res: singleProductRes }) {
  // القيمة الافتراضية هي الـ imageCover مباشرة
  const [src, setSrc] = useState<string>(res?.data?.imageCover || "");

  const currentSrc = src || res?.data?.imageCover;

  return (
    <div className="flex flex-col gap-4 max-w-md">
      {/* الصورة الرئيسية */}
      <div className="relative w-full h-80 rounded-lg overflow-hidden border">
        <Image
          src={currentSrc}
          alt={res?.data?.title || "Product image"}
          fill
          priority
          className="object-cover transition-all duration-300"
        />
      </div>

      {/* الصور المصغرة Thumbnails */}
      <div className="flex gap-3 overflow-x-auto py-2">
        {res?.data?.images?.map((img, index) => {
          const isSelected = currentSrc === img;

          return (
            <MotionImage
              key={`${img}-${index}`}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              width={70}
              height={70}
              onClick={() => setSrc(img)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`cursor-pointer rounded-md object-cover border-2 transition-colors ${
                isSelected ? "border-emerald-600 opacity-100" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}