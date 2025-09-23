"use client"

import { useState } from "react"
import { SGDFLogo } from "@/components/sgdf-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  Calendar,
  Users,
  FileText,
  MessageCircle,
  Euro,
  Download,
  Send,
  Reply,
  Edit,
  Trash2,
  Lock,
  Unlock,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"

// Mock data for the project
const projectData = {
  id: "1",
  title: "Camp d'été Louveteaux-Jeannettes à Chamonix",
  description:
    "Notre meute et compagnie organisent un camp d'été de 8 jours dans les Alpes pour 24 jeunes de 8 à 11 ans. Au programme : randonnées adaptées, grands jeux en montagne, veillées et découverte de la faune alpine.",
  longDescription: `
    <h3>Contexte du projet</h3>
    <p>Chaque été, notre groupe organise un camp pour nos Louveteaux et Jeannettes. Cette année, nous avons choisi Chamonix pour faire découvrir la montagne à nos 24 jeunes âgés de 8 à 11 ans.</p>
    
    <h3>Programme du camp</h3>
    <ul>
      <li>Randonnées pédestres adaptées aux plus jeunes avec découverte de la faune et flore alpine</li>
      <li>Grands jeux sur le thème du Livre de la Jungle dans un cadre exceptionnel</li>
      <li>Ateliers nature : construction de cabanes, observation des marmottes</li>
      <li>Veillées traditionnelles scoutes autour du feu de camp</li>
      <li>Visite de la Mer de Glace et sensibilisation au réchauffement climatique</li>
    </ul>
    
    <h3>Budget détaillé</h3>
    <p>Le coût total du camp s'élève à 4500€ répartis comme suit :</p>
    <ul>
      <li>Hébergement en gîte de montagne : 2000€</li>
      <li>Transport en car : 1200€</li>
      <li>Nourriture et intendance : 800€</li>
      <li>Activités et matériel : 500€</li>
    </ul>
    
    <h3>Impact pédagogique</h3>
    <p>Ce camp permettra à nos jeunes de développer leur autonomie, de découvrir la montagne et de vivre une aventure collective inoubliable dans l'esprit scout.</p>
  `,
  images: ["/chalet_de_montagne.png", "/ardèche.png", "/camping_materiels.png"],
  category: "Activité",
  branch: "louveteaux",
  location: "Chamonix, Haute-Savoie",
  targetAmount: 4500,
  currentAmount: 3200,
  supportersCount: 18,
  daysLeft: 35,
  createdAt: "2024-01-15",
  deadline: "2024-03-15",
  status: "validated", // Changed from "active" to "validated" to show project state
  structure: "Groupe Scout Saint-Michel - Annecy",
  creator: {
    name: "Sophie Martin",
    role: "Cheftaine de meute",
    avatar: "/placeholder.svg?key=avatar1",
  },
  updates: [
    {
      id: 1,
      date: "2024-02-01",
      title: "Réservation du gîte confirmée !",
      content:
        "Excellente nouvelle ! Nous avons confirmé la réservation de notre gîte à Chamonix. Les jeunes vont adorer la vue sur le Mont-Blanc depuis les chambres !",
      author: "Sophie Martin",
    },
    {
      id: 2,
      date: "2024-01-20",
      title: "Programme d'activités finalisé",
      content:
        "Nous avons bouclé le programme avec nos partenaires locaux. Au menu : randonnée aux lacs de Chamonix, visite de la Mer de Glace et grands jeux dans la forêt !",
      author: "Thomas Dubois",
    },
  ],
  supporters: [
    { name: "Groupe de Grenoble", amount: 500, date: "2024-02-01" },
    { name: "Territoire Savoie", amount: 800, date: "2024-01-28" },
    { name: "Parents d'élèves", amount: 400, date: "2024-01-25" },
    { name: "Groupe d'Annemasse", amount: 300, date: "2024-01-22" },
  ],
  rewards: [
    {
      id: 1,
      amount: 25,
      title: "Carte postale du camp",
      description: "Recevez une carte postale personnalisée envoyée depuis Chamonix par nos jeunes",
      available: 50,
      claimed: 12,
    },
    {
      id: 2,
      amount: 50,
      title: "Photos numériques",
      description: "Accès à l'album photo numérique complet du camp avec toutes les activités",
      available: 30,
      claimed: 8,
    },
    {
      id: 3,
      amount: 100,
      title: "Invitation à la soirée de restitution",
      description: "Participez à notre soirée de présentation du camp avec diaporama et témoignages",
      available: 20,
      claimed: 5,
    },
    {
      id: 4,
      amount: 200,
      title: "Visite du local scout",
      description: "Venez découvrir notre local et rencontrer l'équipe d'animation lors d'une activité",
      available: 10,
      claimed: 2,
    },
  ],
  history: [
    {
      date: "2024-02-05",
      action: "Projet validé par le territoire",
      user: "Marie Dupont - Responsable territorial",
      status: "validated",
    },
    {
      date: "2024-01-28",
      action: "Document de validation du conseil téléversé",
      user: "Sophie Martin - Cheftaine",
      status: "pending_validation",
    },
    {
      date: "2024-01-20",
      action: "Budget détaillé ajouté",
      user: "Sophie Martin - Cheftaine",
      status: "draft",
    },
    {
      date: "2024-01-15",
      action: "Projet créé",
      user: "Sophie Martin - Cheftaine",
      status: "draft",
    },
  ],
  comments: [
    {
      id: 1,
      content: "Excellent projet ! Nos jeunes de Grenoble seraient ravis de participer à une activité similaire.",
      author: "Pierre Durand",
      structure: "Groupe Scout Sainte-Thérèse - Grenoble",
      avatar: "/placeholder.svg?key=avatar2",
      date: "2024-02-10T14:30:00Z",
      isPrivate: false,
      isEdited: false,
      replies: [
        {
          id: 11,
          content: "Merci Pierre ! N'hésitez pas à nous contacter pour échanger sur l'organisation.",
          author: "Sophie Martin",
          structure: "Groupe Scout Saint-Michel - Annecy",
          avatar: "/placeholder.svg?key=avatar1",
          date: "2024-02-10T16:45:00Z",
          isPrivate: false,
          isEdited: false,
        },
      ],
    },
    {
      id: 2,
      content: "Le budget semble bien équilibré. Avez-vous prévu des activités de repli en cas de mauvais temps ?",
      author: "Marie Dupont",
      structure: "Territoire Savoie",
      avatar: "/placeholder.svg?key=avatar3",
      date: "2024-02-08T10:15:00Z",
      isPrivate: false,
      isEdited: true,
      replies: [],
    },
    {
      id: 3,
      content:
        "Attention aux autorisations pour les randonnées en montagne avec des jeunes de cet âge. Pensez à vérifier les assurances spécifiques.",
      author: "Jean-Claude Moreau",
      structure: "Commission Formation Territoriale",
      avatar: "/placeholder.svg?key=avatar4",
      date: "2024-02-06T09:20:00Z",
      isPrivate: true, // Private comment visible only during draft phase
      isEdited: false,
      replies: [
        {
          id: 31,
          content:
            "Merci pour ce rappel important ! Nous avons déjà contacté notre assureur pour les spécificités montagne.",
          author: "Sophie Martin",
          structure: "Groupe Scout Saint-Michel - Annecy",
          avatar: "/placeholder.svg?key=avatar1",
          date: "2024-02-06T11:30:00Z",
          isPrivate: true,
          isEdited: false,
        },
      ],
    },
  ],
}

// Mock current user data
const currentUser = {
  name: "Thomas Dubois",
  structure: "Groupe Scout Saint-Michel - Annecy",
  avatar: "/placeholder.svg?key=current-user",
  role: "assistant", // Can be: creator, assistant, territorial, national, viewer
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [donationAmount, setDonationAmount] = useState("")
  const [selectedReward, setSelectedReward] = useState<number | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [editingComment, setEditingComment] = useState<number | null>(null)
  const [editContent, setEditContent] = useState("")

  const [isProcessingDonation, setIsProcessingDonation] = useState(false)
  const [donationError, setDonationError] = useState("")
  const [userCredit, setUserCredit] = useState(1500) // Simulated user available credit
  const [showDonationSuccess, setShowDonationSuccess] = useState(false)

  const progressPercentage = (projectData.currentAmount / projectData.targetAmount) * 100
  const remainingAmount = projectData.targetAmount - projectData.currentAmount

  const branchColors = {
    farfadets: "bg-green-100 text-green-800",
    louveteaux: "bg-orange-100 text-orange-800",
    scouts: "bg-blue-100 text-blue-800",
    pionniers: "bg-red-100 text-red-800",
    compagnons: "bg-emerald-100 text-emerald-800",
  }

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "draft":
        return { label: "Brouillon", color: "bg-gray-100 text-gray-800", icon: "📝" }
      case "pending_validation":
        return { label: "En attente de validation", color: "bg-yellow-100 text-yellow-800", icon: "⏳" }
      case "validated":
        return { label: "Validé", color: "bg-green-100 text-green-800", icon: "✅" }
      case "refused":
        return { label: "Refusé", color: "bg-red-100 text-red-800", icon: "❌" }
      case "funded":
        return { label: "Financé", color: "bg-blue-100 text-blue-800", icon: "💰" }
      case "completed":
        return { label: "Terminé", color: "bg-purple-100 text-purple-800", icon: "🎉" }
      default:
        return { label: "Actif", color: "bg-green-100 text-green-800", icon: "✅" }
    }
  }

  const statusDisplay = getStatusDisplay(projectData.status)

  const getVisibleComments = () => {
    if (projectData.status === "draft" || projectData.status === "pending_validation") {
      // In draft/pending phase, show all comments (private and public)
      return projectData.comments
    } else {
      // In validated phase, show only public comments
      return projectData.comments.filter((comment) => !comment.isPrivate)
    }
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return

    // In real app, this would make an API call
    console.log("[v0] Adding comment:", {
      content: newComment,
      isPrivate: projectData.status === "draft" || projectData.status === "pending_validation",
    })

    setNewComment("")
  }

  const handleReply = (commentId: number) => {
    if (!replyContent.trim()) return

    console.log("[v0] Adding reply to comment", commentId, ":", replyContent)
    setReplyingTo(null)
    setReplyContent("")
  }

  const handleEditComment = (commentId: number) => {
    if (!editContent.trim()) return

    console.log("[v0] Editing comment", commentId, ":", editContent)
    setEditingComment(null)
    setEditContent("")
  }

  const canEditComment = (comment: any) => {
    return comment.author === currentUser.name || currentUser.role === "creator"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const validateDonation = (amount: number) => {
    const remainingAmount = projectData.targetAmount - projectData.currentAmount

    if (amount <= 0) {
      return "Le montant doit être supérieur à 0 €"
    }

    if (amount > remainingAmount) {
      return `Le montant ne peut pas dépasser le reste à financer (${remainingAmount} €)`
    }

    if (amount > userCredit) {
      return `Le montant ne peut pas dépasser votre crédit disponible (${userCredit} €)`
    }

    if (selectedReward) {
      const reward = projectData.rewards.find((r) => r.id === selectedReward)
      if (reward && amount < reward.amount) {
        return `Le montant minimum pour cette contrepartie est de ${reward.amount} €`
      }
    }

    return null
  }

  const handleDonationPromise = async () => {
    const amount = Number.parseFloat(donationAmount)
    const validationError = validateDonation(amount)

    if (validationError) {
      setDonationError(validationError)
      return
    }

    setIsProcessingDonation(true)
    setDonationError("")

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Check if project is still available for funding (race condition simulation)
      const currentRemainingAmount = projectData.targetAmount - projectData.currentAmount
      if (amount > currentRemainingAmount) {
        throw new Error(`Le projet a été financé entre temps. Reste disponible : ${currentRemainingAmount} €`)
      }

      // Simulate successful donation promise
      console.log("[v0] Donation promise created:", {
        projectId: params.id,
        amount,
        rewardId: selectedReward,
        userCredit: userCredit - amount,
      })

      // Update local state to reflect the donation
      setUserCredit((prev) => prev - amount)
      setShowDonationSuccess(true)
      setDonationAmount("")
      setSelectedReward(null)

      // Hide success message after 3 seconds
      setTimeout(() => setShowDonationSuccess(false), 3000)
    } catch (error) {
      setDonationError(error instanceof Error ? error.message : "Une erreur est survenue")
    } finally {
      setIsProcessingDonation(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <SGDFLogo size="md" />
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsFavorite(!isFavorite)}>
                <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                {isFavorite ? "Retiré des favoris" : "Ajouter aux favoris"}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Partager
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className={branchColors[projectData.branch as keyof typeof branchColors]}>
                    Louveteaux et Jeannettes
                  </Badge>
                  <Badge variant="outline">{projectData.category}</Badge>
                  <Badge className={statusDisplay.color}>
                    <span className="mr-1">{statusDisplay.icon}</span>
                    {statusDisplay.label}
                  </Badge>
                </div>
              </div>

              <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">{projectData.title}</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-primary mb-2">Informations du projet</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Budget total :</span>
                      <span className="font-medium">{projectData.targetAmount.toLocaleString("fr-FR")} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Montant recherché :</span>
                      <span className="font-medium">{projectData.targetAmount.toLocaleString("fr-FR")} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Échéance :</span>
                      <span className="font-medium">{new Date(projectData.deadline).toLocaleDateString("fr-FR")}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Progression</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Collecté :</span>
                      <span className="font-medium text-green-600">
                        {projectData.currentAmount.toLocaleString("fr-FR")} €
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reste à collecter :</span>
                      <span className="font-medium">
                        {(projectData.targetAmount - projectData.currentAmount).toLocaleString("fr-FR")} €
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Contributeurs :</span>
                      <span className="font-medium">{projectData.supportersCount}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{projectData.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{projectData.daysLeft} jours restants</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{projectData.supportersCount} contributeurs</span>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={projectData.images[activeImageIndex] || "/placeholder.svg"}
                  alt={projectData.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
                {projectData.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {projectData.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-3 h-3 rounded-full ${index === activeImageIndex ? "bg-white" : "bg-white/50"}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {projectData.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {projectData.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        index === activeImageIndex ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Project Details Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="rewards">Contreparties</TabsTrigger>
                <TabsTrigger value="updates">Actualités</TabsTrigger>
                <TabsTrigger value="supporters">Contributeurs</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="comments">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Discussion
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: projectData.longDescription }}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rewards" className="mt-6">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contreparties disponibles</CardTitle>
                      <p className="text-muted-foreground">
                        Choisissez une contrepartie pour remercier votre contribution au projet
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {projectData.rewards.map((reward) => (
                        <div
                          key={reward.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedReward === reward.id
                              ? "border-primary bg-primary/5"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedReward(reward.id)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-primary">{reward.amount} € ou plus</h3>
                              <h4 className="font-medium">{reward.title}</h4>
                            </div>
                            <div className="text-right text-sm text-muted-foreground">
                              {reward.available - reward.claimed} disponibles
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">{reward.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              {reward.claimed} contributeur{reward.claimed > 1 ? "s" : ""}
                            </span>
                            {reward.available - reward.claimed === 0 && <Badge variant="secondary">Épuisé</Badge>}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="updates" className="mt-6">
                <div className="space-y-4">
                  {projectData.updates.map((update) => (
                    <Card key={update.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback>{update.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{update.title}</h3>
                              <span className="text-sm text-muted-foreground">{update.date}</span>
                            </div>
                            <p className="text-muted-foreground mb-2">{update.content}</p>
                            <p className="text-sm text-muted-foreground">Par {update.author}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="supporters" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {projectData.supporters.map((supporter, index) => (
                        <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>{supporter.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{supporter.name}</p>
                              <p className="text-sm text-muted-foreground">{supporter.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-primary">{supporter.amount} €</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Budget détaillé</p>
                            <p className="text-sm text-muted-foreground">PDF - 245 KB</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Télécharger
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Validation du conseil</p>
                            <p className="text-sm text-muted-foreground">PDF - 156 KB</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Télécharger
                        </Button>
                      </div>

                      <div className="mt-8">
                        <h3 className="font-semibold text-primary mb-4">Historique du projet</h3>
                        <div className="space-y-3">
                          {projectData.history.map((entry, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <p className="font-medium text-sm">{entry.action}</p>
                                  <span className="text-xs text-muted-foreground">{entry.date}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{entry.user}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comments" className="mt-6">
                <div className="space-y-6">
                  {/* Comment visibility info */}
                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {projectData.status === "draft" || projectData.status === "pending_validation" ? (
                          <Lock className="w-5 h-5 text-blue-500 mt-0.5" />
                        ) : (
                          <Unlock className="w-5 h-5 text-green-500 mt-0.5" />
                        )}
                        <div>
                          <h3 className="font-semibold text-sm mb-1">
                            {projectData.status === "draft" || projectData.status === "pending_validation"
                              ? "Discussion privée"
                              : "Discussion publique"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {projectData.status === "draft" || projectData.status === "pending_validation"
                              ? "Les commentaires sont visibles uniquement par les membres de votre structure et les validateurs pendant la phase de préparation."
                              : "Les commentaires sont maintenant visibles par tous les visiteurs du projet validé."}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Add new comment */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-3">
                          <Textarea
                            placeholder={
                              projectData.status === "draft" || projectData.status === "pending_validation"
                                ? "Ajoutez un commentaire privé (visible par votre structure et les validateurs)..."
                                : "Ajoutez un commentaire public..."
                            }
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            rows={3}
                          />
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              {projectData.status === "draft" || projectData.status === "pending_validation" ? (
                                <>
                                  <Lock className="w-4 h-4" />
                                  <span>Commentaire privé</span>
                                </>
                              ) : (
                                <>
                                  <Unlock className="w-4 h-4" />
                                  <span>Commentaire public</span>
                                </>
                              )}
                            </div>
                            <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                              <Send className="w-4 h-4 mr-2" />
                              Publier
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Comments list */}
                  <div className="space-y-4">
                    {getVisibleComments().map((comment) => (
                      <Card key={comment.id} className={comment.isPrivate ? "border-l-4 border-l-orange-500" : ""}>
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            {/* Main comment */}
                            <div className="flex items-start gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-semibold text-sm">{comment.author}</span>
                                  <span className="text-xs text-muted-foreground">•</span>
                                  <span className="text-xs text-muted-foreground">{comment.structure}</span>
                                  <span className="text-xs text-muted-foreground">•</span>
                                  <span className="text-xs text-muted-foreground">{formatDate(comment.date)}</span>
                                  {comment.isEdited && (
                                    <>
                                      <span className="text-xs text-muted-foreground">•</span>
                                      <span className="text-xs text-muted-foreground italic">modifié</span>
                                    </>
                                  )}
                                  {comment.isPrivate && (
                                    <Badge variant="outline" className="text-xs">
                                      <Lock className="w-3 h-3 mr-1" />
                                      Privé
                                    </Badge>
                                  )}
                                </div>

                                {editingComment === comment.id ? (
                                  <div className="space-y-2">
                                    <Textarea
                                      value={editContent}
                                      onChange={(e) => setEditContent(e.target.value)}
                                      rows={2}
                                    />
                                    <div className="flex gap-2">
                                      <Button size="sm" onClick={() => handleEditComment(comment.id)}>
                                        Sauvegarder
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                          setEditingComment(null)
                                          setEditContent("")
                                        }}
                                      >
                                        Annuler
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <p className="text-sm mb-3">{comment.content}</p>
                                    <div className="flex items-center gap-2">
                                      <Button variant="ghost" size="sm" onClick={() => setReplyingTo(comment.id)}>
                                        <Reply className="w-3 h-3 mr-1" />
                                        Répondre
                                      </Button>
                                      {canEditComment(comment) && (
                                        <>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                              setEditingComment(comment.id)
                                              setEditContent(comment.content)
                                            }}
                                          >
                                            <Edit className="w-3 h-3 mr-1" />
                                            Modifier
                                          </Button>
                                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                            <Trash2 className="w-3 h-3 mr-1" />
                                            Supprimer
                                          </Button>
                                        </>
                                      )}
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Reply form */}
                            {replyingTo === comment.id && (
                              <div className="ml-11 space-y-3">
                                <div className="flex items-start gap-3">
                                  <Avatar className="w-6 h-6">
                                    <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                                    <AvatarFallback className="text-xs">{currentUser.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 space-y-2">
                                    <Textarea
                                      placeholder="Votre réponse..."
                                      value={replyContent}
                                      onChange={(e) => setReplyContent(e.target.value)}
                                      rows={2}
                                    />
                                    <div className="flex gap-2">
                                      <Button size="sm" onClick={() => handleReply(comment.id)}>
                                        Répondre
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                          setReplyingTo(null)
                                          setReplyContent("")
                                        }}
                                      >
                                        Annuler
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Replies */}
                            {comment.replies && comment.replies.length > 0 && (
                              <div className="ml-11 space-y-3 border-l-2 border-gray-100 pl-4">
                                {comment.replies.map((reply) => (
                                  <div key={reply.id} className="flex items-start gap-3">
                                    <Avatar className="w-6 h-6">
                                      <AvatarImage src={reply.avatar || "/placeholder.svg"} />
                                      <AvatarFallback className="text-xs">{reply.author.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-xs">{reply.author}</span>
                                        <span className="text-xs text-muted-foreground">•</span>
                                        <span className="text-xs text-muted-foreground">{reply.structure}</span>
                                        <span className="text-xs text-muted-foreground">•</span>
                                        <span className="text-xs text-muted-foreground">{formatDate(reply.date)}</span>
                                        {reply.isEdited && (
                                          <>
                                            <span className="text-xs text-muted-foreground">•</span>
                                            <span className="text-xs text-muted-foreground italic">modifié</span>
                                          </>
                                        )}
                                        {reply.isPrivate && (
                                          <Badge variant="outline" className="text-xs">
                                            <Lock className="w-3 h-3 mr-1" />
                                            Privé
                                          </Badge>
                                        )}
                                      </div>
                                      <p className="text-xs">{reply.content}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {getVisibleComments().length === 0 && (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">Aucun commentaire pour le moment</h3>
                        <p className="text-muted-foreground text-sm">Soyez le premier à commenter ce projet !</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Funding Progress */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">
                      {projectData.currentAmount.toLocaleString("fr-FR")} €
                    </div>
                    <div className="text-muted-foreground">
                      collectés sur {projectData.targetAmount.toLocaleString("fr-FR")} €
                    </div>
                  </div>

                  <Progress value={progressPercentage} className="h-3" />

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{Math.round(progressPercentage)}%</div>
                      <div className="text-sm text-muted-foreground">Financé</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{projectData.daysLeft}</div>
                      <div className="text-sm text-muted-foreground">Jours restants</div>
                    </div>
                  </div>

                  <div className="text-center text-muted-foreground">
                    Il reste{" "}
                    <span className="font-semibold text-foreground">{remainingAmount.toLocaleString("fr-FR")} €</span> à
                    collecter
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Donation Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Euro className="w-5 h-5" />
                  Soutenir ce projet
                </CardTitle>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Reste à financer :{" "}
                    <span className="font-semibold text-primary">
                      {projectData.targetAmount - projectData.currentAmount} €
                    </span>
                  </span>
                  <span className="text-muted-foreground">
                    Votre crédit : <span className="font-semibold text-green-600">{userCredit} €</span>
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {projectData.status !== "validated" ? (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 text-yellow-800">
                      <AlertTriangle className="w-5 h-5" />
                      <p className="font-medium">Projet en cours de validation</p>
                    </div>
                    <p className="text-sm text-yellow-700 mt-1">
                      Les promesses de dons ne sont possibles que sur les projets validés.
                    </p>
                  </div>
                ) : (
                  <>
                    {showDonationSuccess && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 text-green-800">
                          <CheckCircle className="w-5 h-5" />
                          <p className="font-medium">Promesse de don enregistrée !</p>
                        </div>
                        <p className="text-sm text-green-700 mt-1">
                          Votre contribution sera prélevée si le projet atteint son objectif.
                        </p>
                      </div>
                    )}

                    {selectedReward && (
                      <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg mb-4">
                        <p className="text-sm font-medium text-primary">
                          Contrepartie sélectionnée : {projectData.rewards.find((r) => r.id === selectedReward)?.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Montant minimum : {projectData.rewards.find((r) => r.id === selectedReward)?.amount} €
                        </p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="amount">Montant de votre promesse de don (€)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder={
                          selectedReward
                            ? `Minimum ${projectData.rewards.find((r) => r.id === selectedReward)?.amount} €`
                            : "Ex: 100"
                        }
                        value={donationAmount}
                        onChange={(e) => {
                          setDonationAmount(e.target.value)
                          setDonationError("")
                        }}
                        min={selectedReward ? projectData.rewards.find((r) => r.id === selectedReward)?.amount : 1}
                        max={Math.min(projectData.targetAmount - projectData.currentAmount, userCredit)}
                        disabled={isProcessingDonation}
                      />
                      {donationError && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {donationError}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {[50, 100, 200].map((amount) => {
                        const maxAmount = Math.min(projectData.targetAmount - projectData.currentAmount, userCredit)
                        const isDisabled = amount > maxAmount || isProcessingDonation
                        return (
                          <Button
                            key={amount}
                            variant={isDisabled ? "secondary" : "outline"}
                            size="sm"
                            onClick={() => !isDisabled && setDonationAmount(amount.toString())}
                            disabled={isDisabled}
                          >
                            {amount} €
                          </Button>
                        )
                      })}
                    </div>

                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      size="lg"
                      onClick={handleDonationPromise}
                      disabled={!donationAmount || isProcessingDonation || !!donationError}
                    >
                      {isProcessingDonation ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Traitement en cours...
                        </>
                      ) : (
                        "Faire une promesse de don"
                      )}
                    </Button>

                    <div className="space-y-2 text-xs text-muted-foreground">
                      <p className="text-center">
                        Votre contribution sera prélevée uniquement si le projet atteint son objectif
                      </p>
                      <div className="p-3 bg-gray-50 rounded-lg space-y-1">
                        <p className="font-medium text-gray-700">Règles de financement :</p>
                        <p>
                          • Montant maximum : reste à financer ({projectData.targetAmount - projectData.currentAmount}{" "}
                          €)
                        </p>
                        <p>• Montant maximum : votre crédit disponible ({userCredit} €)</p>
                        <p>• Gestion automatique des conflits de financement</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Project Creator */}
            <Card>
              <CardHeader>
                <CardTitle>Porteur du projet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={projectData.creator.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{projectData.creator.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{projectData.creator.name}</p>
                    <p className="text-sm text-muted-foreground">{projectData.creator.role}</p>
                    <p className="text-sm text-muted-foreground">{projectData.structure}</p>
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full bg-transparent">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contacter
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contacter {projectData.creator.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Votre message..."
                        value={""}
                        onChange={(e) => console.log(e.target.value)}
                        rows={4}
                      />
                      <Button className="w-full">Envoyer le message</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Project Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Créé le</span>
                  <span>{new Date(projectData.createdAt).toLocaleDateString("fr-FR")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Date limite</span>
                  <span>{new Date(projectData.deadline).toLocaleDateString("fr-FR")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Statut</span>
                  <Badge className={statusDisplay.color}>
                    <span className="mr-1">{statusDisplay.icon}</span>
                    {statusDisplay.label}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Budget total</span>
                  <span className="font-medium">{projectData.targetAmount.toLocaleString("fr-FR")} €</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Montant recherché</span>
                  <span className="font-medium">{projectData.targetAmount.toLocaleString("fr-FR")} €</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
