"use client"

import { SGDFLogo } from "@/components/sgdf-logo"
import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Search, Filter, Heart, TrendingUp, Clock, User, LogOut, Settings } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const investmentProjectsAdvanced = [
  {
    id: "1",
    title: "Rénovation du local scout de Toulouse",
    description:
      "Nos Pionniers-Caravelles rénovent entièrement notre local : peinture, électricité et aménagement d'une salle d'activités.",
    image: "/africa-school-construction-solidarity.jpg",
    category: "Investissement",
    location: "Toulouse, Haute-Garonne",
    targetAmount: 8500,
    currentAmount: 7650, // 90% financé
    daysLeft: 42,
    supportersCount: 28,
    branch: "pionniers" as const,
  },
  {
    id: "2",
    title: "Achat d'un minibus pour le groupe",
    description:
      "Acquisition d'un véhicule 9 places pour faciliter les déplacements lors des sorties et week-ends scouts en région parisienne.",
    image: "/kayak-nautical-equipment-scouts.jpg",
    category: "Investissement",
    location: "Créteil, Val-de-Marne",
    targetAmount: 18000,
    currentAmount: 14400, // 80% financé
    daysLeft: 68,
    supportersCount: 22,
    branch: "scouts" as const,
  },
  {
    id: "3",
    title: "Matériel de camping pour la troupe",
    description: "Renouvellement des tentes, réchauds et matériel de cuisine pour les camps scouts en Bretagne.",
    image: "/placeholder-o6mhg.png",
    category: "Investissement",
    location: "Rennes, Ille-et-Vilaine",
    targetAmount: 2800,
    currentAmount: 2100, // 75% financé
    daysLeft: 28,
    supportersCount: 12,
    branch: "scouts" as const,
  },
]

const investmentProjectsRecent = [
  {
    id: "4",
    title: "Équipement nautique pour les marins",
    description:
      "Achat de kayaks et matériel de sécurité pour les activités nautiques de notre groupe marin bordelais.",
    image: "/mountain-chalet-renovation-scouts.jpg",
    category: "Investissement",
    location: "Bordeaux, Gironde",
    targetAmount: 5200,
    currentAmount: 1560,
    daysLeft: 55,
    supportersCount: 8,
    branch: "marins" as const,
  },
  {
    id: "5",
    title: "Rénovation du chalet de montagne",
    description:
      "Travaux d'isolation et de chauffage de notre chalet dans les Alpes pour accueillir les camps d'hiver.",
    image: "/placeholder-zuaqc.png",
    category: "Investissement",
    location: "Chamonix, Haute-Savoie",
    targetAmount: 12000,
    currentAmount: 2400,
    daysLeft: 90,
    supportersCount: 15,
    branch: "scouts" as const,
  },
  {
    id: "6",
    title: "Sono et matériel audiovisuel",
    description: "Équipement pour les spectacles et veillées de notre groupe parisien.",
    image: "/scout-building-construction.jpg",
    category: "Investissement",
    location: "Paris 15e, Paris",
    targetAmount: 3500,
    currentAmount: 700,
    daysLeft: 35,
    supportersCount: 6,
    branch: "pionniers" as const,
  },
]

const activityProjects = [
  {
    id: "7",
    title: "Camp d'été Louveteaux-Jeannettes en Ardèche",
    description:
      "Financement du camp d'été de notre meute et compagnie pour 8 jours dans les gorges de l'Ardèche avec canoë et grands jeux nature.",
    image: "/scout-building-construction.jpg",
    category: "Activité",
    location: "Vallon-Pont-d'Arc, Ardèche",
    targetAmount: 4500,
    currentAmount: 3200,
    daysLeft: 35,
    supportersCount: 18,
    branch: "louveteaux" as const,
  },
  {
    id: "8",
    title: "Formation BAFA pour nos chefs",
    description: "Financement de la formation BAFA pour 6 nouveaux chefs et cheftaines du groupe lyonnais.",
    image: "/placeholder-zuaqc.png",
    category: "Formation",
    location: "Lyon, Rhône",
    targetAmount: 3600,
    currentAmount: 2100,
    daysLeft: 21,
    supportersCount: 15,
    branch: "compagnons" as const,
  },
  {
    id: "9",
    title: "Jardin pédagogique pour les Farfadets",
    description:
      "Création d'un potager éducatif dans notre jardin alsacien pour sensibiliser nos plus jeunes à l'écologie.",
    image: "/mountain-chalet-renovation-scouts.jpg",
    category: "Activité",
    location: "Strasbourg, Bas-Rhin",
    targetAmount: 1500,
    currentAmount: 890,
    daysLeft: 45,
    supportersCount: 9,
    branch: "farfadets" as const,
  },
  {
    id: "10",
    title: "Week-end découverte nature",
    description: "Sortie éducative en forêt de Fontainebleau pour nos scouts et guides franciliens.",
    image: "/placeholder-o6mhg.png",
    category: "Activité",
    location: "Fontainebleau, Seine-et-Marne",
    targetAmount: 800,
    currentAmount: 320,
    daysLeft: 18,
    supportersCount: 7,
    branch: "scouts" as const,
  },
]

const myStructureProjects = [
  {
    id: "11",
    title: "Camp d'été de notre groupe",
    description: "Financement du camp d'été 2025 de notre groupe local avec activités nature et grands jeux.",
    image: "/scout-building-construction.jpg",
    category: "Investissement",
    location: "Ma structure locale",
    targetAmount: 6500,
    currentAmount: 4200,
    daysLeft: 45,
    supportersCount: 24,
    branch: "scouts" as const,
  },
]

const parentStructureProjects = [
  {
    id: "12",
    title: "Formation territoriale des chefs",
    description: "Programme de formation continue pour les responsables de notre territoire.",
    image: "/placeholder-zuaqc.png",
    category: "Formation",
    location: "Territoire de rattachement",
    targetAmount: 4200,
    currentAmount: 1800,
    daysLeft: 60,
    supportersCount: 12,
    branch: "compagnons" as const,
  },
]

const nationalProjects = [
  {
    id: "13",
    title: "Jamboree Scout Mondial 2027",
    description: "Participation de la délégation française au Jamboree Scout Mondial en Pologne.",
    image: "/mountain-chalet-renovation-scouts.jpg",
    category: "Investissement",
    location: "National - International",
    targetAmount: 25000,
    currentAmount: 8500,
    daysLeft: 120,
    supportersCount: 45,
    branch: "scouts" as const,
  },
]

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const currentUser = {
    firstName: "Marie",
    lastName: "Dupont",
    email: "marie.dupont@sgdf.fr",
    avatar: "/abstract-profile.png",
    structure: "Groupe Saint-Michel - Paris 15e",
  }

  const getRandomProjects = (projects: any[], count: number) => {
    const shuffled = [...projects].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  const getProjectsToDisplay = () => {
    if (!isLoggedIn) {
      // Utilisateur non connecté
      return {
        section1: {
          title: "Projets d'investissement les plus avancés",
          subtitle: "Bientôt financés, ils ont besoin de votre dernier coup de pouce",
          badge: { icon: TrendingUp, text: "Presque financés" },
          projects: investmentProjectsAdvanced,
        },
        section2: {
          title: "Nouveaux projets d'investissement",
          subtitle: "Les derniers projets d'équipement de notre communauté",
          badge: { icon: Clock, text: "Récents" },
          projects: investmentProjectsRecent,
        },
        section3: {
          title: "Projets d'activité",
          subtitle: "Découvrez les activités scoutes à soutenir",
          badge: { icon: Heart, text: "Activités" },
          projects: getRandomProjects(activityProjects, 3),
        },
      }
    } else {
      // Utilisateur connecté
      const randomActivities = getRandomProjects(activityProjects, 2)
      return {
        section1: {
          title: "Projets de ma structure",
          subtitle: "Les projets de votre groupe local",
          badge: { icon: User, text: "Ma structure" },
          projects: myStructureProjects,
        },
        section2: {
          title: "Projets de mon territoire",
          subtitle: "Les projets de votre structure de rattachement",
          badge: { icon: TrendingUp, text: "Mon territoire" },
          projects: [...parentStructureProjects, ...nationalProjects],
        },
        section3: {
          title: "Activités à découvrir",
          subtitle: "Quelques projets d'activité qui pourraient vous intéresser",
          badge: { icon: Heart, text: "Suggestions" },
          projects: randomActivities,
        },
      }
    }
  }

  const { section1, section2, section3 } = getProjectsToDisplay()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <SGDFLogo size="md" />
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/projects" className="text-foreground hover:text-primary font-medium">
                Projets
              </Link>
              {isLoggedIn && (
                <>
                  <Link href="/my-projects" className="text-foreground hover:text-primary font-medium">
                    Mes projets
                  </Link>
                  <Link href="/my-contributions" className="text-foreground hover:text-primary font-medium">
                    Mes contributions
                  </Link>
                </>
              )}
            </nav>

            <div className="flex items-center gap-3">
              {!isLoggedIn ? (
                <Button variant="ghost" size="sm" onClick={() => setIsLoggedIn(true)} className="text-xs">
                  Se connecter
                </Button>
              ) : (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/favorites">
                      <Heart className="w-4 h-4 mr-2" />
                      Favoris
                    </Link>
                  </Button>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" className="flex items-center gap-3 px-3 py-2 h-auto">
                        <Avatar className="w-8 h-8">
                          <AvatarImage
                            src={currentUser.avatar || "/placeholder.svg"}
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
                              src={currentUser.avatar || "/placeholder.svg"}
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
                            <Link href="/account">
                              <Settings className="w-4 h-4 mr-3" />
                              Mon compte
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => setIsLoggedIn(false)}
                          >
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
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary mb-6">
            Ensemble, libérons nos énergies
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {isLoggedIn
              ? "Découvrez les projets de votre communauté et soutenez ceux qui vous tiennent à cœur."
              : "Soutenez les projets qui font grandir notre mouvement et construisent l'avenir de nos jeunes."}
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Rechercher un projet..." className="pl-10 h-12" />
              </div>
              <Button size="lg" variant="outline" asChild>
                <Link href="/projects">
                  <Filter className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">127</div>
              <div className="text-muted-foreground">Projets financés</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">€ 245k</div>
              <div className="text-muted-foreground">Montant collecté</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">1,250</div>
              <div className="text-muted-foreground">Contributeurs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl font-bold text-primary mb-2">{section1.title}</h2>
              <p className="text-muted-foreground">{section1.subtitle}</p>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1">
              <section1.badge.icon className="w-4 h-4" />
              {section1.badge.text}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section1.projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl font-bold text-primary mb-2">{section2.title}</h2>
              <p className="text-muted-foreground">{section2.subtitle}</p>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <section2.badge.icon className="w-4 h-4" />
              {section2.badge.text}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section2.projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl font-bold text-primary mb-2">{section3.title}</h2>
              <p className="text-muted-foreground">{section3.subtitle}</p>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1">
              <section3.badge.icon className="w-4 h-4" />
              {section3.badge.text}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section3.projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/projects">Voir tous les projets</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <SGDFLogo size="sm" className="mb-4 [&_*]:text-primary-foreground" />
              <p className="text-sm opacity-90">
                Mouvement de jeunesse et d'éducation populaire catholique ouvert à tous.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Projets</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>
                  <Link href="/projects" className="hover:opacity-100">
                    Découvrir
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
              <h3 className="font-semibold mb-4">Aide</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>
                  <a href="#" className="hover:opacity-100">
                    Comment ça marche
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
              <h3 className="font-semibold mb-4">Légal</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li>
                  <a href="#" className="hover:opacity-100">
                    Conditions d'utilisation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    Politique de confidentialité
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100">
                    RGPD
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
