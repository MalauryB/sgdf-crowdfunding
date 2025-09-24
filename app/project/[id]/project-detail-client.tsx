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
      <li>Ateliers manuels : construction de cabanes, land art avec éléments naturels</li>
      <li>Veillées autour du feu avec contes et chants scouts</li>
      <li>Initiation à l'escalade sur site adapté avec moniteurs brevetés</li>
      <li>Visite de la Mer de Glace et découverte des glaciers</li>
    </ul>

    <h3>Objectifs pédagogiques</h3>
    <ul>
      <li>Développer l'autonomie et la confiance en soi</li>
      <li>Sensibiliser à la protection de l'environnement montagnard</li>
      <li>Favoriser la vie en communauté et l'entraide</li>
      <li>Découvrir un nouveau territoire et ses spécificités</li>
    </ul>
  `,
  goal: 8500,
  raised: 5200,
  daysLeft: 45,
  contributors: 87,
  images: [
    "/api/placeholder/800/400",
    "/api/placeholder/800/400",
    "/api/placeholder/800/400",
  ],
  location: "Chamonix, Haute-Savoie",
  category: "Activité",
  organizer: "Groupe Saint-Michel - Paris 15e",
  dateCreated: "2024-12-15",
  isPublic: true,
  updates: [
    {
      id: 1,
      date: "2024-12-20",
      title: "Réservation du centre d'hébergement confirmée",
      content:
        "Bonne nouvelle ! Nous avons confirmé la réservation de notre centre d'hébergement à Chamonix. Les 24 jeunes seront logés dans des chambres de 4 avec sanitaires complets.",
      author: "Marie Dubois",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 2,
      date: "2024-12-18",
      title: "Planning des activités finalisé",
      content:
        "Le planning détaillé du camp est maintenant prêt ! Nous avons prévu un bel équilibre entre activités sportives, découvertes culturelles et temps de vie de camp.",
      author: "Pierre Martin",
      avatar: "/api/placeholder/40/40",
    },
  ],
  documents: [
    { name: "Budget détaillé", type: "pdf", size: "245 Ko" },
    { name: "Programme complet", type: "pdf", size: "182 Ko" },
    { name: "Autorisation sortie territoire", type: "pdf", size: "95 Ko" },
  ],
  comments: [
    {
      id: 1,
      author: "Sophie Leroy",
      avatar: "/api/placeholder/40/40",
      date: "2024-12-19",
      content:
        "Magnifique projet ! Mes enfants ont participé au camp l'année dernière et ils en gardent un souvenir inoubliable. Je soutiens à 100% !",
      replies: [
        {
          id: 11,
          author: "Marie Dubois",
          avatar: "/api/placeholder/40/40",
          date: "2024-12-19",
          content:
            "Merci Sophie ! C'est grâce au soutien de parents comme vous que nos jeunes peuvent vivre ces belles aventures.",
        },
      ],
    },
    {
      id: 2,
      author: "Thomas Bernard",
      avatar: "/api/placeholder/40/40",
      date: "2024-12-18",
      content:
        "En tant qu'ancien scout, je trouve formidable de voir que l'esprit du scoutisme perdure. Bravo pour cette initiative !",
    },
    {
      id: 3,
      author: "Claire Moreau",
      avatar: "/api/placeholder/40/40",
      date: "2024-12-17",
      content:
        "Le programme semble très riche ! Avez-vous prévu des activités en cas de mauvais temps ?",
      replies: [
        {
          id: 31,
          author: "Pierre Martin",
          avatar: "/api/placeholder/40/40",
          date: "2024-12-17",
          content:
            "Excellente question Claire ! Nous avons effectivement prévu des activités en intérieur : ateliers créatifs, jeux coopératifs, et même une chasse au trésor dans le centre d'hébergement.",
        },
      ],
    },
  ],
}

export default function ProjectDetailClient({ params }: { params: { id: string } }) {
  const [donationAmount, setDonationAmount] = useState("")
  const [donorName, setDonorName] = useState("")
  const [donorEmail, setDonorEmail] = useState("")
  const [donorMessage, setDonorMessage] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showAllComments, setShowAllComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")

  const progress = Math.round((projectData.raised / projectData.goal) * 100)
  const displayedComments = showAllComments
    ? projectData.comments
    : projectData.comments.slice(0, 2)

  const handleDonation = () => {
    console.log("Donation submitted:", {
      amount: donationAmount,
      name: donorName,
      email: donorEmail,
      message: donorMessage,
      anonymous: isAnonymous,
    })
    // Redirect to payment or confirmation
  }

  const handleCommentSubmit = () => {
    console.log("Comment submitted:", newComment)
    setNewComment("")
  }

  const handleReplySubmit = (commentId: number) => {
    console.log("Reply submitted:", { commentId, reply: replyText })
    setReplyingTo(null)
    setReplyText("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <SGDFLogo size="sm" className="h-8" />
              <nav className="hidden md:flex items-center space-x-6">
                <a href="/" className="text-foreground hover:text-primary font-medium">
                  Accueil
                </a>
                <a href="/projects" className="text-foreground hover:text-primary font-medium">
                  Projets
                </a>
                <a href="/my-projects" className="text-foreground hover:text-primary font-medium">
                  Mes projets
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <a href="/create-project">Créer un projet</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <a href="/" className="hover:text-primary">
            Accueil
          </a>
          <span>/</span>
          <a href="/projects" className="hover:text-primary">
            Projets
          </a>
          <span>/</span>
          <span className="text-gray-900">{projectData.title}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Project Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Back Button */}
            <Button variant="outline" size="sm" asChild className="w-fit">
              <a href="/projects">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux projets
              </a>
            </Button>

            {/* Project Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge>{projectData.category}</Badge>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {projectData.location}
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{projectData.title}</h1>
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">{projectData.organizer}</p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={isFavorite ? "bg-red-50 border-red-200 text-red-600" : ""}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                    {isFavorite ? "Favori" : "Favoris"}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Partager
                  </Button>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={projectData.images[currentImageIndex]}
                  alt={`Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {projectData.images.length > 1 && (
                <div className="flex space-x-2">
                  {projectData.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-1 aspect-video bg-gray-200 rounded-lg overflow-hidden border-2 ${
                        currentImageIndex === index ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <img src={image} alt={`Aperçu ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tabs Content */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="updates">Actualités</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="comments">Commentaires</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: projectData.longDescription }}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="updates" className="mt-6">
                <div className="space-y-4">
                  {projectData.updates.map((update) => (
                    <Card key={update.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarImage src={update.avatar} />
                            <AvatarFallback>{update.author.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium">{update.title}</h4>
                              <span className="text-sm text-gray-500">
                                {new Date(update.date).toLocaleDateString("fr-FR")}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-2">{update.content}</p>
                            <p className="text-sm text-gray-500">Par {update.author}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="documents" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {projectData.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-8 h-8 text-red-600" />
                            <div>
                              <h4 className="font-medium">{doc.name}</h4>
                              <p className="text-sm text-gray-500">{doc.type.toUpperCase()} • {doc.size}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Télécharger
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comments" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* Comment Form */}
                      <div>
                        <Label htmlFor="comment" className="text-base font-medium">
                          Laisser un commentaire
                        </Label>
                        <Textarea
                          id="comment"
                          placeholder="Partagez vos encouragements ou vos questions..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="mt-2"
                          rows={4}
                        />
                        <Button onClick={handleCommentSubmit} className="mt-3">
                          <Send className="w-4 h-4 mr-2" />
                          Publier le commentaire
                        </Button>
                      </div>

                      {/* Comments List */}
                      <div className="space-y-6">
                        {displayedComments.map((comment) => (
                          <div key={comment.id} className="border-t pt-6">
                            <div className="flex items-start space-x-4">
                              <Avatar>
                                <AvatarImage src={comment.avatar} />
                                <AvatarFallback>
                                  {comment.author.split(" ").map((n) => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h4 className="font-medium">{comment.author}</h4>
                                  <span className="text-sm text-gray-500">
                                    {new Date(comment.date).toLocaleDateString("fr-FR")}
                                  </span>
                                </div>
                                <p className="text-gray-700 mb-3">{comment.content}</p>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setReplyingTo(comment.id)}
                                  className="text-primary hover:text-primary/80"
                                >
                                  <Reply className="w-4 h-4 mr-2" />
                                  Répondre
                                </Button>

                                {/* Reply Form */}
                                {replyingTo === comment.id && (
                                  <div className="mt-4 ml-4 border-l-2 border-gray-200 pl-4">
                                    <Textarea
                                      placeholder="Votre réponse..."
                                      value={replyText}
                                      onChange={(e) => setReplyText(e.target.value)}
                                      className="mb-3"
                                      rows={3}
                                    />
                                    <div className="flex space-x-2">
                                      <Button size="sm" onClick={() => handleReplySubmit(comment.id)}>
                                        <Send className="w-4 h-4 mr-2" />
                                        Répondre
                                      </Button>
                                      <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                                        Annuler
                                      </Button>
                                    </div>
                                  </div>
                                )}

                                {/* Replies */}
                                {comment.replies && comment.replies.length > 0 && (
                                  <div className="mt-4 ml-4 border-l-2 border-gray-200 pl-4 space-y-4">
                                    {comment.replies.map((reply) => (
                                      <div key={reply.id} className="flex items-start space-x-3">
                                        <Avatar className="w-8 h-8">
                                          <AvatarImage src={reply.avatar} />
                                          <AvatarFallback>
                                            {reply.author.split(" ").map((n) => n[0]).join("")}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                          <div className="flex items-center space-x-2 mb-1">
                                            <h5 className="font-medium text-sm">{reply.author}</h5>
                                            <span className="text-xs text-gray-500">
                                              {new Date(reply.date).toLocaleDateString("fr-FR")}
                                            </span>
                                          </div>
                                          <p className="text-sm text-gray-700">{reply.content}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Show More Comments Button */}
                        {projectData.comments.length > 2 && (
                          <div className="text-center">
                            <Button
                              variant="outline"
                              onClick={() => setShowAllComments(!showAllComments)}
                            >
                              {showAllComments
                                ? "Voir moins de commentaires"
                                : `Voir tous les commentaires (${projectData.comments.length})`}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Donation Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-primary mb-1">
                      {projectData.raised.toLocaleString("fr-FR")} €
                    </div>
                    <div className="text-gray-600 mb-4">collectés sur {projectData.goal.toLocaleString("fr-FR")} €</div>
                    <Progress value={progress} className="h-3 mb-4" />
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">{progress}%</div>
                        <div className="text-sm text-gray-600">de l'objectif</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{projectData.contributors}</div>
                        <div className="text-sm text-gray-600">contributeurs</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{projectData.daysLeft}</div>
                        <div className="text-sm text-gray-600">jours restants</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="amount">Montant du don (€)</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        placeholder="Montant en euros"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {[20, 50, 100].map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          size="sm"
                          onClick={() => setDonationAmount(amount.toString())}
                          className="text-sm"
                        >
                          {amount} €
                        </Button>
                      ))}
                    </div>

                    <div>
                      <Label htmlFor="donor-name">Nom (optionnel)</Label>
                      <Input
                        id="donor-name"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="Votre nom"
                        disabled={isAnonymous}
                      />
                    </div>

                    <div>
                      <Label htmlFor="donor-email">Email</Label>
                      <Input
                        id="donor-email"
                        type="email"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="anonymous"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="anonymous" className="text-sm">
                        Don anonyme
                      </Label>
                    </div>

                    <div>
                      <Label htmlFor="donor-message">Message de soutien (optionnel)</Label>
                      <Textarea
                        id="donor-message"
                        value={donorMessage}
                        onChange={(e) => setDonorMessage(e.target.value)}
                        placeholder="Un mot d'encouragement..."
                        rows={3}
                      />
                    </div>

                    <Button
                      onClick={handleDonation}
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={!donationAmount || !donorEmail}
                    >
                      <Euro className="w-4 h-4 mr-2" />
                      Faire un don de {donationAmount || "..."} €
                    </Button>

                    <div className="text-center text-xs text-gray-500">
                      <Lock className="w-4 h-4 mx-auto mb-1" />
                      Paiement 100% sécurisé
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project Info */}
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Informations sur le projet</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Catégorie</span>
                      <Badge variant="outline">{projectData.category}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Créé le</span>
                      <span>{new Date(projectData.dateCreated).toLocaleDateString("fr-FR")}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Visibilité</span>
                      <span className="flex items-center">
                        {projectData.isPublic ? (
                          <>
                            <Unlock className="w-4 h-4 mr-1 text-green-600" />
                            Public
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 mr-1 text-red-600" />
                            Privé
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}