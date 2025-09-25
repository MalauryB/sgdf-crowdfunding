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
import { getAssetPath, getImagePath, getProjectImages } from "@/lib/utils"
import { getProjectById, Project } from "@/lib/projects-data"

// Fonction pour obtenir les données par défaut si le projet n'existe pas
const getDefaultProjectData = (): Project => ({
  id: "404",
  title: "Projet non trouvé",
  description: "Le projet demandé n'existe pas ou a été supprimé.",
  longDescription: "<p>Ce projet n'a pas pu être chargé.</p>",
  image: "/placeholder.svg",
  slug: "404",
  category: "Erreur",
  location: "Inconnu",
  targetAmount: 0,
  currentAmount: 0,
  daysLeft: 0,
  supportersCount: 0,
  branch: "Inconnu",
  images: [],
  updates: [],
  documents: [],
  comments: []
})

export default function ProjectDetailClient({ params }: { params: { id: string } }) {
  // Récupérer les données du projet selon l'ID
  const projectData = getProjectById(params.id) || getDefaultProjectData()

  // Si le projet n'existe pas, afficher une erreur
  if (projectData.id === "404") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Projet non trouvé</h1>
          <p className="text-muted-foreground mb-6">Le projet avec l'ID "{params.id}" n'existe pas.</p>
          <Button asChild>
            <a href={getAssetPath("/projects")}>Retour aux projets</a>
          </Button>
        </div>
      </div>
    )
  }

  // Variables calculées
  const goal = projectData.goal || projectData.targetAmount
  const raised = projectData.raised || projectData.currentAmount
  const contributors = projectData.contributors || projectData.supportersCount

  const updates = projectData.updates || []
  const documents = projectData.documents || []
  const comments = projectData.comments || []
  const images = projectData.images || []

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

  const progress = Math.round((raised / goal) * 100)
  const displayedComments = showAllComments
    ? comments
    : comments.slice(0, 2)

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
                <a href={getAssetPath("/")} className="text-foreground hover:text-primary font-medium">
                  Accueil
                </a>
                <a href={getAssetPath("/projects")} className="text-foreground hover:text-primary font-medium">
                  Projets
                </a>
                <a href={getAssetPath("/my-projects")} className="text-foreground hover:text-primary font-medium">
                  Mes projets
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <a href={getAssetPath("/create-project")}>Créer un projet</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <a href={getAssetPath("/")} className="hover:text-primary">
            Accueil
          </a>
          <span>/</span>
          <a href={getAssetPath("/projects")} className="hover:text-primary">
            Projets
          </a>
          <span>/</span>
          <span className="text-gray-900">{projectData.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Project Gallery */}
            <div className="bg-white rounded-lg shadow-sm mb-8 overflow-hidden">
              {images.length > 0 ? (
                <>
                  <div className="relative h-96">
                    <img
                      src={getImagePath(images[currentImageIndex])}
                      alt={projectData.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex space-x-2 overflow-x-auto">
                      {images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                            currentImageIndex === index ? "border-primary" : "border-gray-200"
                          }`}
                        >
                          <img src={getImagePath(image)} alt={`Aperçu ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-96 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">Aucune image disponible</p>
                </div>
              )}
            </div>

            {/* Project Details */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{projectData.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{projectData.location}</span>
                    </div>
                    <Badge variant="secondary">{projectData.category}</Badge>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={isFavorite ? "text-red-600 border-red-600" : ""}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                    {isFavorite ? "Retiré" : "Favori"}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Partager
                  </Button>
                </div>
              </div>

              <p className="text-gray-600 text-lg mb-8">{projectData.description}</p>

              {/* Project Details Tabs */}
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="updates">
                    Actualités ({updates.length})
                  </TabsTrigger>
                  <TabsTrigger value="documents">
                    Documents ({documents.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-6">
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: projectData.longDescription || projectData.description }}
                  />
                </TabsContent>

                <TabsContent value="updates" className="mt-6">
                  <div className="space-y-4">
                    {updates.length > 0 ? updates.map((update) => (
                      <Card key={update.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <Avatar>
                              <AvatarImage src={getImagePath(update.avatar)} />
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
                    )) : (
                      <p className="text-center text-gray-500 py-8">Aucune actualité pour le moment</p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {documents.length > 0 ? documents.map((doc, index) => (
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
                        )) : (
                          <p className="text-center text-gray-500 py-8">Aucun document disponible</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Commentaires ({comments.length})
              </h3>

              {/* Add Comment Form */}
              <Card className="mb-6">
                <CardContent className="p-4">
                  <Textarea
                    placeholder="Ajoutez votre commentaire..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mb-3"
                    rows={3}
                  />
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      <Lock className="w-4 h-4 inline mr-1" />
                      Commentaire public
                    </div>
                    <Button onClick={handleCommentSubmit} disabled={!newComment.trim()}>
                      <Send className="w-4 h-4 mr-2" />
                      Publier
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.length > 0 ? displayedComments.map((comment) => (
                  <div key={comment.id} className="border-l-2 border-gray-100 pl-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={getImagePath(comment.avatar)} />
                        <AvatarFallback>{comment.author.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm">{comment.author}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(comment.date).toLocaleDateString("fr-FR")}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm mb-2">{comment.content}</p>
                        <div className="flex space-x-3 text-xs">
                          <button
                            onClick={() => setReplyingTo(comment.id)}
                            className="text-primary hover:underline flex items-center"
                          >
                            <Reply className="w-3 h-3 mr-1" />
                            Répondre
                          </button>
                        </div>

                        {/* Reply Form */}
                        {replyingTo === comment.id && (
                          <div className="mt-3 bg-gray-50 rounded-lg p-3">
                            <Textarea
                              placeholder="Votre réponse..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              rows={2}
                              className="mb-2"
                            />
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                                Annuler
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleReplySubmit(comment.id)}
                                disabled={!replyText.trim()}
                              >
                                Répondre
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* Replies */}
                        {comment.replies && comment.replies.map((reply) => (
                          <div key={reply.id} className="mt-4 ml-6 border-l border-gray-100 pl-3">
                            <div className="flex items-start space-x-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={getImagePath(reply.avatar)} />
                                <AvatarFallback className="text-xs">
                                  {reply.author.split(" ").map((n) => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-medium text-xs">{reply.author}</span>
                                  <span className="text-xs text-gray-500">
                                    {new Date(reply.date).toLocaleDateString("fr-FR")}
                                  </span>
                                </div>
                                <p className="text-gray-700 text-xs">{reply.content}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )) : (
                  <p className="text-center text-gray-500 py-8">Aucun commentaire pour le moment. Soyez le premier à commenter !</p>
                )}

                {comments.length > 2 && !showAllComments && (
                  <Button
                    variant="outline"
                    onClick={() => setShowAllComments(true)}
                    className="w-full"
                  >
                    Voir tous les commentaires ({comments.length})
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Funding Progress */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {raised.toLocaleString("fr-FR")} €
                </div>
                <div className="text-gray-600 mb-4">sur {goal.toLocaleString("fr-FR")} € collectés</div>
                <Progress value={progress} className="mb-4" />
                <div className="flex justify-between text-sm text-gray-600 mb-6">
                  <span>{progress}% financé</span>
                  <span>{projectData.daysLeft} jours restants</span>
                </div>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {contributors} contributeurs
                  </div>
                </div>
              </div>

              {/* Donation Form */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full mb-4" size="lg">
                    <Heart className="w-4 h-4 mr-2" />
                    Soutenir ce projet
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Soutenir le projet</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="amount">Montant du don</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="50"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="name">Nom</Label>
                      <Input
                        id="name"
                        placeholder="Votre nom"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message (optionnel)</Label>
                      <Textarea
                        id="message"
                        placeholder="Votre message de soutien..."
                        value={donorMessage}
                        onChange={(e) => setDonorMessage(e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="anonymous"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                      />
                      <Label htmlFor="anonymous" className="text-sm">
                        Don anonyme
                      </Label>
                    </div>
                    <Button onClick={handleDonation} className="w-full">
                      <Euro className="w-4 h-4 mr-2" />
                      Confirmer le don
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Paiement sécurisé • Reçu fiscal automatique
                </p>
              </div>
            </div>

            {/* Project Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4">Informations du projet</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Organisateur</span>
                  <span className="font-medium">{projectData.organizer || "Non spécifié"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Branche</span>
                  <Badge variant="outline" className="text-xs">
                    {projectData.branch}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date de création</span>
                  <span className="font-medium">
                    {projectData.dateCreated ? new Date(projectData.dateCreated).toLocaleDateString("fr-FR") : "Non spécifiée"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Visibilité</span>
                  <div className="flex items-center">
                    {projectData.isPublic ? (
                      <Unlock className="w-3 h-3 mr-1" />
                    ) : (
                      <Lock className="w-3 h-3 mr-1" />
                    )}
                    <span className="font-medium">
                      {projectData.isPublic ? "Public" : "Privé"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}