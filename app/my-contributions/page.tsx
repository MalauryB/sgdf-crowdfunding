"use client"

import { useState } from "react"
import { SGDFLogo } from "@/components/sgdf-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Heart, Euro, Clock, CheckCircle, AlertCircle, Calendar, MapPin, Users } from "lucide-react"
import Link from "next/link"

export default function MyContributionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  // Données simulées des contributions de l'utilisateur
  const myContributions = [
    {
      id: "1",
      projectId: "proj-1",
      projectTitle: "Camp d'été Scouts - Forêt de Fontainebleau",
      projectImage: "/scout-building-construction.jpg",
      amount: 50,
      contributionDate: "2025-01-10T14:30:00Z",
      status: "confirmed", // confirmed, pending, cancelled
      paymentStatus: "completed", // completed, pending, failed
      projectStatus: "active", // active, completed, cancelled
      projectGoal: 4500,
      projectRaised: 2800,
      projectLocation: "Fontainebleau, Seine-et-Marne",
      projectBranch: "Scouts et Guides",
      projectCreator: "Marie Dupont",
      projectStructure: "Groupe Scout Paris 15e",
    },
    {
      id: "2",
      projectId: "proj-2",
      projectTitle: "Rénovation du local scout",
      projectImage: "/mountain-chalet-renovation-scouts.jpg",
      amount: 100,
      contributionDate: "2025-01-05T09:15:00Z",
      status: "confirmed",
      paymentStatus: "completed",
      projectStatus: "completed",
      projectGoal: 8000,
      projectRaised: 8000,
      projectLocation: "Lyon 3e, Rhône",
      projectBranch: "Groupe",
      projectCreator: "Jean Martin",
      projectStructure: "Groupe Scout Lyon 3e",
    },
    {
      id: "3",
      projectId: "proj-3",
      projectTitle: "Matériel nautique - Base de Carnac",
      projectImage: "/kayak-nautical-equipment-scouts.jpg",
      amount: 75,
      contributionDate: "2025-01-08T16:45:00Z",
      status: "pending",
      paymentStatus: "pending",
      projectStatus: "active",
      projectGoal: 3200,
      projectRaised: 1200,
      projectLocation: "Carnac, Morbihan",
      projectBranch: "Scouts et Guides",
      projectCreator: "Sophie Bernard",
      projectStructure: "Groupe Scout Carnac",
    },
    {
      id: "4",
      projectId: "proj-4",
      projectTitle: "Formation BAFA - Session Automne",
      projectImage: "/africa-school-construction-solidarity.jpg",
      amount: 25,
      contributionDate: "2024-12-20T11:20:00Z",
      status: "confirmed",
      paymentStatus: "completed",
      projectStatus: "active",
      projectGoal: 1500,
      projectRaised: 800,
      projectLocation: "Grenoble, Isère",
      projectBranch: "Pionniers et Caravelles",
      projectCreator: "Pierre Dubois",
      projectStructure: "Territoire Auvergne-Rhône-Alpes",
    },
  ]

  const getStatusBadge = (status: string, paymentStatus: string) => {
    if (status === "confirmed" && paymentStatus === "completed") {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Confirmé
        </Badge>
      )
    }
    if (status === "pending" || paymentStatus === "pending") {
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          <Clock className="w-3 h-3 mr-1" />
          En attente
        </Badge>
      )
    }
    return (
      <Badge variant="secondary" className="bg-red-100 text-red-800">
        <AlertCircle className="w-3 h-3 mr-1" />
        Annulé
      </Badge>
    )
  }

  const getProjectStatusBadge = (projectStatus: string) => {
    switch (projectStatus) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            ✅ Financé
          </Badge>
        )
      case "active":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            🔄 En cours
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            ❌ Annulé
          </Badge>
        )
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filterContributions = (contributions: any[]) => {
    if (!searchQuery) return contributions
    return contributions.filter(
      (contribution) =>
        contribution.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contribution.projectLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contribution.projectStructure.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  const confirmedContributions = myContributions.filter((c) => c.status === "confirmed")
  const pendingContributions = myContributions.filter((c) => c.status === "pending")

  const totalContributed = confirmedContributions.reduce((sum, c) => sum + c.amount, 0)
  const totalPending = pendingContributions.reduce((sum, c) => sum + c.amount, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/">
                <SGDFLogo size="md" />
              </Link>
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/" className="text-foreground hover:text-primary font-medium">
                  Accueil
                </Link>
                <Link href="/projects" className="text-foreground hover:text-primary font-medium">
                  Projets
                </Link>
                <Link href="/my-projects" className="text-foreground hover:text-primary font-medium">
                  Mes projets
                </Link>
                <Link href="/my-contributions" className="text-primary font-medium">
                  Mes contributions
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/favorites">
                  <Heart className="w-4 h-4 mr-2" />
                  Favoris
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4 font-caveat">Mes contributions</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Suivez l'historique de vos dons et promesses de dons aux projets de la communauté SGDF.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <Badge variant="outline" className="text-sm">
              📍 Groupe Scout Lyon 3e - Martin Luther King
            </Badge>
            <Badge variant="secondary" className="text-sm">
              👤 Pierre Dubois - Membre
            </Badge>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total contribué</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{totalContributed} €</div>
              <p className="text-xs text-muted-foreground mt-1">Dons confirmés</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">En attente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{totalPending} €</div>
              <p className="text-xs text-muted-foreground mt-1">Promesses en cours</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Projets soutenus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{myContributions.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Projets différents</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Projets financés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {myContributions.filter((c) => c.projectStatus === "completed").length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Objectifs atteints</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Rechercher dans mes contributions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Euro className="w-4 h-4" />
              Toutes ({filterContributions(myContributions).length})
            </TabsTrigger>
            <TabsTrigger value="confirmed" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Confirmées ({filterContributions(confirmedContributions).length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              En attente ({filterContributions(pendingContributions).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-4">
              {filterContributions(myContributions).map((contribution) => (
                <Card key={contribution.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={contribution.projectImage || "/placeholder.svg"}
                        alt={contribution.projectTitle}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <Link
                              href={`/project/${contribution.projectId}`}
                              className="text-lg font-semibold text-primary hover:underline"
                            >
                              {contribution.projectTitle}
                            </Link>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                <MapPin className="w-3 h-3 mr-1" />
                                {contribution.projectLocation}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                <Users className="w-3 h-3 mr-1" />
                                {contribution.projectStructure}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(contribution.status, contribution.paymentStatus)}
                            {getProjectStatusBadge(contribution.projectStatus)}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Mon don</p>
                            <p className="text-xl font-bold text-primary">{contribution.amount} €</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Date de contribution</p>
                            <p className="text-sm font-medium flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(contribution.contributionDate)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Progression du projet</p>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-muted rounded-full h-2">
                                <div
                                  className="bg-primary h-2 rounded-full transition-all"
                                  style={{
                                    width: `${Math.min((contribution.projectRaised / contribution.projectGoal) * 100, 100)}%`,
                                  }}
                                />
                              </div>
                              <span className="text-xs font-medium">
                                {Math.round((contribution.projectRaised / contribution.projectGoal) * 100)}%
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {contribution.projectRaised} € / {contribution.projectGoal} €
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="confirmed">
            <div className="space-y-4">
              {filterContributions(confirmedContributions).map((contribution) => (
                <Card key={contribution.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={contribution.projectImage || "/placeholder.svg"}
                        alt={contribution.projectTitle}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <Link
                              href={`/project/${contribution.projectId}`}
                              className="text-lg font-semibold text-primary hover:underline"
                            >
                              {contribution.projectTitle}
                            </Link>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                <MapPin className="w-3 h-3 mr-1" />
                                {contribution.projectLocation}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                <Users className="w-3 h-3 mr-1" />
                                {contribution.projectStructure}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(contribution.status, contribution.paymentStatus)}
                            {getProjectStatusBadge(contribution.projectStatus)}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Mon don</p>
                            <p className="text-xl font-bold text-green-600">{contribution.amount} €</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Date de contribution</p>
                            <p className="text-sm font-medium flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(contribution.contributionDate)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Progression du projet</p>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-muted rounded-full h-2">
                                <div
                                  className="bg-primary h-2 rounded-full transition-all"
                                  style={{
                                    width: `${Math.min((contribution.projectRaised / contribution.projectGoal) * 100, 100)}%`,
                                  }}
                                />
                              </div>
                              <span className="text-xs font-medium">
                                {Math.round((contribution.projectRaised / contribution.projectGoal) * 100)}%
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {contribution.projectRaised} € / {contribution.projectGoal} €
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending">
            <div className="space-y-4">
              {filterContributions(pendingContributions).map((contribution) => (
                <Card key={contribution.id} className="hover:shadow-md transition-shadow border-yellow-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={contribution.projectImage || "/placeholder.svg"}
                        alt={contribution.projectTitle}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <Link
                              href={`/project/${contribution.projectId}`}
                              className="text-lg font-semibold text-primary hover:underline"
                            >
                              {contribution.projectTitle}
                            </Link>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                <MapPin className="w-3 h-3 mr-1" />
                                {contribution.projectLocation}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                <Users className="w-3 h-3 mr-1" />
                                {contribution.projectStructure}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(contribution.status, contribution.paymentStatus)}
                            {getProjectStatusBadge(contribution.projectStatus)}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Promesse de don</p>
                            <p className="text-xl font-bold text-yellow-600">{contribution.amount} €</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Date de promesse</p>
                            <p className="text-sm font-medium flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(contribution.contributionDate)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Progression du projet</p>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-muted rounded-full h-2">
                                <div
                                  className="bg-primary h-2 rounded-full transition-all"
                                  style={{
                                    width: `${Math.min((contribution.projectRaised / contribution.projectGoal) * 100, 100)}%`,
                                  }}
                                />
                              </div>
                              <span className="text-xs font-medium">
                                {Math.round((contribution.projectRaised / contribution.projectGoal) * 100)}%
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {contribution.projectRaised} € / {contribution.projectGoal} €
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            <Clock className="w-4 h-4 inline mr-1" />
                            Votre promesse de don est en attente de traitement. Vous recevrez une confirmation par email
                            une fois le virement effectué.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filterContributions(myContributions).length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Heart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {searchQuery ? "Aucune contribution trouvée" : "Aucune contribution pour le moment"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery
                ? "Essayez de modifier votre recherche."
                : "Découvrez les projets de la communauté et faites votre première contribution."}
            </p>
            {!searchQuery && (
              <Button asChild>
                <Link href="/projects">
                  <Heart className="w-4 h-4 mr-2" />
                  Découvrir les projets
                </Link>
              </Button>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <SGDFLogo size="sm" variant="white" className="mb-4" />
              <p className="text-sm opacity-90">
                Mouvement de jeunesse et d'éducation populaire catholique ouvert à tous.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Projets</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>
                  <Link href="/projects" className="hover:opacity-100">
                    Tous les projets
                  </Link>
                </li>
                <li>
                  <Link href="/my-projects" className="hover:opacity-100">
                    Mes projets
                  </Link>
                </li>
                <li>
                  <Link href="/my-contributions" className="hover:opacity-100">
                    Mes contributions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Aide</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>
                  <a href="#" className="hover:opacity-100">
                    Guide d'utilisation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Légal</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>
                  <a href="#" className="hover:opacity-100">
                    Mentions légales
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    RGPD
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    CGU
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-90">
            <p>&copy; 2025 Scouts et Guides de France. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
