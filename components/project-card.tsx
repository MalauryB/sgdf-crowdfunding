"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, MapPin, Users, Edit3, Heart } from "lucide-react"
import { getAssetPath, getImagePath } from "@/lib/utils"

interface ProjectCardProps {
  id: string
  title: string
  description: string
  image: string
  category: string
  // Support both location and territory props for backward compatibility
  location?: string
  territory?: string
  // Support both targetAmount/currentAmount and goal/raised
  targetAmount?: number
  currentAmount?: number
  goal?: number
  raised?: number
  daysLeft: number
  // Support both supportersCount and contributors
  supportersCount?: number
  contributors?: number
  branch?: string
  // New props for enhanced functionality
  showEditButton?: boolean
  isFavorite?: boolean
  onToggleFavorite?: () => void
  status?: string
}

const branchColors = {
  farfadets: "bg-green-100 text-green-800",
  louveteaux: "bg-orange-100 text-orange-800",
  "louveteaux et jeannettes": "bg-orange-100 text-orange-800",
  scouts: "bg-blue-100 text-blue-800",
  "scouts et guides": "bg-blue-100 text-blue-800",
  pionniers: "bg-red-100 text-red-800",
  "pionniers et caravelles": "bg-red-100 text-red-800",
  compagnons: "bg-emerald-100 text-emerald-800",
  groupe: "bg-purple-100 text-purple-800",
}

export function ProjectCard({
  id,
  title,
  description,
  image,
  category,
  location,
  territory,
  targetAmount,
  currentAmount,
  goal,
  raised,
  daysLeft,
  supportersCount,
  contributors,
  branch,
  showEditButton = false,
  isFavorite = false,
  onToggleFavorite,
  status,
}: ProjectCardProps) {
  const finalLocation = territory || location || "Non spécifié"
  const finalTargetAmount = goal || targetAmount || 0
  const finalCurrentAmount = raised || currentAmount || 0
  const finalSupportersCount = contributors || supportersCount || 0

  const progressPercentage = finalTargetAmount > 0 ? (finalCurrentAmount / finalTargetAmount) * 100 : 0

  const branchKey = branch?.toLowerCase() as keyof typeof branchColors
  const branchColorClass = branchColors[branchKey] || "bg-gray-100 text-gray-800"

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img src={getImagePath(image || "/placeholder.svg")} alt={title} className="w-full h-48 object-cover" />
        {branch && <Badge className={`absolute top-3 left-3 ${branchColorClass}`}>{branch}</Badge>}
        {onToggleFavorite && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 bg-white/90 backdrop-blur hover:bg-white"
            onClick={onToggleFavorite}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </Button>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-bold text-primary line-clamp-2">{title}</h3>
          <Badge variant="outline" className="text-xs shrink-0">
            {category}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{finalLocation}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{finalSupportersCount}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{finalCurrentAmount.toLocaleString("fr-FR")} €</span>
            <span className="text-muted-foreground">sur {finalTargetAmount.toLocaleString("fr-FR")} €</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{daysLeft} jours restants</span>
          </div>
        </div>

        {status && (
          <Badge variant="secondary" className="text-xs">
            {status}
          </Badge>
        )}
      </CardContent>

      <CardFooter className="gap-2">
        {showEditButton ? (
          <>
            <Button variant="outline" className="flex-1 bg-transparent" asChild>
              <a href={`#`}>
                <Edit3 className="w-4 h-4 mr-2" />
                Modifier
              </a>
            </Button>
            <Button className="flex-1 bg-primary hover:bg-primary/90" asChild>
              <a href={getAssetPath(`/project/${id}`)}>Voir le projet</a>
            </Button>
          </>
        ) : (
          <Button className="w-full bg-primary hover:bg-primary/90" asChild>
            <a href={getAssetPath(`/project/${id}`)}>Soutenir ce projet</a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
