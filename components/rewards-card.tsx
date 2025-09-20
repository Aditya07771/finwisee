import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Coins, Gift } from "lucide-react"

interface RewardsCardProps {
  title: string
  image: string
  coinCost: number
  category: string
  description?: string
  isPopular?: boolean
}

export function RewardsCard({ title, image, coinCost, category, description, isPopular = false }: RewardsCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 relative overflow-hidden">
      {isPopular && <Badge className="absolute top-2 right-2 z-10 bg-accent text-accent-foreground">Popular</Badge>}
      <CardHeader className="p-0">
        <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div className="space-y-1">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
          <CardTitle className="text-lg leading-tight">{title}</CardTitle>
          {description && <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-green-600 font-semibold">
            <Coins className="h-4 w-4" />
            <span>₹{coinCost.toLocaleString()}</span>
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <Gift className="h-4 w-4 mr-1" />
            Redeem
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
