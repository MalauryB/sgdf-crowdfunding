import { getImagePath, getProjectMainImage, getProjectImages } from "./utils"

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  image: string
  slug: string
  category: string
  location: string
  targetAmount: number
  currentAmount: number
  goal?: number
  raised?: number
  daysLeft: number
  supportersCount: number
  contributors?: number
  branch: string
  organizer?: string
  dateCreated?: string
  isPublic?: boolean
  images?: string[]
  updates?: Array<{
    id: number
    date: string
    title: string
    content: string
    author: string
    avatar: string
  }>
  documents?: Array<{
    name: string
    type: string
    size: string
  }>
  comments?: Array<{
    id: number
    author: string
    avatar: string
    date: string
    content: string
    replies?: Array<{
      id: number
      author: string
      avatar: string
      date: string
      content: string
    }>
  }>
}

// Base de données centralisée des projets
export const PROJECTS_DATABASE: Project[] = [
  {
    id: "1",
    title: "Rénovation du local scout de Toulouse",
    description: "Nos Pionniers-Caravelles rénovent entièrement notre local : peinture, électricité et aménagement d'une salle d'activités.",
    longDescription: `
      <h3>Contexte du projet</h3>
      <p>Notre local scout de Toulouse nécessite une rénovation complète pour offrir un espace d'accueil optimal à nos 45 jeunes.</p>

      <h3>Travaux prévus</h3>
      <ul>
        <li>Réfection complète de la peinture des salles d'activités</li>
        <li>Remise aux normes de l'installation électrique</li>
        <li>Aménagement d'une nouvelle salle polyvalente</li>
        <li>Rénovation des sanitaires</li>
        <li>Installation d'un nouveau système de chauffage</li>
      </ul>

      <h3>Impact sur nos jeunes</h3>
      <ul>
        <li>Amélioration des conditions d'accueil</li>
        <li>Espaces plus fonctionnels pour les activités</li>
        <li>Local aux normes de sécurité</li>
        <li>Fierté d'appartenir à un groupe bien équipé</li>
      </ul>
    `,
    image: getImagePath(getProjectMainImage("renovation-local-toulouse")),
    slug: "renovation-local-toulouse",
    category: "Investissement",
    location: "Toulouse, Haute-Garonne",
    targetAmount: 8500,
    currentAmount: 7650,
    daysLeft: 42,
    supportersCount: 28,
    branch: "pionniers",
    organizer: "Groupe Scout Toulouse Sud",
    dateCreated: "2024-11-15",
    isPublic: true,
    images: getProjectImages("renovation-local-toulouse", 4),
    updates: [
      {
        id: 1,
        date: "2024-12-20",
        title: "Devis validé par l'équipe",
        content: "Excellente nouvelle ! Nous avons validé le devis avec notre artisan local. Les travaux commenceront dès que l'objectif sera atteint.",
        author: "Pierre Dubois",
        avatar: "/abstract-profile.png"
      }
    ],
    documents: [
      { name: "Devis travaux complet", type: "pdf", size: "324 Ko" },
      { name: "Plan du local rénové", type: "pdf", size: "156 Ko" }
    ],
    comments: []
  },
  {
    id: "4",
    title: "Équipement nautique pour les marins",
    description: "Achat de kayaks et matériel de sécurité pour les activités nautiques de notre groupe marin bordelais.",
    longDescription: `
      <h3>Notre projet nautique</h3>
      <p>Notre groupe marin souhaite développer les activités nautiques avec un équipement moderne et sécurisé.</p>

      <h3>Matériel prévu</h3>
      <ul>
        <li>6 kayaks biplace tout niveau</li>
        <li>Gilets de sauvetage aux normes</li>
        <li>Pagaies de rechange</li>
        <li>Kit de réparation et maintenance</li>
        <li>Remorque de transport</li>
      </ul>
    `,
    image: getImagePath(getProjectMainImage("materiel-nautique-carnac")),
    slug: "materiel-nautique-carnac",
    category: "Investissement",
    location: "Carnac, Morbihan",
    targetAmount: 5200,
    currentAmount: 1560,
    daysLeft: 55,
    supportersCount: 8,
    branch: "marins",
    organizer: "Groupe Scout Carnac",
    dateCreated: "2024-11-05",
    isPublic: true,
    images: getProjectImages("materiel-nautique-carnac", 4),
    updates: [],
    documents: [],
    comments: []
  },
  {
    id: "2",
    title: "Achat d'un minibus pour le groupe",
    description: "Acquisition d'un véhicule 9 places pour faciliter les déplacements lors des sorties et week-ends scouts en région parisienne.",
    longDescription: `
      <h3>Pourquoi un minibus ?</h3>
      <p>Notre groupe parisien organise de nombreuses sorties et camps. Un minibus faciliterait grandement nos déplacements collectifs.</p>

      <h3>Utilisation prévue</h3>
      <ul>
        <li>Sorties hebdomadaires en forêt de Vincennes</li>
        <li>Week-ends découverte en région parisienne</li>
        <li>Transport pour les camps d'été</li>
        <li>Activités inter-groupes</li>
      </ul>
    `,
    image: getImagePath(getProjectMainImage("minibus-groupe")),
    slug: "minibus-groupe",
    category: "Investissement",
    location: "Créteil, Val-de-Marne",
    targetAmount: 18000,
    currentAmount: 14400,
    daysLeft: 68,
    supportersCount: 22,
    branch: "scouts",
    organizer: "Groupe Scout Créteil",
    dateCreated: "2024-10-20",
    isPublic: true,
    images: getProjectImages("minibus-groupe", 4),
    updates: [],
    documents: [],
    comments: []
  },
  {
    id: "3",
    title: "Matériel de camping pour la troupe",
    description: "Renouvellement des tentes, réchauds et matériel de cuisine pour les camps scouts en Bretagne.",
    longDescription: `
      <h3>Renouvellement nécessaire</h3>
      <p>Notre matériel de camping date de plus de 10 ans et nécessite un renouvellement complet pour la sécurité de nos scouts.</p>

      <h3>Matériel à acheter</h3>
      <ul>
        <li>8 tentes 4 places tout temps</li>
        <li>Réchauds et ustensiles de cuisine</li>
        <li>Matériel de sécurité et premiers secours</li>
        <li>Équipement de randonnée</li>
      </ul>
    `,
    image: getImagePath(getProjectMainImage("materiel-camping-troupe")),
    slug: "materiel-camping-troupe",
    category: "Investissement",
    location: "Rennes, Ille-et-Vilaine",
    targetAmount: 2800,
    currentAmount: 2100,
    daysLeft: 28,
    supportersCount: 12,
    branch: "scouts",
    organizer: "Troupe Scout Rennes",
    dateCreated: "2024-12-01",
    isPublic: true,
    images: getProjectImages("materiel-camping-troupe", 4),
    updates: [],
    documents: [],
    comments: []
  },
  {
    id: "7",
    title: "Camp d'été Louveteaux-Jeannettes en Ardèche",
    description: "Financement du camp d'été de notre meute et compagnie pour 8 jours dans les gorges de l'Ardèche avec canoë et grands jeux nature.",
    longDescription: `
      <h3>Un camp inoubliable</h3>
      <p>Nos Louveteaux et Jeannettes partiront 8 jours découvrir les merveilles de l'Ardèche dans un cadre naturel exceptionnel.</p>

      <h3>Programme du camp</h3>
      <ul>
        <li>Descente des gorges de l'Ardèche en canoë</li>
        <li>Grands jeux sur le thème des Indiens d'Amérique</li>
        <li>Veillées et feux de camp</li>
        <li>Découverte de la spéléologie</li>
        <li>Ateliers nature et environnement</li>
      </ul>
    `,
    image: getImagePath(getProjectMainImage("camp-ete-ardeche")),
    slug: "camp-ete-ardeche",
    category: "Activité",
    location: "Vallon-Pont-d'Arc, Ardèche",
    targetAmount: 4500,
    currentAmount: 3200,
    daysLeft: 35,
    supportersCount: 18,
    branch: "louveteaux",
    organizer: "Meute et Compagnie Lyon",
    dateCreated: "2024-11-10",
    isPublic: true,
    images: getProjectImages("camp-ete-ardeche", 4),
    updates: [
      {
        id: 1,
        date: "2024-12-18",
        title: "Réservation du centre confirmée",
        content: "Super nouvelle ! Nous avons confirmé notre réservation au centre d'hébergement. Les 24 jeunes seront parfaitement accueillis.",
        author: "Marie Dupont",
        avatar: "/abstract-profile.png"
      }
    ],
    documents: [
      { name: "Programme détaillé", type: "pdf", size: "245 Ko" },
      { name: "Autorisation parentale", type: "pdf", size: "89 Ko" }
    ],
    comments: []
  }
]

export function getProjectById(id: string): Project | null {
  return PROJECTS_DATABASE.find(project => project.id === id) || null
}

export function getProjectBySlug(slug: string): Project | null {
  return PROJECTS_DATABASE.find(project => project.slug === slug) || null
}

export function getAllProjects(): Project[] {
  return PROJECTS_DATABASE
}