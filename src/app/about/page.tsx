import '@primer/css/dist/primer.css'
import HomePageButton from "@/components/buttons/homepage";
import {BaseStyles, ThemeProvider} from "@primer/react";
import {Button} from "@primer/react";
import Hello from '@/components/buttons/hello';

export default function Home() {
    let itms = ["about page", "b", "c"];
    console.log("Items:", itms);
    return (
        <>
            <HomePageButton items={itms}/>
        </>
    );
}

