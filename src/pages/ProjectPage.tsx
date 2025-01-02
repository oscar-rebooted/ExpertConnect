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
  ChevronLeftIcon, 
  ChevronDownIcon, 
  ChevronUpIcon, 
  CalendarIcon,
} from 'lucide-react'
import { Link, useFetcher } from 'react-router-dom'
import SchedulingDialog from '@/components/SchedulingDialog'
import SidebarFilter from '@/components/SidebarFilter'
import AddConnectionDialog from '@/components/AddConnectionDialog'

const networks = ["AlphaSights", "Dialectica", "Guidepoint"]
const countries = ["United States", "Austria", "Japan", "Italy", "Germany", "France", "Canada", "United Kingdom", "Australia", "Switzerland", "Spain", "Portugal", "Belgium", "Netherlands", "Sweden", "Norway", "Denmark", "Finland", "Iceland", "Ireland", "Malta", "Cyprus", "Luxembourg"]
const perspectives = ["Customer", "Competitor", "Former"]

type Experience = {
  id: string;
  title: string;
  company: string;
  duration: string;
};

type AvailabilityBlock = {
  day: string;
  slots: string[];
};

type Expert = {
  id: number;
  name: string;
  title: string;
  company: string;
  network: string;
  country: string;
  perspective: string;
  availability: string;
  experience: Experience[];
  availabilityBlocks: AvailabilityBlock[];
}

type SortConfig = {
  key: keyof Expert;
  direction: 'ascending' | 'descending' | null;
}

export default function ProjectPage() {
  const [experts, setExperts] = useState<Expert[]>([]);  // Used for full list of experts
  const [filteredExperts, setFilteredExperts] = useState<Expert[]>([]); // Used for list of filtered experts
  const [isSchedulingDialogOpen, setIsSchedulingDialogOpen] = useState(false); 
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null); // Used for SchedulingDialog
  const [expandedRow, setExpandedRow] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: null })
  const [filters, setFilters] = useState({
    network: [] as string[],
    country: [] as string[],
    perspective: [] as string[],
  })
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(true)
  const [expandedFilters, setExpandedFilters] = useState({
    network: false,
    country: false,
    perspective: false,
  })

  useEffect(() => {
    // Fetch the JSON data
    fetch('https://shaquilleoatmeal4444.github.io/ExpertConnect/experts.json')  // Replace with the actual URL of the JSON
      .then((response) => response.json())
      .then((data) => {
        setExperts(data);  // Directly use the JSON data
      });
  }, []);

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

  // Pop-up form logic
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

  // Scheduling dialog logic and state mgmt here
  const handleOpenSchedulingDialog = (expert: Expert) => {
    setSelectedExpert(expert);
    setIsSchedulingDialogOpen(true);
  };

  const handleCloseSchedulingDialog = () => {
    setSelectedExpert(null);
    setIsSchedulingDialogOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* Top bar */}
      <div className="bg-white dark:bg-gray-800 shadow-sm sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/project-list" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
            <ChevronLeftIcon className="mr-2 h-4 w-4" />
            Back to Project List
          </Link>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Business services CDD</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">

        <SidebarFilter
          isFiltersExpanded={isFiltersExpanded}
          setIsFiltersExpanded={setIsFiltersExpanded}
          expandedFilters={expandedFilters} 
          setExpandedFilters={setExpandedFilters}
          toggleFilterExpansion={toggleFilterExpansion} 
          networks={networks}
          countries={countries}
          perspectives={perspectives}
          filters={filters}
          setFilters={setFilters}
          handleFilterChange={handleFilterChange}
        />     

        <div className="flex-1 p-8 overflow-auto">
          <div className="flex justify-between items-center mb-6">
    
            {/* Search experts input bar */}
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
              <AddConnectionDialog
                handleSubmit={handleSubmit}
                networks={networks}
                selectedNetwork={selectedNetwork}
                handleNetworkSelect={handleNetworkSelect}
                mavenToken={mavenToken}
                setMavenToken={setMavenToken}
                guidePointUsername={guidePointUsername}
                setGuidePointUsername={setGuidePointUsername}
                guidePointPassword={guidePointPassword}
                setGuidePointPassword={setGuidePointPassword}
              />
            </div>
          </div>

        {/* Table content */}
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
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row expansion on button click
                            handleOpenSchedulingDialog(expert);
                          }}
                        >
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
            <SchedulingDialog
              selectedExpert={selectedExpert}
              isSchedulingDialogOpen={isSchedulingDialogOpen}
              onClose={handleCloseSchedulingDialog}
            />
          </div>
        </div>
      </div>
    </div>
  )
}