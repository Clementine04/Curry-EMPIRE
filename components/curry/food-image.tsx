import Image from "next/image"
import type { MenuCategory } from "@/lib/menu-data"

const CATEGORY_IMAGE: Record<MenuCategory, string> = {
  Starters: "/curry/starters.jpg",
  Salads: "/curry/salads.jpg",
  "Royal Platters": "/curry/platters.jpg",
  "Festive Chicken": "/curry/chicken.jpg",
  Shawarma: "/curry/shawarma.jpg",
  "Western Destinations": "/curry/western.jpg",
  "Eastern Destinations": "/curry/eastern.jpg",
  Curries: "/curry/curries.jpg",
  Biryani: "/curry/biryani.jpg",
  Kababs: "/curry/kababs.jpg",
  Pasta: "/curry/pasta.jpg",
  Pizza: "/curry/pizza.jpg",
  "Coffee & Tea": "/curry/coffee.jpg",
  "Froyo & Desserts": "/curry/desserts.jpg",
  Drinks: "/curry/drinks.jpg",
}

type Props = {
  category?: MenuCategory
  slug?: string
  src?: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}

export function FoodImage({
  category,
  slug,
  src,
  alt,
  width = 800,
  height = 800,
  className,
  priority,
  sizes,
}: Props) {
  const finalSrc =
    src ??
    (slug
      ? `/curry/menu-items/${slug}.jpg`
      : category
        ? CATEGORY_IMAGE[category]
        : "/curry/hero.jpg")
  return (
    <Image
      src={finalSrc || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  )
}
