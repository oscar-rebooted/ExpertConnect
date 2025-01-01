import React from "react"
import { Button } from "@/components/ui/Button"

const MainPage: React.FC = () => {
  return (
    <div>
      <h1>Main Page</h1>
      <Button variant="default" onClick={() => alert('Clicked!')}>
        Click Me
      </Button>
    </div>
  );
};

export default MainPage;