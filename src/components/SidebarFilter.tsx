import React from 'react'
import { Button } from "@/components/ui/Button"
import { Checkbox } from "@/components/ui/Checkbox"
import { 
    FilterIcon, 
    ChevronDownIcon, 
    ChevronRightIcon,
  } from 'lucide-react'

interface SidebarFilterProps {
    isFiltersExpanded: boolean;
    setIsFiltersExpanded: React.Dispatch<React.SetStateAction<boolean>>;
    expandedFilters: { network: boolean; country: boolean; perspective: boolean };
    setExpandedFilters: React.Dispatch<React.SetStateAction<{ network: boolean; country: boolean; perspective: boolean }>>;
    toggleFilterExpansion: (category: 'network' | 'country' | 'perspective') => void;
    networks: string[];
    countries: string[];
    perspectives: string[];
    filters: { network: string[]; country: string[]; perspective: string[] };
    setFilters: React.Dispatch<React.SetStateAction<{ network: string[]; country: string[]; perspective: string[] }>>;
    handleFilterChange: (category: 'network' | 'country' | 'perspective', value: string) => void;
  
}

const FilterCheckbox = ({ id, label, category, filters, handleFilterChange }: { 
    id: string; 
    label: string; 
    category: 'network' | 'country' | 'perspective'; 
    filters: { network: string[]; country: string[]; perspective: string[] }; 
    handleFilterChange: (category: 'network' | 'country' | 'perspective', value: string) => void 
}) => (
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

const SidebarFilter: React.FC<SidebarFilterProps> = ({ 
    isFiltersExpanded, 
    setIsFiltersExpanded,
    expandedFilters,
    setExpandedFilters,
    toggleFilterExpansion,
    networks,
    countries,
    perspectives,
    filters,
    setFilters,
    handleFilterChange
}) => {
    return (
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
                        <FilterCheckbox 
                            key={item} 
                            id={item} 
                            label={item} 
                            category={category as 'network' | 'country' | 'perspective'} 
                            filters={filters}
                            handleFilterChange={handleFilterChange}
                        />
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
    )
}

export default SidebarFilter;