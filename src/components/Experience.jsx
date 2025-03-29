import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Briefcase, Calendar, MapPin, CheckCircle2, Award, Users, Zap } from "lucide-react"

export default function Experience() {
  const experiences = [
    {
      period: "2021 - Present",
      title: "Senior 3D Developer",
      company: "Hyper3D Technologies",
      location: "San Francisco, CA",
      description: "Leading the development of web-based 3D visualization tools and interactive experiences.",
      achievements: [
        "Developed a real-time 3D model generator that increased user engagement by 45%",
        "Led a team of 5 developers to deliver projects on time and within budget",
        "Optimized rendering performance resulting in 60% faster load times",
      ],
      skills: ["Three.js", "WebGL", "React", "TypeScript"],
      icon: Zap,
      color: "from-blue-500 to-cyan-400",
    },
    {
      period: "2018 - 2021",
      title: "3D Graphics Engineer",
      company: "Virtual Spaces Inc.",
      location: "Seattle, WA",
      description: "Developed immersive 3D environments and optimized rendering performance for web applications.",
      achievements: [
        "Created a custom shader library that reduced development time by 30%",
        "Implemented WebGL-based visualization tools for architectural clients",
        "Contributed to open-source 3D rendering projects",
      ],
      skills: ["WebGL", "GLSL", "JavaScript", "Blender"],
      icon: Award,
      color: "from-purple-500 to-indigo-500",
    },
    {
      period: "2016 - 2018",
      title: "Frontend Developer",
      company: "Creative Digital Agency",
      location: "Austin, TX",
      description: "Created interactive web experiences with a focus on animation and visual effects.",
      achievements: [
        "Designed and implemented interactive data visualizations for Fortune 500 clients",
        "Developed custom animation libraries that improved site performance",
        "Mentored junior developers in advanced CSS and JavaScript techniques",
      ],
      skills: ["HTML","JavaScript", "CSS", "NODE.JS","React", "Python"],
      icon: Users,
      color: "from-amber-500 to-orange-500",
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zinc-900 dark:text-white">Experience</h2>
          <p className="text-zinc-600 dark:text-gray-400 max-w-2xl mx-auto">
            My journey through the Basic language like HTML, CSS , JS & crafting immersive experiences and pushing technological
            boundaries
          </p>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left side with icon and line */}
                <div className="hidden md:flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-lg`}
                  >
                    <exp.icon className="h-8 w-8 text-white" />
                  </div>
                  {index < experiences.length - 1 && (
                    <div className="w-1 flex-grow bg-gradient-to-b from-primary/50 to-transparent mt-4"></div>
                  )}
                </div>

                {/* Right side with content */}
                <div className="flex-1">
                  <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                    <div className={`h-2 ${exp.color} w-full absolute top-0 left-0 right-0 z-10`}></div>
                    <CardHeader className="pb-2 pt-6">
                      <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-2">
                        <div className="flex items-start gap-3">
                          <div
                            className={`md:hidden w-12 h-12 rounded-full ${exp.color} flex items-center justify-center shadow-lg`}
                          >
                            <exp.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{exp.title}</h3>
                            <p className="text-primary">{exp.company}</p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 text-zinc-600 dark:text-gray-400 self-start md:self-center"
                        >
                          <Calendar className="h-3 w-3" /> {exp.period}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-zinc-600 dark:text-gray-400 mt-1">
                        <MapPin className="h-3 w-3" /> {exp.location}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-zinc-700 dark:text-gray-300 mb-6">{exp.description}</p>

                      <h4 className="font-medium text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-primary" /> Key Achievements
                      </h4>
                      <ul className="mb-6 space-y-3">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-zinc-700 dark:text-gray-300">
                            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {exp.skills.map((skill, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

