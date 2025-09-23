"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Download,
  Euro,
  Building2,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  RefreshCw,
  AlertCircle,
  TrendingUp,
  Users,
} from "lucide-react"

const mockCredits = [
  {
    id: 1,
    structure: "Groupe Saint-Michel - Paris 15e",
    territory: "Île-de-France",
    montant: 5000,
    etat: "attente",
    dateCreation: "2025-01-10",
    dateVirement: null,
    reference: "CR-2025-001",
    type: "Crédit annuel",
  },
  {
    id: 2,
    structure: "Groupe Baden-Powell - Lyon 3e",
    territory: "Rhône-Alpes",
    montant: 3500,
    etat: "vire",
    dateCreation: "2025-01-05",
    dateVirement: "2025-01-15",
    reference: "CR-2025-002",
    type: "Crédit annuel",
  },
  {
    id: 3,
    structure: "Équipe Territoriale Normandie",
    territory: "Normandie",
    montant: 8000,
    etat: "attente",
    dateCreation: "2025-01-12",
    dateVirement: null,
    reference: "CR-2025-003",
    type: "Crédit territorial",
  },
  {
    id: 4,
    structure: "Groupe Notre-Dame - Marseille",
    territory: "Provence-Alpes-Côte d'Azur",
    montant: 2500,
    etat: "vire",
    dateCreation: "2025-01-08",
    dateVirement: "2025-01-18",
    reference: "CR-2025-004",
    type: "Crédit annuel",
  },
]

const mockPromises = [
  {
    id: 1,
    projet: "Camp d'été en Ardèche - Groupe Saint-Michel",
    projetId: 1,
    structure: "Groupe Saint-Michel - Paris 15e",
    donateur: "Marie Dubois",
    montant: 150,
    etatVirement: "attente",
    datePromesse: "2025-01-15",
    dateVirement: null,
    reference: "PR-2025-001",
  },
  {
    id: 2,
    projet: "Construction d'un local scout - Groupe Baden-Powell",
    projetId: 2,
    structure: "Groupe Baden-Powell - Lyon 3e",
    donateur: "Pierre Martin",
    montant: 500,
    etatVirement: "vire",
    datePromesse: "2025-01-12",
    dateVirement: "2025-01-20",
    reference: "PR-2025-002",
  },
  {
    id: 3,
    projet: "Formation BAFA - Territoire Normandie",
    projetId: 3,
    structure: "Équipe Territoriale Normandie",
    donateur: "Sophie Leroy",
    montant: 75,
    etatVirement: "attente",
    datePromesse: "2025-01-18",
    dateVirement: null,
    reference: "PR-2025-003",
  },
  {
    id: 4,
    projet: "Camp d'été en Ardèche - Groupe Saint-Michel",
    projetId: 1,
    structure: "Groupe Saint-Michel - Paris 15e",
    donateur: "Jean Dupont",
    montant: 200,
    etatVirement: "vire",
    datePromesse: "2025-01-16",
    dateVirement: "2025-01-22",
    reference: "PR-2025-004",
  },
]

export default function FinancialManagementPage() {
  const [credits, setCredits] = useState(mockCredits)
  const [promises, setPromises] = useState(mockPromises)
  const [selectedCredits, setSelectedCredits] = useState<number[]>([])
  const [selectedPromises, setSelectedPromises] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterEtat, setFilterEtat] = useState("all")
  const [isUpdating, setIsUpdating] = useState(false)

  const handleExportCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0] || {})
    const csvContent = [
      headers.join(","),
      ...data.map((row) => headers.map((header) => `"${row[header] || ""}"`).join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${filename}-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleBulkUpdatePromises = async (etat: "vire" | "attente") => {
    setIsUpdating(true)

    // Simulation d'une requête API
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setPromises((prev) =>
      prev.map((promise) =>
        selectedPromises.includes(promise.id)
          ? {
              ...promise,
              etatVirement: etat,
              dateVirement: etat === "vire" ? new Date().toISOString().split("T")[0] : null,
            }
          : promise,
      ),
    )

    setSelectedPromises([])
    setIsUpdating(false)
  }

  const handleBulkUpdateCredits = async (etat: "vire" | "attente") => {
    setIsUpdating(true)

    // Simulation d'une requête API
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setCredits((prev) =>
      prev.map((credit) =>
        selectedCredits.includes(credit.id)
          ? {
              ...credit,
              etat,
              dateVirement: etat === "vire" ? new Date().toISOString().split("T")[0] : null,
            }
          : credit,
      ),
    )

    setSelectedCredits([])
    setIsUpdating(false)
  }

  const getEtatBadge = (etat: string) => {
    switch (etat) {
      case "attente":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            <Clock className="w-3 h-3 mr-1" />
            En attente
          </Badge>
        )
      case "vire":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Viré
          </Badge>
        )
      case "refuse":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Refusé
          </Badge>
        )
      default:
        return <Badge variant="outline">{etat}</Badge>
    }
  }

  const filteredCredits = credits.filter((credit) => {
    const matchesSearch =
      credit.structure.toLowerCase().includes(searchTerm.toLowerCase()) ||
      credit.reference.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterEtat === "all" || credit.etat === filterEtat
    return matchesSearch && matchesFilter
  })

  const filteredPromises = promises.filter((promise) => {
    const matchesSearch =
      promise.projet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promise.donateur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promise.reference.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterEtat === "all" || promise.etatVirement === filterEtat
    return matchesSearch && matchesFilter
  })

  const totalCredits = credits.reduce((sum, credit) => sum + credit.montant, 0)
  const totalCreditsAttente = credits
    .filter((c) => c.etat === "attente")
    .reduce((sum, credit) => sum + credit.montant, 0)
  const totalPromises = promises.reduce((sum, promise) => sum + promise.montant, 0)
  const totalPromisesAttente = promises
    .filter((p) => p.etatVirement === "attente")
    .reduce((sum, promise) => sum + promise.montant, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-sgdf-blue mb-2" style={{ fontFamily: "var(--font-caveat)" }}>
            Gestion financière
          </h1>
          <p className="text-gray-600">
            Suivi des crédits et promesses de dons de la plateforme de financement participatif
          </p>
        </div>

        {/* Statistiques générales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Crédits totaux</p>
                  <p className="text-2xl font-bold text-sgdf-blue">{totalCredits.toLocaleString("fr-FR")} €</p>
                </div>
                <Euro className="w-8 h-8 text-sgdf-blue" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Crédits en attente</p>
                  <p className="text-2xl font-bold text-orange-600">{totalCreditsAttente.toLocaleString("fr-FR")} €</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Promesses totales</p>
                  <p className="text-2xl font-bold text-sgdf-blue">{totalPromises.toLocaleString("fr-FR")} €</p>
                </div>
                <TrendingUp className="w-8 h-8 text-sgdf-blue" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Promesses en attente</p>
                  <p className="text-2xl font-bold text-orange-600">{totalPromisesAttente.toLocaleString("fr-FR")} €</p>
                </div>
                <AlertCircle className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres et recherche */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Rechercher</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="search"
                    placeholder="Rechercher par structure, référence, projet..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="filter">Filtrer par état</Label>
                <Select value={filterEtat} onValueChange={setFilterEtat}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les états</SelectItem>
                    <SelectItem value="attente">En attente</SelectItem>
                    <SelectItem value="vire">Viré</SelectItem>
                    <SelectItem value="refuse">Refusé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="credits" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="credits" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Résumé des crédits ({filteredCredits.length})
            </TabsTrigger>
            <TabsTrigger value="promises" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Promesses de dons ({filteredPromises.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="credits">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Résumé des crédits par structure
                  </CardTitle>
                  <div className="flex gap-2">
                    {selectedCredits.length > 0 && (
                      <>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Marquer comme viré ({selectedCredits.length})
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Confirmer les virements</DialogTitle>
                              <DialogDescription>
                                Vous êtes sur le point de marquer {selectedCredits.length} crédit(s) comme viré(s).
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline">Annuler</Button>
                              <Button
                                onClick={() => handleBulkUpdateCredits("vire")}
                                disabled={isUpdating}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                {isUpdating ? <RefreshCw className="w-4 h-4 mr-1 animate-spin" /> : null}
                                Confirmer
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </>
                    )}
                    <Button variant="outline" size="sm" onClick={() => handleExportCSV(filteredCredits, "credits")}>
                      <Download className="w-4 h-4 mr-1" />
                      Export CSV
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedCredits.length === filteredCredits.length && filteredCredits.length > 0}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCredits(filteredCredits.map((c) => c.id))
                            } else {
                              setSelectedCredits([])
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead>Structure</TableHead>
                      <TableHead>Territoire</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>État</TableHead>
                      <TableHead>Date création</TableHead>
                      <TableHead>Date virement</TableHead>
                      <TableHead>Référence</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCredits.map((credit) => (
                      <TableRow key={credit.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedCredits.includes(credit.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCredits([...selectedCredits, credit.id])
                              } else {
                                setSelectedCredits(selectedCredits.filter((id) => id !== credit.id))
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{credit.structure}</TableCell>
                        <TableCell>{credit.territory}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{credit.type}</Badge>
                        </TableCell>
                        <TableCell className="font-semibold">{credit.montant.toLocaleString("fr-FR")} €</TableCell>
                        <TableCell>{getEtatBadge(credit.etat)}</TableCell>
                        <TableCell>{new Date(credit.dateCreation).toLocaleDateString("fr-FR")}</TableCell>
                        <TableCell>
                          {credit.dateVirement ? new Date(credit.dateVirement).toLocaleDateString("fr-FR") : "-"}
                        </TableCell>
                        <TableCell className="font-mono text-sm">{credit.reference}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="promises">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Résumé des promesses de dons
                  </CardTitle>
                  <div className="flex gap-2">
                    {selectedPromises.length > 0 && (
                      <>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Marquer comme viré ({selectedPromises.length})
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Confirmer les virements</DialogTitle>
                              <DialogDescription>
                                Vous êtes sur le point de marquer {selectedPromises.length} promesse(s) comme virée(s).
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline">Annuler</Button>
                              <Button
                                onClick={() => handleBulkUpdatePromises("vire")}
                                disabled={isUpdating}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                {isUpdating ? <RefreshCw className="w-4 h-4 mr-1 animate-spin" /> : null}
                                Confirmer
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleBulkUpdatePromises("attente")}
                          disabled={isUpdating}
                        >
                          Remettre en attente
                        </Button>
                      </>
                    )}
                    <Button variant="outline" size="sm" onClick={() => handleExportCSV(filteredPromises, "promesses")}>
                      <Download className="w-4 h-4 mr-1" />
                      Export CSV
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedPromises.length === filteredPromises.length && filteredPromises.length > 0}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedPromises(filteredPromises.map((p) => p.id))
                            } else {
                              setSelectedPromises([])
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead>Projet</TableHead>
                      <TableHead>Donateur</TableHead>
                      <TableHead>Structure</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>État virement</TableHead>
                      <TableHead>Date promesse</TableHead>
                      <TableHead>Date virement</TableHead>
                      <TableHead>Référence</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPromises.map((promise) => (
                      <TableRow key={promise.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedPromises.includes(promise.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedPromises([...selectedPromises, promise.id])
                              } else {
                                setSelectedPromises(selectedPromises.filter((id) => id !== promise.id))
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell className="font-medium max-w-xs truncate">{promise.projet}</TableCell>
                        <TableCell>{promise.donateur}</TableCell>
                        <TableCell className="text-sm">{promise.structure}</TableCell>
                        <TableCell className="font-semibold">{promise.montant.toLocaleString("fr-FR")} €</TableCell>
                        <TableCell>{getEtatBadge(promise.etatVirement)}</TableCell>
                        <TableCell>{new Date(promise.datePromesse).toLocaleDateString("fr-FR")}</TableCell>
                        <TableCell>
                          {promise.dateVirement ? new Date(promise.dateVirement).toLocaleDateString("fr-FR") : "-"}
                        </TableCell>
                        <TableCell className="font-mono text-sm">{promise.reference}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
