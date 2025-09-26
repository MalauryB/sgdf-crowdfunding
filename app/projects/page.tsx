"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { getAssetPath, getImagePath, getProjectMainImage } from "@/lib/utils"
import { SGDFLogo } from "@/components/sgdf-logo"
import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Search,
  Filter,
  SlidersHorizontal,
  MapPin,
  Calendar,
  TrendingUp,
  Clock,
  Euro,
  X,
  Plus,
  Heart,
} from "lucide-react"

const allProjects = [
  {
    id: "1",
    title: "Camp d'été Louveteaux-Jeannettes en Ardèche",
    description:
      "Financement du camp d'été de notre meute et compagnie pour 8 jours dans les gorges de l'Ardèche avec canoë et grands jeux nature.",
    image: getImagePath(getProjectMainImage("camp-ete-ardeche")),
    slug: "camp-ete-ardeche",
    category: "Activité",
    location: "Vallon-Pont-d'Arc, Ardèche",
    targetAmount: 4500,
    currentAmount: 3200,
    daysLeft: 35,
    supportersCount: 18,
    branch: "louveteaux" as const,
    territory: "Auvergne-Rhône-Alpes",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Rénovation du local scout de Toulouse",
    description:
      "Nos Pionniers-Caravelles rénovent entièrement notre local : peinture, électricité et aménagement d'une salle d'activités.",
    image: getImagePath(getProjectMainImage("renovation-local-toulouse")),
    slug: "renovation-local-toulouse",
    category: "Investissement",
    location: "Toulouse, Haute-Garonne",
    targetAmount: 8500,
    currentAmount: 5200,
    daysLeft: 42,
    supportersCount: 28,
    branch: "pionniers" as const,
    territory: "Occitanie",
    status: "active",
    createdAt: "2024-02-01",
  },
  {
    id: "3",
    title: "Achat d'un minibus pour le groupe",
    description:
      "Acquisition d'un véhicule 9 places pour faciliter les déplacements lors des sorties et week-ends scouts en région parisienne.",
    image: getImagePath(getProjectMainImage("minibus-groupe")),
    slug: "minibus-groupe",
    category: "Investissement",
    location: "Créteil, Val-de-Marne",
    targetAmount: 18000,
    currentAmount: 7200,
    daysLeft: 68,
    supportersCount: 22,
    branch: "scouts" as const,
    territory: "Île-de-France",
    status: "active",
    createdAt: "2024-01-20",
  },
  {
    id: "4",
    title: "Matériel de camping pour la troupe",
    description: "Renouvellement des tentes, réchauds et matériel de cuisine pour les camps scouts en Bretagne.",
    image: getImagePath(getProjectMainImage("materiel-camping-troupe")),
    slug: "materiel-camping-troupe",
    category: "Investissement",
    location: "Rennes, Ille-et-Vilaine",
    targetAmount: 2800,
    currentAmount: 1650,
    daysLeft: 28,
    supportersCount: 12,
    branch: "scouts" as const,
    territory: "Bretagne",
    status: "active",
    createdAt: "2024-01-25",
  },
  {
    id: "5",
    title: "Formation BAFA pour nos chefs",
    description: "Financement de la formation BAFA pour 6 nouveaux chefs et cheftaines du groupe lyonnais.",
    image: getImagePath(getProjectMainImage("formation-bafa")),
    slug: "formation-bafa",
    category: "Formation",
    location: "Lyon, Rhône",
    targetAmount: 3600,
    currentAmount: 2100,
    daysLeft: 21,
    supportersCount: 15,
    branch: "compagnons" as const,
    territory: "Auvergne-Rhône-Alpes",
    status: "active",
    createdAt: "2024-02-05",
  },
  {
    id: "6",
    title: "Jardin pédagogique pour les Farfadets",
    description:
      "Création d'un potager éducatif dans notre jardin alsacien pour sensibiliser nos plus jeunes à l'écologie.",
    image: getImagePath(getProjectMainImage("jardin-pedagogique-farfadets")),
    slug: "jardin-pedagogique-farfadets",
    category: "Environnement",
    location: "Strasbourg, Bas-Rhin",
    targetAmount: 1500,
    currentAmount: 890,
    daysLeft: 45,
    supportersCount: 9,
    branch: "farfadets" as const,
    territory: "Grand Est",
    status: "active",
    createdAt: "2024-01-10",
  },
  {
    id: "7",
    title: "Week-end ski pour les Scouts-Guides",
    description: "Organisation d'un week-end à la montagne avec cours de ski et veillées pour 25 jeunes savoyards.",
    image: getImagePath(getProjectMainImage("weekend-ski-vosges")),
    slug: "weekend-ski-vosges",
    category: "Activité",
    location: "Les Gets, Haute-Savoie",
    targetAmount: 3200,
    currentAmount: 2400,
    daysLeft: 15,
    supportersCount: 20,
    branch: "scouts" as const,
    territory: "Auvergne-Rhône-Alpes",
    status: "active",
    createdAt: "2024-02-10",
  },
  {
    id: "8",
    title: "Rénovation du chalet scout des Vosges",
    description: "Travaux de toiture, isolation et aménagement de notre chalet pour accueillir les camps d'hiver.",
    image: getImagePath(getProjectMainImage("renovation-chalet-montagne")),
    slug: "renovation-chalet-montagne",
    category: "Investissement",
    location: "Gérardmer, Vosges",
    targetAmount: 12000,
    currentAmount: 4800,
    daysLeft: 55,
    supportersCount: 16,
    branch: "scouts" as const,
    territory: "Grand Est",
    status: "active",
    createdAt: "2024-01-30",
  },
  {
    id: "9",
    title: "Matériel nautique pour les activités marines",
    description: "Achat de kayaks, gilets de sauvetage et matériel de voile pour la section marine de La Rochelle.",
    image: getImagePath(getProjectMainImage("equipement-nautique-marins")),
    slug: "equipement-nautique-marins",
    category: "Investissement",
    location: "La Rochelle, Charente-Maritime",
    targetAmount: 5400,
    currentAmount: 2700,
    daysLeft: 38,
    supportersCount: 14,
    branch: "scouts" as const,
    territory: "Nouvelle-Aquitaine",
    status: "active",
    createdAt: "2024-02-03",
  },
]

const territories = [
  "Auvergne-Rhône-Alpes",
  "Bretagne",
  "Île-de-France",
  "Nouvelle-Aquitaine",
  "Occitanie",
  "Provence-Alpes-Côte d'Azur",
  "Grand Est",
  "Hauts-de-France",
  "Normandie",
  "Centre-Val de Loire",
]

const categories = ["Investissement", "Activité", "Formation", "Environnement", "Solidarité"]

const branches = [
  { value: "farfadets", label: "Farfadets" },
  { value: "louveteaux", label: "Louveteaux et Jeannettes" },
  { value: "scouts", label: "Scouts et Guides" },
  { value: "pionniers", label: "Pionniers et Caravelles" },
  { value: "compagnons", label: "Compagnons" },
]

const statusFilters = [
  { value: "new", label: "Nouveaux", description: "Créés il y a moins d'un mois" },
  { value: "ending", label: "Bientôt à échéance", description: "Se terminent dans moins d'un mois" },
  { value: "almost-funded", label: "Presque financés", description: "Plus de 75% financés" },
]

const planOrientationCategories = [
  "Éducation et pédagogie",
  "Développement durable",
  "Citoyenneté et engagement",
  "Spiritualité et intériorité",
  "Ouverture au monde",
  "Vie de groupe",
]

export default function ProjectsPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTerritory, setSelectedTerritory] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedBranches, setSelectedBranches] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string[]>([])
  const [selectedPOCategories, setSelectedPOCategories] = useState<string[]>([])
  const [locationScope, setLocationScope] = useState<"my-territory" | "all-territories" | "national">("all-territories")
  const [sortBy, setSortBy] = useState("recent")
  const [showFilters, setShowFilters] = useState(false)
  const [userRole, setUserRole] = useState<"local" | "territorial" | "national">("local")
  const [selectedTerritories, setSelectedTerritories] = useState<string[]>([])
  const [showAdvancedLocation, setShowAdvancedLocation] = useState(false)
  const [showHeavyProjects, setShowHeavyProjects] = useState(false)

  // Initialiser la recherche avec les paramètres URL
  useEffect(() => {
    const searchParam = searchParams.get('search')
    if (searchParam) {
      setSearchQuery(searchParam)
    }
  }, [searchParams])

  const filteredProjects = allProjects.filter((project) => {
    // Search query filter
    if (
      searchQuery &&
      !project.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !project.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !project.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !project.territory.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    if (locationScope === "my-territory" && project.territory !== "Auvergne-Rhône-Alpes") {
      return false
    }
    if (locationScope === "national" && project.territory !== "National") {
      return false
    }

    // Territory filter
    if (selectedTerritory !== "all" && project.territory !== selectedTerritory) {
      return false
    }

    if (userRole === "national" && selectedTerritories.length > 0 && !selectedTerritories.includes(project.territory)) {
      return false
    }

    // Category filter
    if (selectedCategory !== "all" && project.category !== selectedCategory) {
      return false
    }

    // Branch filter
    if (selectedBranches.length > 0 && !selectedBranches.includes(project.branch)) {
      return false
    }

    if (showHeavyProjects && project.targetAmount <= 5000) {
      return false
    }

    // Status filter
    if (selectedStatus.length > 0) {
      const isNew = new Date(project.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      const isEnding = project.daysLeft < 30
      const isAlmostFunded = project.currentAmount / project.targetAmount > 0.75

      const matchesStatus = selectedStatus.some((status) => {
        if (status === "new" && isNew) return true
        if (status === "ending" && isEnding) return true
        if (status === "almost-funded" && isAlmostFunded) return true
        return false
      })

      if (!matchesStatus) return false
    }

    return true
  })

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "ending":
        return a.daysLeft - b.daysLeft
      case "funded":
        return b.currentAmount / b.targetAmount - a.currentAmount / a.targetAmount
      case "amount":
        return b.targetAmount - a.targetAmount
      default:
        return 0
    }
  })

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedTerritory("all")
    setSelectedCategory("all")
    setSelectedBranches([])
    setSelectedStatus([])
    setSelectedPOCategories([])
    setLocationScope("all-territories")
    setSelectedTerritories([])
    setShowHeavyProjects(false)
  }

  const activeFiltersCount = [
    selectedTerritory !== "all",
    selectedCategory !== "all",
    locationScope !== "all-territories",
    showHeavyProjects,
    ...selectedBranches,
    ...selectedStatus,
    ...selectedPOCategories,
    ...selectedTerritories,
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <SGDFLogo size="md" />

            <nav className="hidden md:flex items-center space-x-6">
              <a href={getAssetPath("/")} className="text-foreground hover:text-primary font-medium">
                Accueil
              </a>
              <a href={getAssetPath("/projects")} className="text-primary font-medium">
                Projets
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Select
                value={userRole}
                onValueChange={(value: "local" | "territorial" | "national") => setUserRole(value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">Local</SelectItem>
                  <SelectItem value="territorial">Territorial</SelectItem>
                  <SelectItem value="national">National</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Favoris
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Créer un projet
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">Découvrir les projets</h1>
          <p className="text-muted-foreground text-lg">Explorez et soutenez les projets de notre communauté scoute</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Rechercher par titre, description, structure, localisation..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Sheet open={showFilters} onOpenChange={setShowFilters}>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filtres
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filtres de recherche</SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <Label>Portée géographique</Label>
                    <Select
                      value={locationScope}
                      onValueChange={(value: "my-territory" | "all-territories" | "national") =>
                        setLocationScope(value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="my-territory">Mon territoire</SelectItem>
                        <SelectItem value="all-territories">Tous les territoires</SelectItem>
                        <SelectItem value="national">Projets nationaux</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {userRole === "national" && (
                    <div className="space-y-3">
                      <Label>Sélection avancée des territoires</Label>
                      <div className="max-h-40 overflow-y-auto space-y-2">
                        {territories.map((territory) => (
                          <div key={territory} className="flex items-center space-x-2">
                            <Checkbox
                              id={`territory-${territory}`}
                              checked={selectedTerritories.includes(territory)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedTerritories([...selectedTerritories, territory])
                                } else {
                                  setSelectedTerritories(selectedTerritories.filter((t) => t !== territory))
                                }
                              }}
                            />
                            <Label htmlFor={`territory-${territory}`} className="text-sm">
                              {territory}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Territory Filter */}
                  <div className="space-y-2">
                    <Label>Territoire spécifique</Label>
                    <Select value={selectedTerritory} onValueChange={setSelectedTerritory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tous les territoires" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les territoires</SelectItem>
                        {territories.map((territory) => (
                          <SelectItem key={territory} value={territory}>
                            {territory}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Type de projet Filter */}
                  <div className="space-y-2">
                    <Label>Type de projet</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tous les types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les types</SelectItem>
                        <SelectItem value="Investissement">Investissement</SelectItem>
                        <SelectItem value="Activité">Activité</SelectItem>
                        <SelectItem value="Formation">Formation</SelectItem>
                        <SelectItem value="Environnement">Environnement</SelectItem>
                        <SelectItem value="Solidarité">Solidarité</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Catégories du Plan d'Orientation</Label>
                    <div className="max-h-40 overflow-y-auto space-y-2">
                      {planOrientationCategories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`po-${category}`}
                            checked={selectedPOCategories.includes(category)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedPOCategories([...selectedPOCategories, category])
                              } else {
                                setSelectedPOCategories(selectedPOCategories.filter((c) => c !== category))
                              }
                            }}
                          />
                          <Label htmlFor={`po-${category}`} className="text-sm">
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Branch Filter */}
                  <div className="space-y-3">
                    <Label>Branches</Label>
                    {branches.map((branch) => (
                      <div key={branch.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={branch.value}
                          checked={selectedBranches.includes(branch.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedBranches([...selectedBranches, branch.value])
                            } else {
                              setSelectedBranches(selectedBranches.filter((b) => b !== branch.value))
                            }
                          }}
                        />
                        <Label htmlFor={branch.value} className="text-sm">
                          {branch.label}
                        </Label>
                      </div>
                    ))}
                  </div>

                  {/* Status Filter */}
                  <div className="space-y-3">
                    <Label>Statut</Label>
                    {statusFilters.map((status) => (
                      <div key={status.value} className="flex items-start space-x-2">
                        <Checkbox
                          id={status.value}
                          checked={selectedStatus.includes(status.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedStatus([...selectedStatus, status.value])
                            } else {
                              setSelectedStatus(selectedStatus.filter((s) => s !== status.value))
                            }
                          }}
                        />
                        <div>
                          <Label htmlFor={status.value} className="text-sm font-medium">
                            {status.label}
                          </Label>
                          <p className="text-xs text-muted-foreground">{status.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {(userRole === "territorial" || userRole === "national") && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="heavy-projects"
                          checked={showHeavyProjects}
                          onCheckedChange={(checked) => setShowHeavyProjects(checked === true)}
                        />
                        <Label htmlFor="heavy-projects" className="text-sm font-medium">
                          Projets lourds uniquement
                        </Label>
                      </div>
                      <p className="text-xs text-muted-foreground">Budget supérieur à 5 000 €</p>
                    </div>
                  )}

                  {/* Clear Filters */}
                  {activeFiltersCount > 0 && (
                    <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
                      <X className="w-4 h-4 mr-2" />
                      Effacer les filtres
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Quick Filters and Sort */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Trier par:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Plus récents
                    </div>
                  </SelectItem>
                  <SelectItem value="ending">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Fin proche
                    </div>
                  </SelectItem>
                  <SelectItem value="funded">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />% financé
                    </div>
                  </SelectItem>
                  <SelectItem value="amount">
                    <div className="flex items-center gap-2">
                      <Euro className="w-4 h-4" />
                      Montant
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">Filtres actifs:</span>
                {locationScope !== "all-territories" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {locationScope === "my-territory" ? "Mon territoire" : "National"}
                    <button onClick={() => setLocationScope("all-territories")}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {selectedTerritory !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {selectedTerritory}
                    <button onClick={() => setSelectedTerritory("all")}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {selectedCategory !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory("all")}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {showHeavyProjects && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Euro className="w-3 h-3" />
                    Projets lourds
                    <button onClick={() => setShowHeavyProjects(false)}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {selectedBranches.map((branch) => (
                  <Badge key={branch} variant="secondary" className="flex items-center gap-1">
                    {branches.find((b) => b.value === branch)?.label}
                    <button onClick={() => setSelectedBranches(selectedBranches.filter((b) => b !== branch))}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {sortedProjects.length} projet{sortedProjects.length > 1 ? "s" : ""} trouvé
              {sortedProjects.length > 1 ? "s" : ""}
            </p>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Vue liste
              </Button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {sortedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-muted-foreground mb-4">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Aucun projet trouvé</h3>
                <p>Essayez de modifier vos critères de recherche ou de supprimer certains filtres.</p>
              </div>
              <Button variant="outline" onClick={clearFilters}>
                Effacer tous les filtres
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Load More */}
        {sortedProjects.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Charger plus de projets
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
