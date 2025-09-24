import ProjectDetailClient from "./project-detail-client"
import { generateProjectStaticParams } from "@/lib/projects"

export async function generateStaticParams() {
  // Génère automatiquement les paramètres statiques basés sur les données mockées
  return generateProjectStaticParams()
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  return <ProjectDetailClient params={params} />
}