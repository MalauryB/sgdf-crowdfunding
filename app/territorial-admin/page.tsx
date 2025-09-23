"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Download,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  Euro,
  Users,
  TrendingUp,
  FileText,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

const mockTerritorialProjects = [
  {
    id: 1,
    title: "Camp d'été en Ardèche - Groupe Saint-Michel",
    description: "Organisation d'un camp de 15 jours pour 24 jeunes scouts et guides dans les gorges de l'Ardèche.",
    structure: "Groupe Saint-Michel - Paris 15e",
    territory: "Île-de-France",
    type: "Activité",
    budgetTotal: 8500,
    montantRecherche: 3000,
    montantCollecte: 2100,
    dateEcheance: "2025-06-15",
    dateCreation: "2025-01-10",
    status: "VALIDATED",
    branch: "scouts-guides",
    categories: ["Vie dans la nature", "Fraternité"],
    creator: "Marie Dubois",
    supportersCount: 18,
    lastActivity: "2025-01-20",
  },
  {
    id: 2,
    title: "Rénovation du local scout - Groupe Baden-Powell",
    description: "Rénovation complète du local pour accueillir les activités du groupe.",
    structure: "Groupe Baden-Powell - Lyon 3e",
    territory: "Auvergne-Rhône-Alpes",
    type: "Investissement",
    budgetTotal: 15000,
    montantRecherche: 8000,
    montantCollecte: 5200,
    dateEcheance: "2025-08-31",
    dateCreation: "2025-01-08",
    status: "VALIDATED",
    branch: "general",
    categories: ["Construire la fraternité", "Habiter autrement la planète"],
    creator: "Pierre Martin",
    supportersCount: 28,
    lastActivity: "2025-01-18",
  },
  {
    id: 3,
    title: "Formation BAFA - Territoire Normandie",
    description: "Organisation d'une session de formation BAFA pour 20 jeunes du territoire.",
    structure: "Équipe Territoriale Normandie",
    territory: "Normandie",
    type: "Formation",
    budgetTotal: 6500,
    montantRecherche: 2500,
    montantCollecte: 1800,
    dateEcheance: "2025-07-20",
    dateCreation: "2025-01-12",
    status: "PENDING_VALIDATION",
    branch: "general",
    categories: ["Grandir en humanité", "Construire la fraternité"],
    creator: "Sophie Leroy",
    supportersCount: 15,
    lastActivity: "2025-01-19",
  },
  {
    id: 4,
    title: "Matériel de camping - Troupe Sainte-Thérèse",
    description: "Renouvellement du matériel de camping pour les sorties et camps.",
    structure: "Troupe Sainte-Thérèse - Toulouse",
    territory: "Occitanie",
    type: "Investissement",
    budgetTotal: 4200,
    montantRecherche: 2800,
    montantCollecte: 1650,
    dateEcheance: "2025-05-30",
    dateCreation: "2025-01-15",
    status: "VALIDATED",
    branch: "scouts",
    categories: ["Vie dans la nature"],
    creator: "Antoine Dubois",
    supportersCount: 12,
    lastActivity: "2025-01-21",
  },
  {
    id: 5,
    title: "Week-end ski - Compagnie Saint-François",
    description: "Organisation d'un week-end à la montagne avec cours de ski.",
    structure: "Compagnie Saint-François - Grenoble",
    territory: "Auvergne-Rhône-Alpes",
    type: "Activité",
    budgetTotal: 3200,
    montantRecherche: 1500,
    montantCollecte: 890,
    dateEcheance: "2025-03-15",
    dateCreation: "2025-01-20",
    status: "DRAFT",
    branch: "jeannettes",
    categories: ["Vie dans la nature", "Fraternité"],
    creator: "Claire Martin",
    supportersCount: 9,
    lastActivity: "2025-01-22",
  },
]

const mockUserTerritory = "Auvergne-Rhône-Alpes"

export default function TerritorialAdminPage() {
  const [projects, setProjects] = useState(mockTerritorialProjects)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStructures, setSelectedStructures] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("recent")
  const [showFilters, setShowFilters] = useState(false)

  const territorialProjects = projects.filter(
    (project) => project.territory === mockUserTerritory || project.structure.includes(mockUserTerritory),
  )

  const filteredProjects = territorialProjects.filter((project) => {
    if (
      searchQuery &&
      !project.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !project.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !project.structure.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    if (selectedStatus !== "all" && project.status !== selectedStatus) {
      return false
    }

    if (selectedType !== "all" && project.type !== selectedType) {
      return false
    }

    if (selectedStructures.length > 0 && !selectedStructures.includes(project.structure)) {
      return false
    }

    return true
  })

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime()
      case "ending":
        return new Date(a.dateEcheance).getTime() - new Date(b.dateEcheance).getTime()
      case "amount":
        return b.budgetTotal - a.budgetTotal
      case "funded":
        return b.montantCollecte / b.montantRecherche - a.montantCollecte / a.montantRecherche
      default:
        return 0
    }
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "DRAFT":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            <Edit className="w-3 h-3 mr-1" />
            Brouillon
          </Badge>
        )
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

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Titre",
      "Structure",
      "Type",
      "Budget Total",
      "Montant Recherché",
      "Montant Collecté",
      "Statut",
      "Date Création",
      "Date Échéance",
      "Créateur",
      "Nb Soutiens",
    ]

    const csvData = sortedProjects.map((project) => [
      project.id,
      `"${project.title}"`,
      `"${project.structure}"`,
      project.type,
      project.budgetTotal,
      project.montantRecherche,
      project.montantCollecte,
      project.status,
      project.dateCreation,
      project.dateEcheance,
      `"${project.creator}"`,
      project.supportersCount,
    ])

    const csvContent = [headers, ...csvData].map((row) => row.join(",")).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute(
      "download",
      `projets_territoire_${mockUserTerritory}_${new Date().toISOString().split("T")[0]}.csv`,
    )
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const structures = Array.from(new Set(territorialProjects.map((p) => p.structure)))

  const stats = {
    total: territorialProjects.length,
    validated: territorialProjects.filter((p) => p.status === "VALIDATED").length,
    pending: territorialProjects.filter((p) => p.status === "PENDING_VALIDATION").length,
    totalBudget: territorialProjects.reduce((sum, p) => sum + p.budgetTotal, 0),
    totalCollected: territorialProjects.reduce((sum, p) => sum + p.montantCollecte, 0),
    totalSupporters: territorialProjects.reduce((sum, p) => sum + p.supportersCount, 0),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-sgdf-blue mb-2" style={{ fontFamily: "var(--font-caveat)" }}>
                Administration Territoriale
              </h1>
              <p className="text-gray-600">
                Territoire : <span className="font-semibold text-sgdf-blue">{mockUserTerritory}</span>
              </p>
            </div>
            <Button onClick={exportToCSV} className="bg-sgdf-blue hover:bg-sgdf-blue/90">
              <Download className="w-4 h-4 mr-2" />
              Exporter CSV
            </Button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Projets</p>
                    <p className="text-2xl font-bold text-sgdf-blue">{stats.total}</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-sgdf-blue" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Projets Validés</p>
                    <p className="text-2xl font-bold text-green-600">{stats.validated}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Budget Total</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.totalBudget.toLocaleString("fr-FR")} €</p>
                  </div>
                  <Euro className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Soutiens</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.totalSupporters}</p>
                  </div>
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Projets ({stats.total})
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analyses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Rechercher par titre, description, structure..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="bg-transparent">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres
                </Button>
              </div>

              {showFilters && (
                <Card>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label>Statut</Label>
                        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tous les statuts</SelectItem>
                            <SelectItem value="DRAFT">Brouillon</SelectItem>
                            <SelectItem value="PENDING_VALIDATION">En attente</SelectItem>
                            <SelectItem value="VALIDATED">Validé</SelectItem>
                            <SelectItem value="REFUSED">Refusé</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Type</Label>
                        <Select value={selectedType} onValueChange={setSelectedType}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tous les types</SelectItem>
                            <SelectItem value="Investissement">Investissement</SelectItem>
                            <SelectItem value="Activité">Activité</SelectItem>
                            <SelectItem value="Formation">Formation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Trier par</Label>
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="recent">Plus récents</SelectItem>
                            <SelectItem value="ending">Fin proche</SelectItem>
                            <SelectItem value="amount">Montant</SelectItem>
                            <SelectItem value="funded">% financé</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-end">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSearchQuery("")
                            setSelectedStatus("all")
                            setSelectedType("all")
                            setSelectedStructures([])
                          }}
                          className="bg-transparent"
                        >
                          Réinitialiser
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Projects Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Projets du territoire ({sortedProjects.length})</span>
                  <div className="text-sm text-gray-600">
                    {stats.totalCollected.toLocaleString("fr-FR")} € collectés sur{" "}
                    {stats.totalBudget.toLocaleString("fr-FR")} € demandés
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Projet</TableHead>
                        <TableHead>Structure</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Collecté</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Échéance</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedProjects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium text-sgdf-blue">{project.title}</div>
                              <div className="text-sm text-gray-600 truncate max-w-xs">{project.description}</div>
                              <div className="text-xs text-gray-500 mt-1">
                                Par {project.creator} • {project.supportersCount} soutiens
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">{project.structure}</div>
                              <div className="text-gray-600">{project.territory}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                project.type === "Investissement"
                                  ? "bg-purple-50 text-purple-700 border-purple-200"
                                  : project.type === "Activité"
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : "bg-blue-50 text-blue-700 border-blue-200"
                              }
                            >
                              {project.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">{project.budgetTotal.toLocaleString("fr-FR")} €</div>
                              <div className="text-gray-600">
                                Recherché: {project.montantRecherche.toLocaleString("fr-FR")} €
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium text-green-600">
                                {project.montantCollecte.toLocaleString("fr-FR")} €
                              </div>
                              <div className="text-gray-600">
                                {Math.round((project.montantCollecte / project.montantRecherche) * 100)}%
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(project.status)}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{new Date(project.dateEcheance).toLocaleDateString("fr-FR")}</div>
                              <div className="text-gray-600">
                                {Math.ceil(
                                  (new Date(project.dateEcheance).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
                                )}{" "}
                                jours
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link href={`/project/${project.id}`}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    Voir le détail
                                  </Link>
                                </DropdownMenuItem>
                                {project.status === "PENDING_VALIDATION" && (
                                  <DropdownMenuItem asChild>
                                    <Link href={`/validation`}>
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Valider
                                    </Link>
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Répartition par type de projet</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Investissement", "Activité", "Formation"].map((type) => {
                      const count = territorialProjects.filter((p) => p.type === type).length
                      const percentage = Math.round((count / territorialProjects.length) * 100)
                      return (
                        <div key={type} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{type}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div className="bg-sgdf-blue h-2 rounded-full" style={{ width: `${percentage}%` }} />
                            </div>
                            <span className="text-sm text-gray-600 w-12">
                              {count} ({percentage}%)
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Répartition par statut</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { status: "VALIDATED", label: "Validés", color: "bg-green-500" },
                      { status: "PENDING_VALIDATION", label: "En attente", color: "bg-orange-500" },
                      { status: "DRAFT", label: "Brouillons", color: "bg-gray-500" },
                      { status: "REFUSED", label: "Refusés", color: "bg-red-500" },
                    ].map(({ status, label, color }) => {
                      const count = territorialProjects.filter((p) => p.status === status).length
                      const percentage = Math.round((count / territorialProjects.length) * 100)
                      return (
                        <div key={status} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{label}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div className={`${color} h-2 rounded-full`} style={{ width: `${percentage}%` }} />
                            </div>
                            <span className="text-sm text-gray-600 w-12">
                              {count} ({percentage}%)
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
