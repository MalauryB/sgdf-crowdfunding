"use client"

import { useState } from "react"
import { SGDFLogo } from "@/components/sgdf-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload, CalendarIcon, AlertCircle, CheckCircle, Info, Clock, User, FileText } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

const projectTypes = [
  { value: "investment", label: "Investissement", description: "Achat de matériel, construction, rénovation..." },
  { value: "activity", label: "Activité", description: "Camp, sortie, formation, projet solidaire..." },
]

const categories = [
  "Éducation et formation",
  "Solidarité internationale",
  "Environnement et nature",
  "Citoyenneté et engagement",
  "Spiritualité et intériorité",
  "Vie de groupe",
  "Matériel et équipement",
]

const branches = [
  { value: "farfadets", label: "Farfadets", color: "bg-green-100 text-green-800" },
  { value: "louveteaux", label: "Louveteaux et Jeannettes", color: "bg-orange-100 text-orange-800" },
  { value: "scouts", label: "Scouts et Guides", color: "bg-blue-100 text-blue-800" },
  { value: "pionniers", label: "Pionniers et Caravelles", color: "bg-red-100 text-red-800" },
  { value: "compagnons", label: "Compagnons", color: "bg-emerald-100 text-emerald-800" },
  { value: "multi", label: "Multi-branches", color: "bg-purple-100 text-purple-800" },
]

const projectStates = {
  DRAFT: "Brouillon",
  PENDING_VALIDATION: "En attente de validation",
  VALIDATED: "Validé",
  REFUSED: "Refusé",
}

const validationRules = {
  draft: {
    title: "RV-P-E-01 : Le projet doit contenir un titre",
    description: "RV-P-E-02 : Le projet doit contenir une description",
    projectType: "RV-P-E-03 : Le projet doit indiquer un type de projet",
  },
  council: {
    budget: "Le budget total doit être renseigné",
    budgetFile: "La pièce jointe Budget doit être fournie",
    category: "La catégorie du Plan d'Orientation doit être renseignée",
    deadline: "La date limite doit être fixée",
    deadlineActivity: "Si projet = activité → fin avant le 31/08 de l'exercice",
    targetAmount: "Le montant recherché doit être > 0",
    targetAmountActivity: "Le montant recherché ne peut dépasser 50% du budget (projet d'activité)",
    targetAmountInvestment: "Le montant recherché ne peut dépasser 70% du budget (projet d'investissement)",
  },
  validation: {
    validationDoc: "Le document de validation du Conseil doit être téléversé",
  },
  warnings: {
    investmentFHP: "⚠️ Budget ≥ 5 000 € : ce projet d'investissement nécessitera la validation par la commission FHP",
    activitySupport: "⚠️ Budget ≥ 5 000 € : ce projet d'activité nécessitera la validation par votre échelon de soutien",
  },
}

export default function CreateProjectPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectType: "",
    category: "",
    branch: "",
    targetAmount: "",
    totalBudget: "",
    deadline: null as Date | null,
    location: "",
    structure: "Groupe de Dinan",
    images: [] as File[],
    budget: null as File | null,
    validation: null as File | null,
    state: "DRAFT",
    createdBy: "Jean Dupont",
    createdAt: new Date(),
    modifiedAt: new Date(),
    submittedAt: null as Date | null,
    history: [] as Array<{ date: Date; user: string; action: string }>,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [warnings, setWarnings] = useState<Record<string, string>>({})

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}
    const newWarnings: Record<string, string> = {}

    if (step === 1) {
      if (!formData.title) newErrors.title = validationRules.draft.title
      if (!formData.description) newErrors.description = validationRules.draft.description
      if (!formData.projectType) newErrors.projectType = validationRules.draft.projectType
    }

    if (step === 2) {
      if (!formData.targetAmount) newErrors.targetAmount = validationRules.council.targetAmount
      if (!formData.totalBudget) newErrors.totalBudget = validationRules.council.budget
      if (!formData.deadline) newErrors.deadline = validationRules.council.deadline
      if (!formData.category) newErrors.category = validationRules.council.category

      if (formData.projectType === "activity" && formData.deadline) {
        const august31 = new Date(formData.deadline.getFullYear(), 7, 31)
        if (formData.deadline > august31) {
          newErrors.deadline = validationRules.council.deadlineActivity
        }
      }

      if (formData.targetAmount && formData.totalBudget) {
        const targetPercent = (Number.parseFloat(formData.targetAmount) / Number.parseFloat(formData.totalBudget)) * 100
        if (formData.projectType === "activity" && targetPercent > 50) {
          newErrors.targetAmount = validationRules.council.targetAmountActivity
        }
        if (formData.projectType === "investment" && targetPercent > 70) {
          newErrors.targetAmount = validationRules.council.targetAmountInvestment
        }
      }

      if (formData.totalBudget && Number.parseFloat(formData.totalBudget) >= 5000) {
        if (formData.projectType === "investment") {
          newWarnings.budget = validationRules.warnings.investmentFHP
        }
        if (formData.projectType === "activity") {
          newWarnings.budget = validationRules.warnings.activitySupport
        }
      }
    }

    if (step === 3) {
      if (!formData.budget) newErrors.budget = validationRules.council.budgetFile
    }

    if (step === 4) {
      if (!formData.validation) newErrors.validation = validationRules.validation.validationDoc
    }

    setErrors(newErrors)
    setWarnings(newWarnings)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      modifiedAt: new Date(),
      history: [
        ...prev.history,
        {
          date: new Date(),
          user: prev.createdBy,
          action: `Modification du champ ${field}`,
        },
      ],
    }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
    if (warnings[field]) {
      setWarnings((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const saveDraft = () => {
    console.log("[v0] Saving draft project:", formData)
    alert("Brouillon sauvegardé avec succès !")
  }

  const submitForValidation = () => {
    if (validateStep(4)) {
      setFormData((prev) => ({
        ...prev,
        state: "PENDING_VALIDATION",
        submittedAt: new Date(),
        history: [
          ...prev.history,
          {
            date: new Date(),
            user: prev.createdBy,
            action: "Soumission pour validation du conseil",
          },
        ],
      }))
      console.log("[v0] Submitting project for validation:", formData)
      alert(
        "Projet soumis pour validation ! Il sera examiné par votre structure puis par les échelons supérieurs si nécessaire.",
      )
    }
  }

  const steps = [
    { number: 1, title: "Informations générales", description: "Titre, description et type" },
    { number: 2, title: "Détails du projet", description: "Budget, échéance et catégorie" },
    { number: 3, title: "Documents", description: "Budget détaillé et validation" },
    { number: 4, title: "Validation", description: "Vérification et soumission" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <SGDFLogo size="md" />
            </div>

            <div className="flex items-center gap-2">
              <Badge
                variant={
                  formData.state === "DRAFT"
                    ? "outline"
                    : formData.state === "PENDING_VALIDATION"
                      ? "default"
                      : formData.state === "VALIDATED"
                        ? "secondary"
                        : "destructive"
                }
              >
                {projectStates[formData.state as keyof typeof projectStates]}
              </Badge>
              <Button variant="outline" size="sm" onClick={saveDraft}>
                Sauvegarder
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    Créé par {formData.createdBy}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {format(formData.createdAt, "PPP à HH:mm", { locale: fr })}
                  </div>
                  {formData.modifiedAt > formData.createdAt && (
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      Modifié le {format(formData.modifiedAt, "PPP à HH:mm", { locale: fr })}
                    </div>
                  )}
                </div>
                <div className="text-primary font-medium">Structure: {formData.structure}</div>
              </div>
            </CardContent>
          </Card>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      currentStep >= step.number
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-muted-foreground text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.number ? <CheckCircle className="w-5 h-5" /> : step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-24 h-0.5 mx-4 ${currentStep > step.number ? "bg-primary" : "bg-muted"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h1 className="font-display text-2xl font-bold text-primary mb-2">{steps[currentStep - 1].title}</h1>
              <p className="text-muted-foreground">{steps[currentStep - 1].description}</p>
            </div>
          </div>

          {Object.keys(warnings).length > 0 && (
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {Object.values(warnings).map((warning, index) => (
                  <div key={index}>{warning}</div>
                ))}
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardContent className="p-8">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre du projet *</Label>
                    <Input
                      id="title"
                      placeholder="Ex: Nouveau local pour le groupe de Dinan"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className={errors.title ? "border-destructive" : ""}
                    />
                    {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description du projet *</Label>
                    <Textarea
                      id="description"
                      placeholder="Décrivez votre projet, ses objectifs et son impact..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className={errors.description ? "border-destructive" : ""}
                    />
                    {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Type de projet *</Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) => handleInputChange("projectType", value)}
                      >
                        <SelectTrigger className={errors.projectType ? "border-destructive" : ""}>
                          <SelectValue placeholder="Sélectionner un type" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div>
                                <div className="font-medium">{type.label}</div>
                                <div className="text-sm text-muted-foreground">{type.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.projectType && <p className="text-sm text-destructive">{errors.projectType}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>Branche concernée</Label>
                      <Select value={formData.branch} onValueChange={(value) => handleInputChange("branch", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une branche" />
                        </SelectTrigger>
                        <SelectContent>
                          {branches.map((branch) => (
                            <SelectItem key={branch.value} value={branch.value}>
                              <div className="flex items-center gap-2">
                                <Badge className={branch.color} variant="secondary">
                                  {branch.label}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Localisation</Label>
                    <Input
                      id="location"
                      placeholder="Ex: Dinan, Bretagne"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="totalBudget">Budget total du projet (€) *</Label>
                      <Input
                        id="totalBudget"
                        type="number"
                        placeholder="Ex: 50000"
                        value={formData.totalBudget}
                        onChange={(e) => handleInputChange("totalBudget", e.target.value)}
                        className={errors.totalBudget ? "border-destructive" : ""}
                      />
                      {errors.totalBudget && <p className="text-sm text-destructive">{errors.totalBudget}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="targetAmount">Montant recherché (€) *</Label>
                      <Input
                        id="targetAmount"
                        type="number"
                        placeholder="Ex: 25000"
                        value={formData.targetAmount}
                        onChange={(e) => handleInputChange("targetAmount", e.target.value)}
                        className={errors.targetAmount ? "border-destructive" : ""}
                      />
                      {errors.targetAmount && <p className="text-sm text-destructive">{errors.targetAmount}</p>}
                      {formData.targetAmount && formData.totalBudget && (
                        <p className="text-sm text-muted-foreground">
                          {(
                            (Number.parseFloat(formData.targetAmount) / Number.parseFloat(formData.totalBudget)) *
                            100
                          ).toFixed(1)}
                          % du budget total
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Date limite *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left font-normal ${
                            !formData.deadline ? "text-muted-foreground" : ""
                          } ${errors.deadline ? "border-destructive" : ""}`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.deadline
                            ? format(formData.deadline, "PPP", { locale: fr })
                            : "Sélectionner une date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.deadline || undefined}
                          onSelect={(date) => handleInputChange("deadline", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.deadline && <p className="text-sm text-destructive">{errors.deadline}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Catégorie du Plan d'Orientation *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
                  </div>

                  {formData.projectType && (
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        {formData.projectType === "investment"
                          ? "Pour un projet d'investissement, vous pouvez demander jusqu'à 70% du budget total."
                          : "Pour un projet d'activité, vous pouvez demander jusqu'à 50% du budget total et la date limite ne peut pas dépasser le 31 août."}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Images du projet</Label>
                      <div className="mt-2 border-2 border-dashed border-muted rounded-lg p-6 text-center">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Glissez-déposez vos images ici ou cliquez pour sélectionner
                        </p>
                        <Button variant="outline" size="sm">
                          Choisir des fichiers
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label>Budget détaillé *</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Téléchargez un document détaillant le budget de votre projet
                      </p>
                      <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
                        <Button variant="outline" size="sm" onClick={() => handleInputChange("budget", "mock-file")}>
                          <Upload className="w-4 h-4 mr-2" />
                          Télécharger le budget
                        </Button>
                        {formData.budget && <p className="text-sm text-green-600 mt-2">✓ Budget téléchargé</p>}
                      </div>
                      {errors.budget && <p className="text-sm text-destructive">{errors.budget}</p>}
                    </div>

                    <div>
                      <Label>Validation du Conseil *</Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Document de validation du conseil de votre structure
                      </p>
                      <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleInputChange("validation", "mock-validation")}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Télécharger la validation
                        </Button>
                        {formData.validation && <p className="text-sm text-green-600 mt-2">✓ Validation téléchargée</p>}
                      </div>
                      {errors.validation && <p className="text-sm text-destructive">{errors.validation}</p>}
                    </div>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Tous les documents sont obligatoires pour pouvoir soumettre votre projet à validation.
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-muted/50 rounded-lg p-6">
                    <h3 className="font-display text-xl font-bold text-primary mb-4">Récapitulatif de votre projet</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Titre:</span> {formData.title || "Non renseigné"}
                      </div>
                      <div>
                        <span className="font-medium">Type:</span>{" "}
                        {projectTypes.find((t) => t.value === formData.projectType)?.label || "Non renseigné"}
                      </div>
                      <div>
                        <span className="font-medium">Budget total:</span>{" "}
                        {formData.totalBudget ? `${formData.totalBudget} €` : "Non renseigné"}
                      </div>
                      <div>
                        <span className="font-medium">Montant recherché:</span>{" "}
                        {formData.targetAmount ? `${formData.targetAmount} €` : "Non renseigné"}
                      </div>
                      <div>
                        <span className="font-medium">Date limite:</span>{" "}
                        {formData.deadline ? format(formData.deadline, "PPP", { locale: fr }) : "Non renseignée"}
                      </div>
                      <div>
                        <span className="font-medium">Catégorie:</span> {formData.category || "Non renseignée"}
                      </div>
                      <div>
                        <span className="font-medium">Localisation:</span> {formData.location || "Non renseignée"}
                      </div>
                      <div>
                        <span className="font-medium">Structure:</span> {formData.structure}
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Parcours de validation</h4>
                    <div className="text-sm text-blue-800 space-y-1">
                      <div>1. Validation par votre structure (conseil de groupe/territorial)</div>
                      {formData.totalBudget && Number.parseFloat(formData.totalBudget) >= 5000 && (
                        <div>
                          2. Validation par{" "}
                          {formData.projectType === "investment" ? "la commission FHP" : "votre échelon de soutien"}
                        </div>
                      )}
                      <div>
                        {formData.totalBudget && Number.parseFloat(formData.totalBudget) >= 5000 ? "3" : "2"}.
                        Publication sur la plateforme
                      </div>
                    </div>
                  </div>

                  {formData.history.length > 0 && (
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-medium text-sm mb-2">Historique des modifications</h4>
                      <div className="space-y-1 text-xs text-muted-foreground max-h-32 overflow-y-auto">
                        {formData.history.slice(-5).map((entry, index) => (
                          <div key={index} className="flex justify-between">
                            <span>{entry.action}</span>
                            <span>{format(entry.date, "dd/MM/yyyy HH:mm")}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="text-sm leading-relaxed">
                        Je certifie que ce projet a été validé en conseil de ma structure et que toutes les informations
                        fournies sont exactes.
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox id="gdpr" />
                      <Label htmlFor="gdpr" className="text-sm leading-relaxed">
                        J'accepte que mes données personnelles soient traitées conformément à la politique de
                        confidentialité des SGDF.
                      </Label>
                    </div>
                  </div>

                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Une fois soumis, votre projet suivra le parcours de validation hiérarchique : validation par votre
                      structure, puis par les échelons supérieurs si nécessaire, avant d'être publié sur la plateforme.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
              disabled={currentStep === 1}
            >
              Précédent
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" onClick={saveDraft}>
                Sauvegarder le brouillon
              </Button>

              {currentStep < 4 ? (
                <Button
                  onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 4))}
                  className="bg-primary hover:bg-primary/90"
                >
                  Suivant
                </Button>
              ) : (
                <Button onClick={submitForValidation} className="bg-primary hover:bg-primary/90">
                  Soumettre le projet
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
