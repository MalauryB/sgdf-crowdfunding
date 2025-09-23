"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Camera, Save, User, Shield, CreditCard, Bell } from "lucide-react"
import Link from "next/link"

export default function AccountPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@sgdf.fr",
    phone: "06 12 34 56 78",
    structure: "Groupe Saint-Michel - Paris 15e",
    territory: "Île-de-France",
    role: "Chef de groupe",
    bio: "Responsable du groupe depuis 5 ans, passionné par les projets jeunesse et l'éducation populaire.",
    notifications: {
      email: true,
      push: false,
      projects: true,
      donations: true,
    },
  })

  const handleSave = () => {
    // Simulation de sauvegarde
    setIsEditing(false)
    // Ici on ferait l'appel API pour sauvegarder
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const userStats = {
    projectsCreated: 3,
    projectsSupported: 12,
    totalDonations: 450,
    creditAvailable: 200,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Retour
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Mon compte</h1>
            </div>
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Enregistrer
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>Modifier le profil</Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations personnelles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Informations personnelles
                </CardTitle>
                <CardDescription>Gérez vos informations de profil et vos préférences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Photo de profil */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/abstract-profile.png" alt="Photo de profil" />
                      <AvatarFallback className="text-lg">
                        {formData.firstName[0]}
                        {formData.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {formData.firstName} {formData.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">{formData.role}</p>
                    <Badge variant="secondary" className="mt-1">
                      {formData.structure}
                    </Badge>
                  </div>
                </div>

                <Separator />

                {/* Formulaire */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Biographie</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    placeholder="Parlez-nous de vous..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Informations SGDF */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Informations SGDF
                </CardTitle>
                <CardDescription>Vos informations liées à votre structure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="structure">Structure</Label>
                    <Select disabled={!isEditing} value={formData.structure}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Groupe Saint-Michel - Paris 15e">Groupe Saint-Michel - Paris 15e</SelectItem>
                        <SelectItem value="Groupe Sainte-Thérèse - Lyon 3e">Groupe Sainte-Thérèse - Lyon 3e</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="territory">Territoire</Label>
                    <Input id="territory" value={formData.territory} disabled className="bg-gray-50" />
                  </div>
                  <div>
                    <Label htmlFor="role">Rôle</Label>
                    <Select disabled={!isEditing} value={formData.role}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Chef de groupe">Chef de groupe</SelectItem>
                        <SelectItem value="Responsable d'unité">Responsable d'unité</SelectItem>
                        <SelectItem value="Animateur">Animateur</SelectItem>
                        <SelectItem value="Parent">Parent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Préférences de notification */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                </CardTitle>
                <CardDescription>Gérez vos préférences de notification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifications par email</p>
                      <p className="text-sm text-gray-500">Recevoir les notifications importantes par email</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.notifications.email}
                      disabled={!isEditing}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Nouveaux projets</p>
                      <p className="text-sm text-gray-500">Être notifié des nouveaux projets de ma structure</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.notifications.projects}
                      disabled={!isEditing}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dons et contributions</p>
                      <p className="text-sm text-gray-500">Notifications sur l'état de mes contributions</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.notifications.donations}
                      disabled={!isEditing}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistiques */}
            <Card>
              <CardHeader>
                <CardTitle>Mes statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Projets créés</span>
                  <span className="font-semibold">{userStats.projectsCreated}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Projets soutenus</span>
                  <span className="font-semibold">{userStats.projectsSupported}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total des dons</span>
                  <span className="font-semibold">{userStats.totalDonations}€</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Crédit disponible</span>
                  <span className="font-semibold text-green-600">{userStats.creditAvailable}€</span>
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/create-project">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Créer un projet
                  </Button>
                </Link>
                <Link href="/my-contributions">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Mes contributions
                  </Button>
                </Link>
                <Link href="/favorites">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Mes favoris
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Sécurité */}
            <Card>
              <CardHeader>
                <CardTitle>Sécurité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  Changer le mot de passe
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                >
                  Supprimer le compte
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
