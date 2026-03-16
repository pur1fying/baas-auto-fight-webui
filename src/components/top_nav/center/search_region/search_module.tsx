'use client'
import { Button, IconButton } from '@primer/react'
import { SearchIcon } from "@primer/octicons-react";

function SearchModule() {
    return (
        <>
            <Button
                className="!bg-[var(--bgColor-default)] w-fit !hidden md:!block"
                size="medium"
                leadingVisual={SearchIcon}>
                <span>
                    <span className="text-[var(--fgColor-muted)]">Type </span>
                    <kbd  className="inline-block px-2 py-1 text-sm font-mono bg-gray-100 border border-gray-300 rounded shadow-sm">/</kbd>
                    <span className="text-[var(--fgColor-muted)]"> to search</span>
                </span>
            </Button>

            <IconButton
                className="!bg-[var(--bgColor-default)] block md:!hidden"
                size="medium"
                icon={SearchIcon}
                aria-label="Search Button"
                description="Search"
                keybindingHint="S,/"
            />
        </>
    );
}

export default SearchModule;