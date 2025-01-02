import React from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/Dialog'
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import {
    PlusIcon 
  } from 'lucide-react'
import { Label } from "@/components/ui/Label"

interface AddConnectionDialogProps {
    handleSubmit: (e: React.FormEvent) => void; // Form submit handler
    networks: string[]; // Array of available networks
    selectedNetwork: string | null; // Currently selected network
    handleNetworkSelect: (network: string) => void; // Function to handle network selection
    mavenToken: string; // State for Maven token
    setMavenToken: React.Dispatch<React.SetStateAction<string>>; // State setter for Maven token
    guidePointUsername: string; // State for Guidepoint username
    setGuidePointUsername: React.Dispatch<React.SetStateAction<string>>; // State setter for Guidepoint username
    guidePointPassword: string; // State for Guidepoint password
    setGuidePointPassword: React.Dispatch<React.SetStateAction<string>>; // State setter for Guidepoint password
  }

const AddConnectionDialog: React.FC<AddConnectionDialogProps> = ({
    handleSubmit,
    networks,
    selectedNetwork,
    handleNetworkSelect,
    mavenToken,
    setMavenToken,
    guidePointUsername,
    setGuidePointUsername,
    guidePointPassword,
    setGuidePointPassword
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
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
                    {selectedNetwork === 'AlphaSights' && (
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
    )
}

export default AddConnectionDialog;