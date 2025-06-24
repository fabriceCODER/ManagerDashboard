
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Suppliers from "./pages/Suppliers";
import PurchaseOrders from "./pages/PurchaseOrders";
import SalesOrders from "./pages/SalesOrders";
import ProductCategories from "./pages/ProductCategories";
import IncomingStock from "./pages/IncomingStock";
import OutgoingStock from "./pages/OutgoingStock";
import StockTransfers from "./pages/StockTransfers";
import InventoryAdjustment from "./pages/InventoryAdjustment";
import ActivityLogs from "./pages/ActivityLogs";
import CalendarView from "./pages/CalendarView";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="purchase-orders" element={<PurchaseOrders />} />
            <Route path="sales-orders" element={<SalesOrders />} />
            <Route path="categories" element={<ProductCategories />} />
            <Route path="incoming" element={<IncomingStock />} />
            <Route path="outgoing" element={<OutgoingStock />} />
            <Route path="transfers" element={<StockTransfers />} />
            <Route path="adjustments" element={<InventoryAdjustment />} />
            <Route path="activity" element={<ActivityLogs />} />
            <Route path="calendar" element={<CalendarView />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="reports" element={<Reports />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
