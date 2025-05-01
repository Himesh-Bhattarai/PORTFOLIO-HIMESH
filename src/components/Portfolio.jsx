import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export default function Portfolio() {
  const projects = [
    {
      title: "First Portfolio Website",
      description: "Portfolio website to show my skill.",
      image: "/first-portfolio.png?height=600&width=800",
      tags: ["Tailwind CSS", "React"],
      link: "https://portfolio-hcb.vercel.app"
    },
    {
      title: "Helmet Head Nepal ",
      description: "E-commerce Website about helmet & motorcycle accesories.",
      image: "/fav-con.png?height=600&width=800",
      tags: ["Three.js", "Next.js", "React.JS", "Express", "Node.JS", "Tailwind CSS"],
    },
    {
      title: "HerbalWisdom",
      description: "Detailed Description of Herbal. Like User, purpos, sideeffect, advantages etc",
      image: "/portfolio.png?height=800&width=600",
      tags: [ "Next.js", "React.JS", "Tailwind CSS", "Typescript"],
    },
    {
      title: "NP REVOLUTION",
      description: "NP REVOLUTION is an independent Nepali news platform exposing corruption, delivering honest journalism, and empowering citizens with real-time updates and simplified news summaries.",
      image: "/nprevolution.png?height=800&width=600",
      tags: ["Next.JS" , "React.JS" ,"TailwindCss" , "EXpress", "Node JS", "TypeScript"],
    },
  ]

  return (
    <section id="portfolio" className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Portfolio</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Explore my recent projects and creative works</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-zinc-900 border-zinc-800 overflow-hidden group transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/20"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-zinc-800 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <Button target={project.link} variant="outline" size="sm" className="gap-2">
                  View Project <ExternalLink className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

