import PrimaryLayout from "./layout/PrimaryLayout";
import { SidebarProvider } from "./context/SidebarProvider";

function App() {
    return (
        <SidebarProvider>
            <PrimaryLayout />
        </SidebarProvider>
    );
}

export default App;
