"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, Clock, AlertTriangle, FileText, Euro, Calendar, MapPin, Users } from "lucide-react"
import Link from "next/link"

const mockProjectsToValidate = [
  {
    id: 1,
    title: "Camp d'été en Ardèche - Groupe Saint-Michel",
    description: "Organisation d'un camp de 15 jours pour 24 jeunes scouts et guides dans les gorges de l'Ardèche.",
    structure: "Groupe Saint-Michel - Paris 15e",
    territory: "Île-de-France",
    type: "Activité",
    budgetTotal: 8500,
    montantRecherche: 3000,
    dateEcheance: "2025-06-15",
    dateCreation: "2025-01-10",
    status: "PENDING_VALIDATION",
    validationLevel: "territorial", // territorial, national, fhp
    branch: "scouts-guides",
    categories: ["Vie dans la nature", "Fraternité"],
    documents: [
      { name: "Budget détaillé", type: "budget", uploaded: true },
      { name: "Validation Conseil de Groupe", type: "validation", uploaded: true },
      { name: "Autorisation parentale type", type: "other", uploaded: true },
    ],
    creator: "Marie Dubois",
    lastModified: "2025-01-15",
  },
  {
    id: 2,
    title: "Construction d'un local scout - Groupe Baden-Powell",
    description: "Construction d'un nouveau local pour accueillir les activités du groupe et stocker le matériel.",
    structure: "Groupe Baden-Powell - Lyon 3e",
    territory: "Rhône-Alpes",
    type: "Investissement",
    budgetTotal: 45000,
    montantRecherche: 25000,
    dateEcheance: "2025-12-31",
    dateCreation: "2025-01-08",
    status: "PENDING_VALIDATION",
    validationLevel: "fhp", // Projet lourd > 5000€ investissement
    branch: "general",
    categories: ["Construire la fraternité", "Habiter autrement la planète"],
    documents: [
      { name: "Budget détaillé", type: "budget", uploaded: true },
      { name: "Validation Conseil de Groupe", type: "validation", uploaded: true },
      { name: "Devis travaux", type: "other", uploaded: true },
      { name: "Plan du local", type: "other", uploaded: true },
    ],
    creator: "Pierre Martin",
    lastModified: "2025-01-12",
  },
  {
    id: 3,
    title: "Formation BAFA - Territoire Normandie",
    description: "Organisation d'une session de formation BAFA pour 20 jeunes du territoire.",
    structure: "Équipe Territoriale Normandie",
    territory: "Normandie",
    type: "Activité",
    budgetTotal: 6500,
    montantRecherche: 2500,
    dateEcheance: "2025-07-20",
    dateCreation: "2025-01-12",
    status: "PENDING_VALIDATION",
    validationLevel: "territorial",
    branch: "general",
    categories: ["Grandir en humanité", "Construire la fraternité"],
    documents: [
      { name: "Budget détaillé", type: "budget", uploaded: true },
      { name: "Validation Conseil Territorial", type: "validation", uploaded: true },
    ],
    creator: "Sophie Leroy",
    lastModified: "2025-01-14",
  },
]

const mockUserRole = "territorial" // local, territorial, national, fhp

export default function ValidationPage() {
  const [projects, setProjects] = useState(mockProjectsToValidate)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [validationComment, setValidationComment] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const [userRole] = useState(mockUserRole)

  const filteredProjects = projects.filter((project) => {
    if (userRole === "fhp") return true // FHP peut valider tous les projets
    if (userRole === "national")
      return project.validationLevel === "national" || project.validationLevel === "territorial"
    if (userRole === "territorial") return project.validationLevel === "territorial"
    return false
  })

  const handleValidation = async (projectId: number, action: "validate" | "refuse") => {
    setIsValidating(true)

    // Simulation d'une requête API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              status: action === "validate" ? "VALIDATED" : "REFUSED",
              validationComment,
              validatedBy: "Utilisateur actuel",
              validatedAt: new Date().toISOString(),
              ...(action === "refuse" && {
                returnedToDraft: true,
                refusalReason: validationComment,
              }),
            }
          : project,
      ),
    )

    setValidationComment("")
    setSelectedProject(null)
    setIsValidating(false)

    if (action === "validate") {
      alert("Projet validé avec succès ! Il sera maintenant visible sur la plateforme.")
    } else {
      alert("Projet refusé. Il retourne en état brouillon pour corrections.")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING_VALIDATION":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            <Clock className="w-3 h-3 mr-1" />
            En attente
          </Badge>
        )
      case "VALIDATED":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Validé
          </Badge>
        )
      case "REFUSED":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Refusé
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getValidationLevelBadge = (level: string) => {
    switch (level) {
      case "territorial":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Territorial
          </Badge>
        )
      case "national":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            National
          </Badge>
        )
      case "fhp":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Commission FHP
          </Badge>
        )
      default:
        return <Badge variant="outline">{level}</Badge>
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "territorial":
        return "Responsable Territorial"
      case "national":
        return "Équipe Nationale"
      case "fhp":
        return "Commission FHP"
      default:
        return "Utilisateur"
    }
  }

  const pendingProjects = filteredProjects.filter((p) => p.status === "PENDING_VALIDATION")
  const processedProjects = filteredProjects.filter((p) => p.status !== "PENDING_VALIDATION")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-sgdf-blue mb-2" style={{ fontFamily: "var(--font-caveat)" }}>
                Projets à valider
              </h1>
              <p className="text-gray-600">
                Connecté en tant que : <span className="font-semibold text-sgdf-blue">{getRoleLabel(userRole)}</span>
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-sgdf-blue">{pendingProjects.length}</div>
              <div className="text-sm text-gray-600">projets en attente</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              En attente ({pendingProjects.length})
            </TabsTrigger>
            <TabsTrigger value="processed" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Traités ({processedProjects.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            {pendingProjects.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun projet en attente</h3>
                  <p className="text-gray-600">Tous les projets de votre niveau ont été traités.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {pendingProjects.map((project) => (
                  <Card key={project.id} className="border-l-4 border-l-orange-400">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl text-sgdf-blue mb-2">{project.title}</CardTitle>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {getStatusBadge(project.status)}
                            {getValidationLevelBadge(project.validationLevel)}
                            <Badge
                              variant="outline"
                              className={
                                project.type === "Investissement"
                                  ? "bg-purple-50 text-purple-700 border-purple-200"
                                  : "bg-green-50 text-green-700 border-green-200"
                              }
                            >
                              {project.type}
                            </Badge>
                            {project.budgetTotal > 5000 && (
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Projet lourd
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{project.description}</p>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            {project.structure}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="w-4 h-4" />
                            Créé par {project.creator}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            Échéance : {new Date(project.dateEcheance).toLocaleDateString("fr-FR")}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Euro className="w-4 h-4" />
                            Budget total : {project.budgetTotal.toLocaleString("fr-FR")} €
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Euro className="w-4 h-4" />
                            Montant recherché : {project.montantRecherche.toLocaleString("fr-FR")} €
                          </div>
                          <div className="text-sm text-gray-600">
                            Modifié le {new Date(project.lastModified).toLocaleDateString("fr-FR")}
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Documents attachés</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.documents.map((doc, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-50">
                              <FileText className="w-3 h-3 mr-1" />
                              {doc.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4 border-t">
                        <Link href={`/project/${project.id}`}>
                          <Button variant="outline" size="sm">
                            Voir le détail
                          </Button>
                        </Link>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => setSelectedProject(project)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Valider
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Valider le projet</DialogTitle>
                              <DialogDescription>
                                Vous êtes sur le point de valider le projet "{project.title}".
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="validation-comment">Commentaire de validation (optionnel)</Label>
                                <Textarea
                                  id="validation-comment"
                                  placeholder="Ajoutez un commentaire sur votre décision..."
                                  value={validationComment}
                                  onChange={(e) => setValidationComment(e.target.value)}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setSelectedProject(null)}>
                                Annuler
                              </Button>
                              <Button
                                onClick={() => handleValidation(project.id, "validate")}
                                disabled={isValidating}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                {isValidating ? "Validation..." : "Confirmer la validation"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-200 text-red-700 hover:bg-red-50 bg-transparent"
                              onClick={() => setSelectedProject(project)}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Refuser
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Refuser le projet</DialogTitle>
                              <DialogDescription>
                                Vous êtes sur le point de refuser le projet "{project.title}". Le projet retournera en
                                état brouillon pour permettre les corrections.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="refusal-comment">Motif du refus (obligatoire) *</Label>
                                <Textarea
                                  id="refusal-comment"
                                  placeholder="Expliquez précisément les raisons du refus et les corrections attendues..."
                                  value={validationComment}
                                  onChange={(e) => setValidationComment(e.target.value)}
                                  required
                                  className="min-h-[100px]"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                  Ce commentaire sera visible par le créateur du projet pour l'aider dans ses
                                  corrections.
                                </p>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setSelectedProject(null)}>
                                Annuler
                              </Button>
                              <Button
                                onClick={() => handleValidation(project.id, "refuse")}
                                disabled={isValidating || !validationComment.trim()}
                                variant="destructive"
                              >
                                {isValidating ? "Refus..." : "Confirmer le refus"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="processed">
            {processedProjects.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun projet traité</h3>
                  <p className="text-gray-600">Les projets validés ou refusés apparaîtront ici.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {processedProjects.map((project) => (
                  <Card
                    key={project.id}
                    className={`border-l-4 ${
                      project.status === "VALIDATED" ? "border-l-green-400" : "border-l-red-400"
                    }`}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {getStatusBadge(project.status)}
                            <Badge variant="outline">{project.type}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{project.structure}</p>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <div>Modifié le {new Date(project.lastModified).toLocaleDateString("fr-FR")}</div>
                          <div>par {project.creator}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
