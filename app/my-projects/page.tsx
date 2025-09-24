"use client"

import { useState } from "react"
import { getAssetPath } from "@/lib/utils"
import { SGDFLogo } from "@/components/sgdf-logo"
import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Filter, Edit3, Eye } from "lucide-react"

export default function MyProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [userRole, setUserRole] = useState("member") // member, territorial, national

  const myCreatedProjects = [
    {
      id: "1",
      title: "Camp d'été Scouts - Forêt de Fontainebleau",
      description: "Organisation du camp d'été 2025 pour 40 jeunes scouts dans la magnifique forêt de Fontainebleau.",
      image: getAssetPath("/chalet_de_montagne.png"),
      raised: 2800,
      goal: 4500,
      contributors: 23,
      daysLeft: 45,
      category: "Activité",
      branch: "Scouts et Guides",
      territory: "Île-de-France",
      status: "En cours",
      createdBy: "current-user",
      lastModified: "2025-01-15T10:30:00Z",
      modifiedBy: "current-user",
      canEdit: true,
      canDelete: true,
    },
    {
      id: "2",
      title: "Matériel nautique - Base de Carnac",
      description: "Renouvellement des kayaks et équipements de sécurité pour les activités nautiques.",
      image: getAssetPath("/equipement_nautique.png"),
      raised: 1200,
      goal: 3200,
      contributors: 8,
      daysLeft: 62,
      category: "Investissement",
      branch: "Scouts et Guides",
      territory: "Bretagne",
      status: "Brouillon",
      createdBy: "current-user",
      lastModified: "2025-01-14T16:45:00Z",
      modifiedBy: "current-user",
      canEdit: true,
      canDelete: true,
    },
  ]

  const collaborativeProjects = [
    {
      id: "3",
      title: "Formation BAFA - Session Automne",
      description: "Organisation d'une session de formation BAFA pour 25 futurs animateurs.",
      image: getAssetPath("/formation_bafa.png"),
      raised: 800,
      goal: 1500,
      contributors: 12,
      daysLeft: 28,
      category: "Activité",
      branch: "Pionniers et Caravelles",
      territory: "Auvergne-Rhône-Alpes",
      status: "En cours",
      createdBy: "marie.dupont",
      lastModified: "2025-01-13T14:20:00Z",
      modifiedBy: "current-user",
      canEdit: true,
      canDelete: false,
    },
  ]

  const structureProjects = [
    {
      id: "4",
      title: "Rénovation du local scout",
      description: "Travaux de rénovation et d'aménagement du local du groupe scout de Lyon 3e.",
      image: getAssetPath("/renovation_local_scout_toulouse.png"),
      raised: 5200,
      goal: 8000,
      contributors: 34,
      daysLeft: 18,
      category: "Investissement",
      branch: "Groupe",
      territory: "Auvergne-Rhône-Alpes",
      status: "Validé",
      createdBy: "jean.martin",
      lastModified: "2025-01-12T09:15:00Z",
      modifiedBy: "jean.martin",
      canEdit: false,
      canDelete: false,
    },
    {
      id: "5",
      title: "Jardin pédagogique Louveteaux",
      description: "Création d'un jardin pédagogique pour sensibiliser les plus jeunes à l'écologie.",
      image: getAssetPath("/jardin_pedagogique.png"),
      raised: 450,
      goal: 900,
      contributors: 15,
      daysLeft: 35,
      category: "Activité",
      branch: "Louveteaux et Jeannettes",
      territory: "Auvergne-Rhône-Alpes",
      status: "En cours",
      createdBy: "sophie.bernard",
      lastModified: "2025-01-11T11:30:00Z",
      modifiedBy: "sophie.bernard",
      canEdit: false,
      canDelete: false,
    },
  ]

  const filterProjects = (projects: any[]) => {
    if (!searchQuery) return projects
    return projects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.branch.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <SGDFLogo size="md" />
              <nav className="hidden md:flex items-center space-x-6">
                <a href="/" className="text-foreground hover:text-primary font-medium">
                  Accueil
                </a>
                <a href="/projects" className="text-foreground hover:text-primary font-medium">
                  Projets
                </a>
                <a href="/my-projects" className="text-primary font-medium">
                  Mes projets
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <a href="/favorites">❤️ Favoris</a>
              </Button>
              <Button asChild>
                <a href="/create-project">
                  <Plus className="w-4 h-4 mr-2" />
                  Créer un projet
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4 font-caveat">Mes projets</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Gérez vos projets, suivez leur progression et collaborez avec votre équipe.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <Badge variant="outline" className="text-sm">
              📍 Groupe Scout Lyon 3e - Martin Luther King
            </Badge>
            <Badge variant="secondary" className="text-sm">
              👤 Pierre Dubois - Responsable de groupe
            </Badge>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Rechercher dans mes projets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </Button>
        </div>

        <Tabs defaultValue="created" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="created" className="flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              Mes créations ({filterProjects(myCreatedProjects).length})
            </TabsTrigger>
            <TabsTrigger value="collaborative" className="flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              Collaborations ({filterProjects(collaborativeProjects).length})
            </TabsTrigger>
            <TabsTrigger value="structure" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Ma structure ({filterProjects(structureProjects).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="created">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-primary mb-2">Projets que j'ai créés</h2>
              <p className="text-muted-foreground mb-4">
                Vous avez tous les droits sur ces projets : modification, suppression, gestion des contributeurs.
              </p>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Edit3 className="w-3 h-3 mr-1" />
                  Droits complets (RW)
                </Badge>
                <Badge variant="outline" className="text-xs">
                  ✓ Modifier ✓ Supprimer ✓ Gérer les contributeurs
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterProjects(myCreatedProjects).map((project) => (
                <ProjectCard
                  key={project.id}
                  {...project}
                  showEditButton={project.canEdit}
                  showDeleteButton={project.canDelete}
                  rightsLevel="full"
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="collaborative">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-primary mb-2">Projets collaboratifs</h2>
              <p className="text-muted-foreground mb-4">
                Projets où vous avez été ajouté comme modificateur par le créateur ou le responsable de structure.
              </p>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  <Edit3 className="w-3 h-3 mr-1" />
                  Droits de modification (RW)
                </Badge>
                <Badge variant="outline" className="text-xs">
                  ✓ Modifier ✗ Supprimer ✗ Gérer les contributeurs
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterProjects(collaborativeProjects).map((project) => (
                <ProjectCard
                  key={project.id}
                  {...project}
                  showEditButton={project.canEdit}
                  showDeleteButton={false}
                  rightsLevel="edit"
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="structure">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-primary mb-2">Projets de ma structure</h2>
              <p className="text-muted-foreground mb-4">
                Tous les projets créés par les membres de votre groupe scout. Vous pouvez les consulter mais pas les
                modifier.
              </p>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="bg-gray-100 text-gray-800">
                  <Eye className="w-3 h-3 mr-1" />
                  Lecture seule (RO)
                </Badge>
                <Badge variant="outline" className="text-xs">
                  ✓ Consulter ✗ Modifier ✗ Supprimer
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterProjects(structureProjects).map((project) => (
                <ProjectCard
                  key={project.id}
                  {...project}
                  showEditButton={false}
                  showDeleteButton={false}
                  rightsLevel="readonly"
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filterProjects(myCreatedProjects).length === 0 &&
          filterProjects(collaborativeProjects).length === 0 &&
          filterProjects(structureProjects).length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Plus className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {searchQuery ? "Aucun projet trouvé" : "Aucun projet pour le moment"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery
                  ? "Essayez de modifier votre recherche ou de supprimer les filtres."
                  : "Créez votre premier projet pour commencer à collecter des fonds pour votre groupe scout."}
              </p>
              {!searchQuery && (
                <Button asChild>
                  <a href="/create-project">
                    <Plus className="w-4 h-4 mr-2" />
                    Créer mon premier projet
                  </a>
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
              <SGDFLogo size="sm" className="mb-4" />
              <p className="text-sm opacity-90">
                Mouvement de jeunesse et d'éducation populaire catholique ouvert à tous.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Projets</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>
                  <a href="/projects" className="hover:opacity-100">
                    Tous les projets
                  </a>
                </li>
                <li>
                  <a href="/my-projects" className="hover:opacity-100">
                    Mes projets
                  </a>
                </li>
                <li>
                  <a href="/create-project" className="hover:opacity-100">
                    Créer un projet
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
