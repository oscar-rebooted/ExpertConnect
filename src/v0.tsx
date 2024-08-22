import { useState } from 'react'
import { Input } from "../src/components/ui/Input"
import { Button } from "../src/components/ui/Button"
import { Checkbox } from "../src/components/ui/Checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../src/components/ui/Table"
import { CalendarIcon, FilterIcon } from 'lucide-react'

export default function Component() {
  const [experts, setExperts] = useState([
    { id: 1, name: "John Doe", company: "Tech Co", geography: "North America", perspective: "Technical", availability: "Next week", experience: "10 years" },
    { id: 2, name: "Jane Smith", company: "Consult Inc", geography: "Europe", perspective: "Business", availability: "This week", experience: "15 years" },
    // Add more expert data as needed
  ])

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 p-4 hidden md:block">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Filters</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Geography</label>
            <div className="space-y-2">
              <Checkbox id="na" label="North America" />
              <Checkbox id="eu" label="Europe" />
              <Checkbox id="asia" label="Asia" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Perspective</label>
            <div className="space-y-2">
              <Checkbox id="tech" label="Technical" />
              <Checkbox id="business" label="Business" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Experience</label>
            <Input type="number" placeholder="Minimum years" className="w-full" />
          </div>
          <Button className="w-full">Apply Filters</Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold dark:text-white">ExpertHub</h1>
          <Button variant="outline" className="md:hidden">
            <FilterIcon className="mr-2 h-4 w-4" /> Filters
          </Button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Geography</TableHead>
                <TableHead>Perspective</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {experts.map((expert) => (
                <TableRow key={expert.id}>
                  <TableCell className="font-medium">{expert.name}</TableCell>
                  <TableCell>{expert.company}</TableCell>
                  <TableCell>{expert.geography}</TableCell>
                  <TableCell>{expert.perspective}</TableCell>
                  <TableCell>{expert.availability}</TableCell>
                  <TableCell>{expert.experience}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <CalendarIcon className="mr-2 h-4 w-4" /> Schedule
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}