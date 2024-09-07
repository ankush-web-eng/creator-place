import DashboardLayout from "@/components/dashboard/dashboardLayout";

export default function Layout({ children } : {children : React.ReactNode}) {
    return (
        <div className="flex space-x-3 min-h-screen items-start mt-8">
            <DashboardLayout />
            {children}
        </div>
    )
}