import React from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/Dialog'
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"

interface AddConnectionDialogProps {
    handleSubmit: (e: React.FormEvent) => void; // Form submit handler
    networks: string[]; // Array of available networks
    selectedNetwork: string | null; // Currently selected network
    handleNetworkSelect: (network: string) => void; // Function to handle network selection
    dialecticaMavenToken: string; // State for Maven token
    setDialecticaMavenToken: React.Dispatch<React.SetStateAction<string>>; // State setter for Maven token
    guidePointUsername: string; 
    setGuidePointUsername: React.Dispatch<React.SetStateAction<string>>; 
    guidePointPassword: string; 
    setGuidePointPassword: React.Dispatch<React.SetStateAction<string>>;
    alphaSightsUsername: string; 
    setAlphaSightsUsername: React.Dispatch<React.SetStateAction<string>>; 
    alphaSightsPassword: string; 
    setAlphaSightsPassword: React.Dispatch<React.SetStateAction<string>>;
    thirdBridgeUsername: string; 
    setThirdBridgeUsername: React.Dispatch<React.SetStateAction<string>>; 
    thirdBridgePassword: string; 
    setThirdBridgePassword: React.Dispatch<React.SetStateAction<string>>;
}

const AddConnectionDialog: React.FC<AddConnectionDialogProps> = ({
    handleSubmit,
    networks,
    selectedNetwork,
    handleNetworkSelect,
    dialecticaMavenToken,
    setDialecticaMavenToken,
    guidePointUsername,
    setGuidePointUsername,
    guidePointPassword,
    setGuidePointPassword,
    alphaSightsUsername,
    setAlphaSightsUsername,
    alphaSightsPassword,
    setAlphaSightsPassword,
    thirdBridgeUsername,
    setThirdBridgeUsername, 
    thirdBridgePassword, 
    setThirdBridgePassword
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    Manage connections
                </Button>
            </DialogTrigger>        
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Manage connections</DialogTitle>
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
                            value={alphaSightsUsername}
                            onChange={(e) => setAlphaSightsUsername(e.target.value)}
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
                            value={alphaSightsPassword}
                            onChange={(e) => setAlphaSightsPassword(e.target.value)}
                            className="col-span-3"
                        />
                        </div>
                    </div>
                    )}
                    {selectedNetwork === 'Third Bridge' && (
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            value={thirdBridgeUsername}
                            onChange={(e) => setThirdBridgeUsername(e.target.value)}
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
                            value={thirdBridgePassword}
                            onChange={(e) => setThirdBridgePassword(e.target.value)}
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
                    {selectedNetwork === 'Dialectica' && (
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="dialecticaMavenToken" className="text-right">
                            Maven Token
                        </Label>
                        <Input
                            id="dialecticaMavenToken"
                            value={dialecticaMavenToken}
                            onChange={(e) => setDialecticaMavenToken(e.target.value)}
                            className="col-span-3"
                        />
                        </div>
                    </div>
                    )}                    
                    <DialogFooter>
                    <Button 
                        type="submit" 
                        disabled={!selectedNetwork}>Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddConnectionDialog;