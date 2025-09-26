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
  },
  {
    id: "5",
    title: "Rénovation du chalet de montagne",
    description: "Travaux d'isolation et de chauffage de notre chalet dans les Alpes pour accueillir les camps d'hiver.",
    longDescription: `
      <h3>Rénovation du chalet scout</h3>
      <p>Notre chalet dans les Alpes nécessite des travaux urgents d'isolation et de chauffage pour continuer à accueillir nos camps d'hiver en toute sécurité.</p>

      <h3>Travaux prévus</h3>
      <ul>
        <li>Isolation des murs et de la toiture</li>
        <li>Remplacement du système de chauffage</li>
        <li>Réfection de l'électricité</li>
        <li>Amélioration de la ventilation</li>
        <li>Mise aux normes sécurité</li>
      </ul>
    `,
    image: getImagePath(getProjectMainImage("renovation-chalet-montagne")),
    slug: "renovation-chalet-montagne",
    category: "Investissement",
    location: "Chamonix, Haute-Savoie",
    targetAmount: 12000,
    currentAmount: 2400,
    goal: 12000,
    raised: 2400,
    daysLeft: 90,
    supportersCount: 15,
    contributors: 15,
    branch: "Scouts",
    organizer: "Groupe Scout Chamonix",
    dateCreated: "2024-01-30",
    isPublic: true,
    images: getProjectImages("renovation-chalet-montagne", 4),
    updates: [
      {
        id: 1,
        date: "2024-02-15",
        title: "Lancement des travaux",
        content: "Les travaux d'isolation ont commencé cette semaine. L'équipe d'artisans locaux est à pied d'œuvre.",
        author: "Marie Martin",
        avatar: "/avatars/marie-martin.jpg"
      }
    ],
    documents: [
      { name: "Devis travaux", type: "pdf", size: "320 Ko" },
      { name: "Plans du chalet", type: "pdf", size: "180 Ko" }
    ],
    comments: []
  },
  {
    id: "6",
    title: "Sono et matériel audiovisuel",
    description: "Équipement pour les spectacles et veillées de notre groupe parisien.",
    longDescription: `
      <h3>Équipement audiovisuel pour nos activités</h3>
      <p>Notre groupe souhaite s'équiper d'un matériel audiovisuel de qualité pour enrichir nos spectacles, veillées et activités pédagogiques.</p>

      <h3>Matériel prévu</h3>
      <ul>
        <li>Système de sonorisation portable</li>
        <li>Micros sans fil et filaires</li>
        <li>Vidéoprojecteur LED</li>
        <li>Écran de projection</li>
        <li>Éclairage de scène LED</li>
        <li>Câbles et accessoires</li>
      </ul>
    `,
    image: getImagePath(getProjectMainImage("sono-materiel-audiovisuel")),
    slug: "sono-materiel-audiovisuel",
    category: "Investissement",
    location: "Paris 15e, Paris",
    targetAmount: 3500,
    currentAmount: 700,
    goal: 3500,
    raised: 700,
    daysLeft: 35,
    supportersCount: 6,
    contributors: 6,
    branch: "Pionniers",
    organizer: "Groupe Scout Paris 15e",
    dateCreated: "2024-02-01",
    isPublic: true,
    images: getProjectImages("sono-materiel-audiovisuel", 4),
    updates: [
      {
        id: 1,
        date: "2024-02-10",
        title: "Première commande passée",
        content: "Nous avons commandé le système de sonorisation. La livraison est prévue pour la semaine prochaine !",
        author: "Thomas Dubois",
        avatar: "/avatars/thomas-dubois.jpg"
      }
    ],
    documents: [
      { name: "Devis matériel", type: "pdf", size: "210 Ko" },
      { name: "Spécifications techniques", type: "pdf", size: "156 Ko" }
    ],
    comments: []
  },
  {
    id: "8",
    title: "Formation BAFA pour nos chefs",
    description: "Financement de la formation BAFA pour 6 nouveaux chefs et cheftaines du groupe lyonnais.",
    longDescription: `
      <h3>Formation BAFA pour nos animateurs</h3>
      <p>Six membres de notre groupe souhaitent passer leur BAFA pour devenir animateurs diplômés et encadrer nos activités jeunesse en toute sécurité.</p>

      <h3>Programme de formation</h3>
      <ul>
        <li>Formation générale (8 jours)</li>
        <li>Stage pratique en centre de loisirs</li>
        <li>Session d'approfondissement</li>
        <li>Frais d'inscription et hébergement</li>
        <li>Transport vers les centres de formation</li>
      </ul>

      <h3>Impact sur le groupe</h3>
      <p>Ces nouvelles compétences permettront d'améliorer la qualité de nos animations et d'accueillir plus de jeunes dans notre groupe scout.</p>
    `,
    image: getImagePath(getProjectMainImage("formation-bafa")),
    slug: "formation-bafa",
    category: "Formation",
    location: "Lyon, Rhône",
    targetAmount: 3600,
    currentAmount: 2100,
    goal: 3600,
    raised: 2100,
    daysLeft: 21,
    supportersCount: 15,
    contributors: 15,
    branch: "Compagnons",
    organizer: "Groupe Scout Lyon 7e",
    dateCreated: "2024-02-05",
    isPublic: true,
    images: getProjectImages("formation-bafa", 4),
    updates: [
      {
        id: 1,
        date: "2024-02-12",
        title: "Inscriptions ouvertes",
        content: "Les inscriptions aux sessions BAFA sont maintenant ouvertes. Nos 6 candidats ont confirmé leur participation !",
        author: "Julie Moreau",
        avatar: "/avatars/julie-moreau.jpg"
      },
      {
        id: 2,
        date: "2024-02-18",
        title: "Première session planifiée",
        content: "La formation générale aura lieu du 15 au 22 mars. C'est parti pour l'aventure BAFA !",
        author: "Julie Moreau",
        avatar: "/avatars/julie-moreau.jpg"
      }
    ],
    documents: [
      { name: "Programme BAFA", type: "pdf", size: "280 Ko" },
      { name: "Liste des candidats", type: "pdf", size: "95 Ko" }
    ],
    comments: []
  },
  {
    id: "10",
    title: "Week-end découverte nature",
    description: "Sortie éducative en forêt de Fontainebleau pour nos scouts et guides franciliens.",
    longDescription: `
      <h3>Week-end nature en forêt de Fontainebleau</h3>
      <p>Une sortie de découverte de la nature pour nos jeunes scouts et guides franciliens dans le magnifique site de Fontainebleau.</p>

      <h3>Programme du week-end</h3>
      <ul>
        <li>Randonnée découverte des rochers et circuits</li>
        <li>Initiation à l'escalade sur blocs</li>
        <li>Activités d'orientation et topographie</li>
        <li>Observation de la faune et de la flore</li>
        <li>Veillée autour du feu de camp</li>
        <li>Nuit sous tente</li>
      </ul>

      <h3>Objectifs pédagogiques</h3>
      <p>Ce week-end permettra aux jeunes de développer leur autonomie, leur respect de la nature et leur esprit d'équipe dans un cadre naturel exceptionnel.</p>
    `,
    image: getImagePath(getProjectMainImage("weekend-nature-fontainebleau")),
    slug: "weekend-nature-fontainebleau",
    category: "Activité",
    location: "Fontainebleau, Seine-et-Marne",
    targetAmount: 800,
    currentAmount: 320,
    goal: 800,
    raised: 320,
    daysLeft: 18,
    supportersCount: 7,
    contributors: 7,
    branch: "Scouts et Guides",
    organizer: "Groupe Scout Île-de-France",
    dateCreated: "2024-02-10",
    isPublic: true,
    images: getProjectImages("weekend-nature-fontainebleau", 4),
    updates: [
      {
        id: 1,
        date: "2024-02-15",
        title: "Inscription ouverte",
        content: "Les inscriptions pour le week-end nature sont maintenant ouvertes ! 15 places disponibles.",
        author: "Pierre Lefort",
        avatar: "/avatars/pierre-lefort.jpg"
      }
    ],
    documents: [
      { name: "Programme détaillé", type: "pdf", size: "190 Ko" },
      { name: "Liste du matériel", type: "pdf", size: "120 Ko" },
      { name: "Autorisation parentale", type: "pdf", size: "85 Ko" }
    ],
    comments: []
  },
  {
    id: "9",
    title: "Week-end ski pour les Scouts-Guides",
    description: "Organisation d'un week-end à la montagne avec cours de ski et veillées pour 25 jeunes savoyards.",
    longDescription: `
      <h3>Week-end ski aux Gets</h3>
      <p>Un week-end exceptionnel à la montagne pour nos scouts et guides avec cours de ski, activités de montagne et veillées inoubliables.</p>

      <h3>Programme du week-end</h3>
      <ul>
        <li>Cours de ski par niveau avec moniteurs ESF</li>
        <li>Activités raquettes et découverte montagne</li>
        <li>Veillée montagnarde avec chants</li>
        <li>Construction d'igloos et jeux de neige</li>
        <li>Hébergement en chalet avec repas montagnards</li>
      </ul>

      <h3>Objectifs</h3>
      <p>Ce week-end permettra aux jeunes de découvrir ou perfectionner le ski, de vivre une expérience de montagne authentique et de renforcer la cohésion du groupe.</p>
    `,
    image: getImagePath(getProjectMainImage("weekend-ski-vosges")),
    slug: "weekend-ski-vosges",
    category: "Activité",
    location: "Les Gets, Haute-Savoie",
    targetAmount: 3200,
    currentAmount: 2400,
    goal: 3200,
    raised: 2400,
    daysLeft: 15,
    supportersCount: 20,
    contributors: 20,
    branch: "Scouts et Guides",
    organizer: "Groupe Scout Haute-Savoie",
    dateCreated: "2024-02-10",
    isPublic: true,
    images: getProjectImages("weekend-ski-vosges", 4),
    updates: [
      {
        id: 1,
        date: "2024-02-18",
        title: "Réservation chalet confirmée",
        content: "Le chalet aux Gets est réservé pour le week-end du 15-17 mars ! Les inscriptions se terminent bientôt.",
        author: "Sylvie Montagne",
        avatar: "/avatars/sylvie-montagne.jpg"
      }
    ],
    documents: [
      { name: "Programme du week-end", type: "pdf", size: "240 Ko" },
      { name: "Liste matériel ski", type: "pdf", size: "130 Ko" },
      { name: "Tarifs moniteurs", type: "pdf", size: "95 Ko" }
    ],
    comments: []
  },
  {
    id: "11",
    title: "Jardin pédagogique pour les Farfadets",
    description: "Création d'un potager éducatif dans notre jardin alsacien pour sensibiliser nos plus jeunes à l'écologie.",
    longDescription: `
      <h3>Un jardin pour apprendre</h3>
      <p>Création d'un jardin pédagogique pour nos plus jeunes scouts (Farfadets) afin de les sensibiliser à l'écologie et au respect de la nature.</p>

      <h3>Aménagements prévus</h3>
      <ul>
        <li>Parcelles de potager adaptées aux enfants</li>
        <li>Bacs surélevés pour faciliter l'accès</li>
        <li>Serre pour les semis et activités par temps froid</li>
        <li>Composteur pédagogique</li>
        <li>Récupérateur d'eau de pluie</li>
        <li>Panneaux explicatifs sur les plantes</li>
        <li>Abri à outils et matériel de jardinage</li>
      </ul>

      <h3>Objectifs pédagogiques</h3>
      <p>Ce jardin permettra aux Farfadets de découvrir le cycle des saisons, d'apprendre la patience, le respect du vivant et les gestes éco-responsables.</p>
    `,
    image: getImagePath(getProjectMainImage("jardin-pedagogique-farfadets")),
    slug: "jardin-pedagogique-farfadets",
    category: "Environnement",
    location: "Strasbourg, Bas-Rhin",
    targetAmount: 1500,
    currentAmount: 890,
    goal: 1500,
    raised: 890,
    daysLeft: 45,
    supportersCount: 9,
    contributors: 9,
    branch: "Farfadets",
    organizer: "Groupe Scout Strasbourg",
    dateCreated: "2024-01-10",
    isPublic: true,
    images: getProjectImages("jardin-pedagogique-farfadets", 4),
    updates: [
      {
        id: 1,
        date: "2024-02-01",
        title: "Terrain préparé",
        content: "Le terrain du jardin a été défriché et préparé. Les premières plantations auront lieu au printemps !",
        author: "Claire Jardin",
        avatar: "/avatars/claire-jardin.jpg"
      }
    ],
    documents: [
      { name: "Plan du jardin", type: "pdf", size: "180 Ko" },
      { name: "Liste des légumes", type: "pdf", size: "95 Ko" },
      { name: "Planning des activités", type: "pdf", size: "140 Ko" }
    ],
    comments: []
  },
  {
    id: "12",
    title: "Rénovation du chalet scout des Vosges",
    description: "Travaux de toiture, isolation et aménagement de notre chalet pour accueillir les camps d'hiver.",
    longDescription: `
      <h3>Rénovation de notre chalet des Vosges</h3>
      <p>Notre chalet situé dans les magnifiques Vosges nécessite des travaux de rénovation urgents pour continuer à accueillir nos groupes lors des camps d'hiver.</p>

      <h3>Travaux prévus</h3>
      <ul>
        <li>Réfection complète de la toiture</li>
        <li>Isolation thermique des murs et combles</li>
        <li>Aménagement d'une nouvelle salle d'activités</li>
        <li>Mise aux normes électrique et chauffage</li>
        <li>Rénovation des sanitaires</li>
        <li>Peinture intérieure et extérieure</li>
      </ul>

      <h3>Un lieu chargé d'histoire</h3>
      <p>Ce chalet accueille des scouts depuis plus de 30 ans. Ces travaux permettront de le préserver pour les générations futures.</p>
    `,
    image: getImagePath(getProjectMainImage("renovation-chalet-vosges")),
    slug: "renovation-chalet-vosges",
    category: "Investissement",
    location: "Gérardmer, Vosges",
    targetAmount: 12000,
    currentAmount: 4800,
    goal: 12000,
    raised: 4800,
    daysLeft: 55,
    supportersCount: 16,
    contributors: 16,
    branch: "Scouts",
    organizer: "Groupe Scout Vosges",
    dateCreated: "2024-01-30",
    isPublic: true,
    images: getProjectImages("renovation-chalet-montagne", 4),
    updates: [
      {
        id: 1,
        date: "2024-02-05",
        title: "Devis validé",
        content: "Les devis pour la rénovation ont été validés. Les travaux commenceront dès que le financement sera bouclé !",
        author: "Michel Dubois",
        avatar: "/avatars/michel-dubois.jpg"
      }
    ],
    documents: [
      { name: "Devis toiture", type: "pdf", size: "320 Ko" },
      { name: "Plans rénovation", type: "pdf", size: "450 Ko" },
      { name: "Diagnostic technique", type: "pdf", size: "280 Ko" }
    ],
    comments: []
  },
  {
    id: "13",
    title: "Matériel nautique pour les activités marines",
    description: "Achat de kayaks, gilets de sauvetage et matériel de voile pour la section marine de La Rochelle.",
    longDescription: `
      <h3>Équipement nautique pour les marins</h3>
      <p>Notre section marine de La Rochelle souhaite développer ses activités nautiques avec du matériel moderne et sécurisé.</p>

      <h3>Matériel à acquérir</h3>
      <ul>
        <li>6 kayaks de mer biplace</li>
        <li>Gilets de sauvetage aux normes</li>
        <li>Pagaies et matériel de sécurité</li>
        <li>Voiles d'initiation et dériveurs</li>
        <li>Combinaisons néoprène</li>
        <li>Remorque de transport</li>
      </ul>

      <h3>Activités prévues</h3>
      <p>Ce matériel permettra d'organiser des sorties kayak, des initiations à la voile et des expéditions marines inoubliables pour nos scouts marins.</p>
    `,
    image: getImagePath(getProjectMainImage("equipement-nautique-marins")),
    slug: "equipement-nautique-marins",
    category: "Investissement",
    location: "La Rochelle, Charente-Maritime",
    targetAmount: 5400,
    currentAmount: 2700,
    goal: 5400,
    raised: 2700,
    daysLeft: 38,
    supportersCount: 14,
    contributors: 14,
    branch: "Scouts Marins",
    organizer: "Groupe Scout Marin La Rochelle",
    dateCreated: "2024-02-03",
    isPublic: true,
    images: getProjectImages("equipement-nautique-marins", 4),
    updates: [
      {
        id: 1,
        date: "2024-02-10",
        title: "Partenariat avec club nautique",
        content: "Nous avons signé un partenariat avec le club nautique local pour l'utilisation de leurs installations !",
        author: "Capitaine Morin",
        avatar: "/avatars/capitaine-morin.jpg"
      }
    ],
    documents: [
      { name: "Catalogue matériel", type: "pdf", size: "380 Ko" },
      { name: "Devis fournisseur", type: "pdf", size: "220 Ko" },
      { name: "Planning sorties", type: "pdf", size: "150 Ko" }
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