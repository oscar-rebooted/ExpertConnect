import React from 'react'
import { useState, useEffect } from 'react'
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
import { CalendarIcon, FilterIcon, ChevronLeftIcon } from 'lucide-react'
// import Link from 'next/link'

const networks = ["AlphaSights", "Dialectica", "Guidepoint", "Third Bridge"]
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

export default function ProjectPage() {
  const [experts, setExperts] = useState<Expert[]>(sampleExperts)
  const [filteredExperts, setFilteredExperts] = useState<Expert[]>(sampleExperts)
  const [expandedRow, setExpandedRow] = useState<number | null>(null)
  const [filters, setFilters] = useState({
    network: [] as string[],
    country: [] as string[],
    perspective: [] as string[],
  })

  useEffect(() => {
    const newFilteredExperts = experts.filter(expert => 
      (filters.network.length === 0 || filters.network.includes(expert.network)) &&
      (filters.country.length === 0 || filters.country.includes(expert.country)) &&
      (filters.perspective.length === 0 || filters.perspective.includes(expert.perspective))
    )
    setFilteredExperts(newFilteredExperts)
  }, [filters, experts])

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

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* Top bar */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <a href="/project-management" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
              <ChevronLeftIcon className="mr-2 h-4 w-4" />
              Back to Project Management
            </a>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Business Services CDD</h1>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 p-4 hidden md:block overflow-auto">
          <h2 className="text-xl font-bold mb-4 dark:text-white">Filters</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 dark:text-white">Network</h3>
              <div className="space-y-1">
                {networks.map((network) => (
                  <FilterCheckbox key={network} id={network} label={network} category="network" />
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2 dark:text-white">Country</h3>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {countries.map((country) => (
                  <FilterCheckbox key={country} id={country} label={country} category="country" />
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2 dark:text-white">Perspective</h3>
              <div className="space-y-1">
                {perspectives.map((perspective) => (
                  <FilterCheckbox key={perspective} id={perspective} label={perspective} category="perspective" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Table content */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold dark:text-white">ExpertConnect</h2>
            <Button variant="outline" className="md:hidden">
              <FilterIcon className="mr-2 h-4 w-4" /> Filters
            </Button>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Network</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Perspective</TableHead>
                  <TableHead></TableHead>
                </TableRow>
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
                        <Button variant="outline" size="sm">
                          <CalendarIcon className="mr-2 h-4 w-4" /> Schedule
                        </Button>
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
};