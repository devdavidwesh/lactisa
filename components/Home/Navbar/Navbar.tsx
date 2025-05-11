import Container from "@/components/Container"
import Logo from "./logo"
import MenuItems from "./menuItems"
import Login from "./login"

const Navbar = () => {
  return (
    <nav className = "w-full bg-navcolor h-16 sticky top-0 z-50 shadow-md">
        <Container>
            <div className="flex items-center justify-between px-2">
                <Logo />
                <MenuItems />
                <Login />
            </div>
        </Container>
    </nav>
  )
}

export default Navbar