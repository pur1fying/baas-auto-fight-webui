import HomePageButton from "@/components/buttons/homepage";

export default function Home() {
    let itms = ["about page", "b", "c"];
    console.log("Items:", itms);
    return (
        <>
            <HomePageButton items={itms}/>
        </>
    );
}

