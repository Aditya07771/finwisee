import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, Coins, Sparkles, Check } from "lucide-react"

interface SubscriptionCardProps {
  userCoins: number
  subscriptionCost: number
  isActive?: boolean
}

export function SubscriptionCard({ userCoins, subscriptionCost, isActive = false }: SubscriptionCardProps) {
  const hasEnoughCoins = userCoins >= subscriptionCost

  return (
    <Card className="relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full" />
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-6 w-6 text-primary" />
          FinWise Premium
          {isActive && (
            <Badge variant="secondary" className="ml-auto">
              <Sparkles className="h-3 w-3 mr-1" />
              Active
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <p className="text-muted-foreground">
            Redeem your coins for a FinWise Monthly Subscription and unlock premium features!
          </p>

          <div className="flex items-center gap-2 text-lg font-semibold">
            <Coins className="h-5 w-5 text-primary" />
            <span>{subscriptionCost} coins = 1 month premium access</span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Premium Benefits</h4>
          <div className="grid grid-cols-1 gap-2">
            {[
              "Advanced analytics & insights",
              "Priority customer support",
              "Exclusive investment workshops",
              "Higher XP multipliers",
              "Custom budget categories",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Your coins:</span>
            <span className="font-semibold flex items-center gap-1">
              <Coins className="h-4 w-4 text-primary" />
              {userCoins.toLocaleString()}
            </span>
          </div>

          {hasEnoughCoins ? (
            <Button className="w-full" size="lg">
              <Crown className="h-4 w-4 mr-2" />
              Redeem Subscription
            </Button>
          ) : (
            <div className="space-y-2">
              <Button disabled className="w-full" size="lg">
                <Crown className="h-4 w-4 mr-2" />
                Not Enough Coins
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Earn more coins by completing streaks & challenges
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
