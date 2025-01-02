import React from 'react'
import { useState } from 'react'
// import { useRouter } from 'next/navigation'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from "@/components/ui/Card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Label } from "@/components/ui/Label"
import { PlusCircle, ChevronDown, ChevronUp, Network, Bot, Building2, PieChart } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/Collapsible"
import { Button } from "@/components/ui/Button"
import { DialogTrigger } from '@radix-ui/react-dialog'
import { DialogHeader, DialogTitle, Dialog, DialogFooter, DialogContent } from '@/components/ui/Dialog'
import { Input } from "@/components/ui/Input"

// Mock data for projects
const projects = [
  { id: 1, name: "Business services CDD", createdOn: "2023-06-01", networks: ["Dialectica", "GLG"], icon: Building2 },
  { id: 2, name: "Robotics automation market study", createdOn: "2023-05-15", networks: ["AlphaSights", "Guidepoint"], icon: Bot },
  { id: 3, name: "Implementation consulting competitive landscape", createdOn: "2023-06-10", networks: ["AlphaSights", "Dialectica"], icon: PieChart },
]

// Mock data for timezones
const timezones = [
  "UTC", "America/New_York", "Europe/London", "Asia/Tokyo", "Australia/Sydney"
]

export default function HomePage() {
  const navigate = useNavigate()
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false)
  
  const [defaultProject, setDefaultProject] = useState("1")
  const [notificationFrequency, setNotificationFrequency] = useState("immediate")
  const [notificationMethod, setNotificationMethod] = useState("desktop")

  const handleProjectClick = (projectId: number) => {
    if (projectId == 1) {
      navigate(`/project/${projectId}`)
    }
  }

  const [projectName, setProjectName] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  // Form logic 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Creating new project by the name:', projectName)
  }


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Project List</h1>

      {/* Project List */}
      <section className="mb-8">
        {/* <h1 className="text-2xl font-semibold mb-4">Project List</h1> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleProjectClick(project.id)}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <project.icon className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">{project.name}</h3>
                    <p className="text-sm text-gray-500">Created on: {project.createdOn}</p>
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <Network className="w-5 h-5 mr-2 text-primary" />
                  <p className="text-sm">{project.networks.join(", ")}</p>
                </div>
              </CardContent>
            </Card>
          ))}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
              <Card className="border-dashed border-2 hover:border-solid cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center h-full p-6">
                  <PlusCircle className="w-12 h-12 mb-4 text-primary" />
                  <p className="text-lg">Create new project</p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create new project</DialogTitle>
              </DialogHeader>
              <form onSubmit={(e) => { handleSubmit(e); setIsDialogOpen(false); }}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Label htmlFor="projectName" className="text-left">
                      Project Name
                    </Label>
                    <Input
                      id="projectName"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="col-span-1"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create</Button>
                </DialogFooter>
              </form>

            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Preferences */}
      <section>
        <Collapsible
          open={isPreferencesOpen}
          onOpenChange={setIsPreferencesOpen}
          className="space-y-2"
        >
          <CollapsibleTrigger asChild>
            <div className="flex items-center cursor-pointer">  {/* Wrapping both elements in a single div */}
              <h2 className="text-base font-semibold">Preferences</h2>
              <Button variant="ghost" size="sm" className="w-9 p-0 ml-2">  {/* Add spacing if needed */}
                {isPreferencesOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                <span className="sr-only">Toggle Preferences</span>
              </Button>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label htmlFor="default-project" className="text-lg mb-2 block">Default Project</Label>
                  <Select value={defaultProject} onValueChange={setDefaultProject}>
                    <SelectTrigger id="default-project">
                      <SelectValue placeholder="Select a default project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id.toString()}>{project.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notification-frequency" className="text-lg mb-2 block">Notification Frequency</Label>
                  <Select value={notificationFrequency} onValueChange={setNotificationFrequency}>
                    <SelectTrigger id="notification-frequency">
                      <SelectValue placeholder="Select notification frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily summaries</SelectItem>
                      <SelectItem value="immediate">Every time a new profile is added</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notification-method" className="text-lg mb-2 block">Notification Method</Label>
                  <Select value={notificationMethod} onValueChange={setNotificationMethod}>
                    <SelectTrigger id="notification-method">
                      <SelectValue placeholder="Select notification method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desktop">Desktop notification</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="slack">Slack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </section>
    </div>
  )
}