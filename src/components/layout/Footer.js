import React from 'react'

export default function Footer() {
    return (
        <footer style={{ background: 'rgb(36,49,60)' }} className="text-white p-4 text-center">
            Copyright &copy; {new Date().getFullYear()} TraveLogue
        </footer>
    )
}
