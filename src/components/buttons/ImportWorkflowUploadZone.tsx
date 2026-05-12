'use client';

import {useRef, useState} from "react";
import {Button, Spinner, Text, TextInput} from "@primer/react";
import {ArrowUpIcon, XIcon} from "@primer/octicons-react";
import logger from "@/utils/logger";
import {stringToJson} from "@/utils/string_utils";
import {buildWorkflowPathReport} from "@/utils/workflowValidation/report";

const log_tag = "Import Workflow";
const _logger = logger.withTag(log_tag);

type ImportWorkflowUploadZoneProps = {
    onFileSelect? : (file: File) => Promise<void> | void;
    onFileRemove? : () => Promise<void> | void;
};

type UploadStatus = "idle" | "loading" | "error";

type UploadedFileInfo = {
    name        : string;
    displayName : string;
    size        : number;
};

function formatFileSizeMB(size: number): string {
    return `${(size / 1024 / 1024).toFixed(2)} MB`;
}

function ImportWorkflowUploadZone({onFileSelect, onFileRemove}: ImportWorkflowUploadZoneProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [status, setStatus] = useState<UploadStatus>("idle");
    const [errorTitle, setErrorTitle] = useState("");
    const [errorSuggestion, setErrorSuggestion] = useState("");
    const [uploadedFile, setUploadedFile] = useState<UploadedFileInfo | null>(null);

    async function handleFile(file: File | undefined, source: "input" | "drop") {
        if (!file) return;

        _logger.info(`File received from ${source}: name="${file.name}", size=${file.size} bytes, type="${file.type}"`);

        // read file content
        let fileText: string;
        try {
            fileText = await file.text();
        } catch (error) {
            setStatus("error");
            setErrorTitle(`Failed to read file: ${file.name}`);
            setErrorSuggestion("Please try again or choose another file.");
            _logger.error(`Failed to read file "${file.name}"`);
            return;
        }

        // json format check
        let obj = stringToJson(fileText)
        if (obj instanceof Error) {
            setStatus("error");
            setErrorTitle(`Invalid JSON format : ${file.name}`);
            setErrorSuggestion("Please ensure the file contains valid JSON and try again.");
            _logger.error(`Invalid JSON format : `);
            _logger.error(`${obj.message}`)
            return;
        }
        _logger.info("File is valid JSON");

        const result = buildWorkflowPathReport(obj);
        _logger.info(`Workflow validation completed with ${result.issues.length} issue(s).`);


        // status change
        try {
            setStatus("loading");
            setErrorTitle("");
            setErrorSuggestion("");

            _logger.info(`Start processing workflow file: "${file.name}"`);

            await onFileSelect?.(file);

            setUploadedFile({
                name: file.name,
                displayName: file.name,
                size: file.size,
            });

            setStatus("idle");

        } catch (error) {
            setStatus("error");
            setErrorTitle("Failed to process this file.");
            setErrorSuggestion("Please try another valid workflow JSON file.");
        }
    }

    async function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        await handleFile(file, "input");
        e.target.value = "";
    }

    // drop file into zone
    async function handleDrop(e: React.DragEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        await handleFile(file, "drop");
    }

    function handleDragOver(e: React.DragEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }

    function handleDragLeave(e: React.DragEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }

    function openFileDialog() {
        if (status === "loading") {
            _logger.warn("Ignored upload zone click : There is an upload is in progress.");
            return;
        }

        _logger.info("Opening file picker.");
        inputRef.current?.click();
    }

    async function handleRemoveFile() {
        const removedFile = uploadedFile;
        if (!removedFile) return

        setUploadedFile(null);
        setStatus("idle");
        setErrorTitle("");
        setErrorSuggestion("");

        if (inputRef.current) inputRef.current.value = "";

        _logger.info(`Remove uploaded file: "${removedFile.displayName}" (${removedFile.size} bytes)`);

        try {
            await onFileRemove?.();
        } catch (error) {
        }
    }

    function handleDisplayNameChange(value: string) {
        setUploadedFile((prev) => {
            if (!prev) return prev;

            if (prev.displayName !== value)
                _logger.debug(`Uploaded file display name changed: "${prev.displayName}" -> "${value}"`);

            return {
                ...prev,
                displayName: value,
            };
        });
    }

    return (
        <div className="w-full">
            <input
                ref={inputRef}
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={handleInputChange}
            />

            {uploadedFile ? (
                <div
                    className="w-full !rounded-md border border-[var(--borderColor-default)] px-4 py-3 flex items-start justify-between gap-4">
                    <TextInput
                        className="w-full"
                        monospace
                        placeholder="Enter your file's name"
                        value={uploadedFile.displayName}
                        onChange={(e) => handleDisplayNameChange(e.target.value)}
                        aria-label="Uploaded file name"
                    />

                    <div className="flex items-center gap-3 shrink-0 pt-1">
                        <Text className="text-[var(--fgColor-muted)] whitespace-nowrap">
                            ({formatFileSizeMB(uploadedFile.size)})
                        </Text>

                        <button
                            type="button"
                            onClick={handleRemoveFile}
                            aria-label="Remove uploaded file"
                            className="flex items-center justify-center rounded-md hover:bg-[var(--bgColor-muted)] text-[var(--fgColor-muted)] hover:text-[var(--fgColor-default)]"
                        >
                            <XIcon size={20}/>
                        </button>
                    </div>
                </div>
            ) : (
                <Button
                    type="button"
                    aria-label="Import workflow by dropping a JSON file here or selecting one"
                    onClick={openFileDialog}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={[
                        "w-full !h-[65px] !rounded-md border border-dashed",
                        status === "loading"
                            ? "cursor-wait border-[var(--borderColor-default)] bg-[var(--bgColor-muted)]"
                            : isDragging
                                ? "!border-[var(--borderColor-accent-emphasis)] bg-[var(--bgColor-accent-muted)]"
                                : "border-[var(--borderColor-default)] bg-transparent hover:bg-[var(--bgColor-muted)]"
                    ].join(" ")}
                >
                    {status === "idle" && (
                        <span className="flex items-center justify-center text-center">
                            <ArrowUpIcon size={32}/>
                            <Text className="text-bold">
                                Drop workflow JSON file here or copy its' content.
                            </Text>
                        </span>
                    )}

                    {status === "loading" && (
                        <span className="relative flex items-center justify-center gap-1">
                            <Spinner size="small"/>
                            <Text className="text-[var(--fgColor-muted)]">
                                Uploading your file now...
                            </Text>
                        </span>
                    )}

                    {status === "error" && (
                        <span className="flex">
                            <span className="relative px-3 text-center">
                                <Text className="text-[var(--fgColor-danger)] font-bold block">
                                    {errorTitle}
                                </Text>
                                <Text className="text-[var(--fgColor-muted)] block">
                                    {errorSuggestion}
                                </Text>
                            </span>
                        </span>
                    )}
                </Button>
            )}
        </div>
    );
}

export default ImportWorkflowUploadZone;
