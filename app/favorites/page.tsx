"use client"

import { useState } from "react"
import { getAssetPath, getImagePath, getProjectMainImage } from "@/lib/utils"
import { SGDFLogo } from "@/components/sgdf-logo"
import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Heart, Users, X, Settings, LogOut, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function FavoritesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [userStructure] = useState("5e Dinan Martin Luther King") // Simulated user structure
  const [showRemoveConfirm, setShowRemoveConfirm] = useState<string | null>(null)

  const currentUser = {
    firstName: "Marie",
    lastName: "Dupont",
    email: "marie.dupont@sgdf.fr",
    avatar: getImagePath("/abstract-profile.png"),
    structure: "Groupe Saint-Michel - Paris 15e",
  }

  const favoriteProjects = [
    {
      id: "1",
      title: "Rénovation du local scout de Toulouse",
      description: "Nos Pionniers-Caravelles rénovent entièrement notre local : peinture, électricité et aménagement d'une salle d'activités.",
      image: getImagePath(getProjectMainImage("renovation-local-toulouse")),
      slug: "renovation-local-toulouse",
      raised: 2800,
      goal: 4500,
      contributors: 23,
      daysLeft: 45,
      category: "Activité",
      branch: "Scouts et Guides",
      territory: "Île-de-France",
      favoriteBy: "Marie Dupont",
      favoriteDate: "2025-01-15",
      favoriteByStructure: "5e Dinan Martin Luther King",
      canRemove: true, // User can remove their own favorites
    },
    {
      id: "2",
      title: "Achat d'un minibus pour le groupe",
      description: "Acquisition d'un véhicule 9 places pour faciliter les déplacements lors des sorties et week-ends scouts en région parisienne.",
      image: getImagePath(getProjectMainImage("minibus-groupe")),
      slug: "minibus-groupe",
      raised: 3200,
      goal: 5000,
      contributors: 45,
      daysLeft: 22,
      category: "Solidarité",
      branch: "Compagnons",
      territory: "Nouvelle-Aquitaine",
      favoriteBy: "Pierre Martin",
      favoriteDate: "2025-01-12",
      favoriteByStructure: "5e Dinan Martin Luther King",
      canRemove: false, // Another user's favorite
    },
    {
      id: "3",
      title: "Matériel de camping pour la troupe",
      description: "Renouvellement des tentes, réchauds et matériel de cuisine pour les camps scouts en Bretagne.",
      image: getImagePath(getProjectMainImage("materiel-camping-troupe")),
      slug: "materiel-camping-troupe",
      raised: 800,
      goal: 1500,
      contributors: 12,
      daysLeft: 28,
      category: "Formation",
      branch: "Pionniers et Caravelles",
      territory: "Auvergne-Rhône-Alpes",
      favoriteBy: "Sophie Leroy",
      favoriteDate: "2025-01-10",
      favoriteByStructure: "5e Dinan Martin Luther King",
      canRemove: false,
    },
    {
      id: "4",
      title: "Équipement nautique pour les marins",
      description: "Achat de kayaks et matériel de sécurité pour les activités nautiques de notre groupe marin bordelais.",
      image: getImagePath(getProjectMainImage("materiel-nautique-carnac")),
      slug: "materiel-nautique-carnac",
      raised: 1200,
      goal: 3200,
      contributors: 8,
      daysLeft: 62,
      category: "Investissement",
      branch: "Scouts et Guides",
      territory: "Bretagne",
      favoriteBy: "Thomas Moreau",
      favoriteDate: "2025-01-08",
      favoriteByStructure: "5e Dinan Martin Luther King",
      canRemove: false,
    },
  ]

  const handleRemoveFavorite = (projectId: string) => {
    console.log(`[v0] Removing favorite for project ${projectId}`)
    setShowRemoveConfirm(null)
    // In real app, this would call an API to remove the favorite
  }

  const filteredProjects = favoriteProjects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.territory.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <SGDFLogo size="md" />
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
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-3 px-3 py-2 h-auto">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={currentUser.avatar || getImagePath("/placeholder.svg")}
                        alt={`${currentUser.firstName} ${currentUser.lastName}`}
                      />
                      <AvatarFallback className="text-xs">
                        {currentUser.firstName[0]}
                        {currentUser.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left hidden sm:block">
                      <div className="text-sm font-medium">
                        {currentUser.firstName} {currentUser.lastName}
                      </div>
                    </div>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage
                          src={currentUser.avatar || getImagePath("/placeholder.svg")}
                          alt={`${currentUser.firstName} ${currentUser.lastName}`}
                        />
                        <AvatarFallback>
                          {currentUser.firstName[0]}
                          {currentUser.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">
                          {currentUser.firstName} {currentUser.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground font-normal">{currentUser.structure}</div>
                      </div>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <a href={getAssetPath("/account")}>
                          <Settings className="w-4 h-4 mr-3" />
                          Mon compte
                        </a>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                        <LogOut className="w-4 h-4 mr-3" />
                        Se déconnecter
                      </Button>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="text-sm text-muted-foreground">
                        <div className="mb-1">Email: {currentUser.email}</div>
                        <div>Structure: {currentUser.structure}</div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-red-500" />
            <h1 className="text-4xl font-bold text-primary font-caveat">Projets favoris</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Découvrez les projets mis en favoris par les membres de votre structure. Ces projets ont retenu l'attention
            de votre équipe !
          </p>
        </div>


        {/* Search */}
        <div className="mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Rechercher dans les favoris..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Projets favoris</p>
                <p className="text-2xl font-bold text-primary">{favoriteProjects.length}</p>
              </div>
              <Heart className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Membres actifs</p>
                <p className="text-2xl font-bold text-primary">
                  {new Set(favoriteProjects.map((p) => p.favoriteBy)).size}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Montant total</p>
                <p className="text-2xl font-bold text-primary">
                  {favoriteProjects.reduce((sum, project) => sum + project.goal, 0).toLocaleString()} €
                </p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">€</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Contributeurs</p>
                <p className="text-2xl font-bold text-primary">
                  {favoriteProjects.reduce((sum, project) => sum + project.contributors, 0)}
                </p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">👥</span>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
              <Heart className="w-12 h-12 text-red-300" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Aucun projet favori</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {searchQuery
                ? "Aucun projet favori ne correspond à votre recherche."
                : `Votre structure "${userStructure}" n'a pas encore de projets favoris. Parcourez les projets et ajoutez-en à vos favoris !`}
            </p>
            <Button asChild>
              <a href={getAssetPath("/projects")}>Découvrir les projets</a>
            </Button>
          </div>
        )}

        {showRemoveConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-2">Retirer des favoris</h3>
              <p className="text-muted-foreground mb-4">
                Êtes-vous sûr de vouloir retirer ce projet de vos favoris ? Cette action est irréversible.
              </p>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowRemoveConfirm(null)}>
                  Annuler
                </Button>
                <Button variant="destructive" onClick={() => handleRemoveFavorite(showRemoveConfirm)}>
                  Retirer
                </Button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <SGDFLogo size="sm" className="mb-4" />
              <p className="text-sm opacity-90">
                Mouvement de jeunesse et d'éducation populaire catholique ouvert à tous.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Projets</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>
                  <a href={getAssetPath("/projects")} className="hover:opacity-100">
                    Tous les projets
                  </a>
                </li>
                <li>
                  <a href={getAssetPath("/my-projects")} className="hover:opacity-100">
                    Mes projets
                  </a>
                </li>
                <li>
                  <a href={getAssetPath("/favorites")} className="hover:opacity-100">
                    Favoris
                  </a>
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
