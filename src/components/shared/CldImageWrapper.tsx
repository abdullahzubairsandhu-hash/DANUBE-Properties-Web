// src/components/shared/CldImageWrapper.tsx

"use client";
import { CldImage as NextCldImage, CldImageProps } from 'next-cloudinary';

export default function CldImage(props: CldImageProps) {
  // We set default 'auto' formatting and quality for the Tycoon feel
  return <NextCldImage {...props} format="auto" quality="auto" />;
}