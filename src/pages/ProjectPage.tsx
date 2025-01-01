import React from 'react'
import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Checkbox } from "@/components/ui/Checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { 
  CalendarIcon, 
  FilterIcon, 
  ChevronLeftIcon, 
  ChevronDownIcon, 
  ChevronUpIcon, 
  ChevronRightIcon,
  PlusIcon 
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/Dialog';
import { Label } from "@/components/ui/Label";
import SchedulingDialog from '@/components/SchedulingDialog'

const networks = ["AlphaSights", "Dialectica", "Guidepoint"]
const countries = ["United States", "Austria", "Japan", "Italy", "Germany", "France", "Canada", "United Kingdom", "Australia", "Switzerland", "Spain", "Portugal", "Belgium", "Netherlands", "Sweden", "Norway", "Denmark", "Finland", "Iceland", "Ireland", "Malta", "Cyprus", "Luxembourg"]
const perspectives = ["Customer", "Competitor", "Former"]

type Expert = {
  id: number;
  name: string;
  title: string;
  company: string;
  network: string;
  country: string;
  perspective: string;
  availability: string;
  experience: {
    id: string;
    title: string;
    company: string;
    duration: string;
  }[];
  availabilityBlocks: {
    day: string;
    slots: string[];
  }[];
}

// Sample data
const sampleExperts: Expert[] = [
  {
    id: 1,
    name: "John Doe",
    title: "Senior Software Engineer",
    company: "Tech Co",
    network: "AlphaSights",
    country: "United States",
    perspective: "Former",
    availability: "Next week",
    experience: [
      { id: "1", title: "Software Engineer", company: "Tech Co", duration: "2018-2023" },
      { id: "2", title: "Junior Developer", company: "Startup Inc", duration: "2015-2018" }
    ],
    availabilityBlocks: [
      { day: "Monday", slots: ["9 AM - 11 AM", "2 PM - 4 PM"] },
      { day: "Wednesday", slots: ["10 AM - 12 PM", "3 PM - 5 PM"] }
    ]
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "Marketing Director",
    company: "Brand Solutions",
    network: "Guidepoint",
    country: "United Kingdom",
    perspective: "Customer",
    availability: "This week",
    experience: [
      { id: "1", title: "Marketing Director", company: "Brand Solutions", duration: "2020-Present" },
      { id: "2", title: "Marketing Manager", company: "Global Corp", duration: "2016-2020" }
    ],
    availabilityBlocks: [
      { day: "Tuesday", slots: ["11 AM - 1 PM", "4 PM - 6 PM"] },
      { day: "Thursday", slots: ["9 AM - 11 AM", "2 PM - 4 PM"] }
    ]
  }
]

type SortConfig = {
  key: keyof Expert;
  direction: 'ascending' | 'descending' | null;
}

export default function ProjectPage() {
  const [experts, setExperts] = useState<Expert[]>(sampleExperts)
  const [filteredExperts, setFilteredExperts] = useState<Expert[]>(sampleExperts)
  const [expandedRow, setExpandedRow] = useState<number | null>(null)
  const [filters, setFilters] = useState({
    network: [] as string[],
    country: [] as string[],
    perspective: [] as string[],
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: null })
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(true)
  const [expandedFilters, setExpandedFilters] = useState({
    network: false,
    country: false,
    perspective: false,
  })

  useEffect(() => {
    let result = experts.filter(expert => 
      (filters.network.length === 0 || filters.network.includes(expert.network)) &&
      (filters.country.length === 0 || filters.country.includes(expert.country)) &&
      (filters.perspective.length === 0 || filters.perspective.includes(expert.perspective)) &&
      (expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       expert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       expert.company.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    if (sortConfig.direction) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }

    setFilteredExperts(result)
  }, [filters, experts, searchTerm, sortConfig])

  const toggleRowExpansion = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id)
  }

  const handleFilterChange = (category: 'network' | 'country' | 'perspective', value: string) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters }
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter(item => item !== value)
      } else {
        newFilters[category] = [...newFilters[category], value]
      }
      return newFilters
    })
  }

  const handleSort = (key: keyof Expert) => {
    let direction: 'ascending' | 'descending' | null = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = null
    }
    setSortConfig({ key, direction })
  }

  const toggleFilterExpansion = (category: 'network' | 'country' | 'perspective') => {
    setExpandedFilters(prev => ({ ...prev, [category]: !prev[category] }))
  }

  const FilterCheckbox = ({ id, label, category }: { id: string; label: string; category: 'network' | 'country' | 'perspective' }) => (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id={id} 
        checked={filters[category].includes(label)}
        onCheckedChange={() => handleFilterChange(category, label)}
      />
      <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
    </div>
  )

  // Copied in from ChatGPT: pop-up form logic
  const SortIcon = ({ columnKey }: { columnKey: keyof Expert }) => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === 'ascending' ? <ChevronDownIcon className="h-4 w-4 ml-1" /> : <ChevronUpIcon className="h-4 w-4 ml-1" />
    }
    return null
  }

  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null)
  const [mavenToken, setMavenToken] = useState('')
  const [guidePointUsername, setGuidePointUsername] = useState('')
  const [guidePointPassword, setGuidePointPassword] = useState('')

  const handleNetworkSelect = (network: string) => {
    setSelectedNetwork(network)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Submitting for network:', selectedNetwork)
    if (selectedNetwork === 'Dialectica') {
      console.log('Maven Token:', mavenToken)
    } else if (selectedNetwork === 'Guidepoint') {
      console.log('Username:', guidePointUsername)
      console.log('Password:', guidePointPassword)
    }
    // Reset form fields => not sure I need this
    setSelectedNetwork(null)
    setMavenToken('')
    setGuidePointUsername('')
    setGuidePointPassword('')
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* Top bar */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/project-list" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
              <ChevronLeftIcon className="mr-2 h-4 w-4" />
              Back to Project List
            </Link>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Business services CDD</h1>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`bg-white dark:bg-gray-800 p-4 transition-all duration-300 ease-in-out ${isFiltersExpanded ? 'w-64' : 'w-16'} overflow-hidden relative`}>
          <Button 
            variant="ghost" 
            className="w-full justify-start mb-4" 
            onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
          >
            <FilterIcon className="h-4 w-4 mr-2" />
            {isFiltersExpanded && 'Filters'}
          </Button>
          {isFiltersExpanded && (
            <div className="space-y-4">
              {['network', 'country', 'perspective'].map((category) => (
                <div key={category}>
                  <Button
                    variant="ghost"
                    className="w-full justify-between mb-2"
                    onClick={() => toggleFilterExpansion(category as 'network' | 'country' | 'perspective')}
                  >
                    <span className="font-semibold capitalize">{category}</span>
                    <ChevronDownIcon className={`h-4 w-4 transition-transform ${expandedFilters[category as keyof typeof expandedFilters] ? 'rotate-180' : ''}`} />
                  </Button>
                  {expandedFilters[category as keyof typeof expandedFilters] && (
                    <div className="space-y-1 ml-4">
                      {(category === 'network' ? networks : category === 'country' ? countries : perspectives).map((item) => (
                        <FilterCheckbox key={item} id={item} label={item} category={category as 'network' | 'country' | 'perspective'} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-4 right-4"
            onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
          >
            <ChevronRightIcon className={`h-4 w-4 transition-transform ${isFiltersExpanded ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        {/* Table content */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <Input
              type="search"
              placeholder="Search experts..."
              className="max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                {Array.from(new Set(filteredExperts.map(expert => expert.network))).map((network) => (
                  <img
                    key={network}
                    src={require(`../assets/expert_network_logos/${network}.png`).default}
                    alt={`${network} logo`}
                    width={32}
                    height={32}
                  />
                ))}
              </div>

              {/* Dialog box for adding connection */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add connection
                  </Button>
                </DialogTrigger>        
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add connection</DialogTitle>
                    <DialogDescription>
                      Add profiles from an expert network by filling out the appropriate form
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleSubmit}>
                    <div className="flex justify-center space-x-4 mb-4">
                      {networks.map((network) => (
                        <Button
                          key={network}
                          type="button"
                          variant="outline"
                          className={`p-2 ${selectedNetwork === network ? 'bg-accent text-accent-foreground' : ''}`}
                          onClick={() => handleNetworkSelect(selectedNetwork === network ? '' : network)} 
                        >
                          <img
                            src={require(`../assets/expert_network_logos/${network}.png`).default}
                            alt={`${network} logo`}
                            width={32}
                            height={32}
                          />
                        </Button>
                      ))}
                    </div>
                    {selectedNetwork === 'Dialectica' && (
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="mavenToken" className="text-right">
                            Maven Token
                          </Label>
                          <Input
                            id="mavenToken"
                            value={mavenToken}
                            onChange={(e) => setMavenToken(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                    )}
                    {selectedNetwork === 'Guidepoint' && (
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Username
                          </Label>
                          <Input
                            id="username"
                            value={guidePointUsername}
                            onChange={(e) => setGuidePointUsername(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="password" className="text-right">
                            Password
                          </Label>
                          <Input
                            id="password"
                            type="password"
                            value={guidePointPassword}
                            onChange={(e) => setGuidePointPassword(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                    )}
                    <DialogFooter>
                      <Button type="submit" disabled={!selectedNetwork}>Save changes</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  {['name', 'title', 'company', 'network', 'country', 'perspective'].map((column) => (
                    <TableHead 
                      key={column}
                      className="cursor-pointer" 
                      onClick={() => handleSort(column as keyof Expert)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="capitalize">{column}</span>
                        <SortIcon columnKey={column as keyof Expert} />
                      </div>
                    </TableHead>
                  ))}
+                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExperts.map((expert) => (
                  <>
                    <TableRow 
                      key={expert.id} 
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => toggleRowExpansion(expert.id)}
                    >
                      <TableCell className="font-medium">{expert.name}</TableCell>
                      <TableCell>{expert.title}</TableCell>
                      <TableCell>{expert.company}</TableCell>
                      <TableCell>{expert.network}</TableCell>
                      <TableCell>{expert.country}</TableCell>
                      <TableCell>{expert.perspective}</TableCell>
                      <TableCell>
                        <SchedulingDialog expertId={expert.id}>
                        </SchedulingDialog>
                        {/* <Dialog>
                          <DialogTrigger>
                            <Button variant="outline" size="sm">
                              <CalendarIcon className="mr-2 h-4 w-4" /> Schedule
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Schedule expert call</DialogTitle>
                            </DialogHeader>
                            <form>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="expertName" className="text-right">
                                    
                                  </Label>
                                  <Input
                                    id="mavenToken"
                                    value={mavenToken}
                                    onChange={(e) => setMavenToken(e.target.value)}
                                    className="col-span-3"
                                  />
                                </div>
                              </div>
                            </form>
                          </DialogContent>
                        </Dialog> */}
                      </TableCell>
                    </TableRow>
                    {expandedRow === expert.id && (
                      <TableRow>
                        <TableCell colSpan={7} className="bg-gray-50 dark:bg-gray-700 p-4">
                          <Tabs defaultValue="experience" className="w-full">
                            <TabsList>
                              <TabsTrigger value="experience">Experience</TabsTrigger>
                              <TabsTrigger value="availability">Availability</TabsTrigger>
                            </TabsList>
                            <TabsContent value="experience">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Title</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {expert.experience.map((exp) => (
                                    <TableRow key={exp.id}>
                                      <TableCell>{exp.duration}</TableCell>
                                      <TableCell>{exp.company}</TableCell>
                                      <TableCell>{exp.title}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TabsContent>
                            <TabsContent value="availability">
                              <div className="grid grid-cols-3 gap-4">
                                {expert.availabilityBlocks.map((block, index) => (
                                  <div key={index} className="border rounded p-2">
                                    <h4 className="font-semibold mb-2">{block.day}</h4>
                                    <ul className="list-disc pl-5">
                                      {block.slots.map((slot, slotIndex) => (
                                        <li key={slotIndex}>{slot}</li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </TabsContent>
                          </Tabs>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}