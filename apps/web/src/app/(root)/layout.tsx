import { Navbar } from "@/components/home/navbar";

export default function HomeLayout({children}: {children: React.ReactNode}) {
    return (
        <section>
            <Navbar />
            {children}
        </section>
    );
}