
export default function Layout({ children } : {children : React.ReactNode}) {
    return (
        <div className="flex space-x-3">
            {children}
        </div>
    )
}