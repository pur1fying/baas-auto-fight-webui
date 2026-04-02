import {Text} from "@primer/react";
import Link from "next/link";
import {BAAS_Cpp_Repo, BAAS_Repo} from "@/constants/links";


function CreateNewWorkflowTopDescription() {
    return (
        <div className="flex flex-col mt-4">
            <Text className="text-2xl font-bold">
                Create a new workflow
            </Text>

            <Text className="text-[var(--fgColor-muted)]">
                A workflow is a reusable strategy contain your battle execution sequences.
            </Text>

            <Text className="text-[var(--fgColor-muted)]">
                Have a project elsewhere?{" "}
                <Link href="/new/import" target="_blank" rel="noreferrer">
                    Import a workflow
                </Link>
                .
            </Text>

            <Text className="text-[var(--fgColor-muted)]">
                This website is powered by {" "}
                <Link href={BAAS_Repo} target="_blank" rel="noreferrer">
                    BlueArchiveAutoScript
                </Link>
                {" "} and {" "}
                <Link href={BAAS_Cpp_Repo} target="_blank" rel="noreferrer">
                    BAAS_Cpp
                </Link>
                .
            </Text>

            <Text className="text-[var(--fgColor-muted)] italic">
                Required fields are marked with an asterisk (*).
            </Text>
        </div>
    );
}

export default CreateNewWorkflowTopDescription;