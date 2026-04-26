'use client'

import {useEffect, useRef} from 'react'
import {usePathname, useSearchParams} from 'next/navigation'
import logger from "@/utils/logger";

const log_tag = "Router"
const _logger = logger.withTag(log_tag)

export default function NavigationLogger() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const prevUrlRef = useRef<string | null>(null)

    useEffect(() => {
        const query = searchParams.toString()
        const currentUrl = query ? `${pathname}?${query}` : pathname

        if (prevUrlRef.current === null) {
            prevUrlRef.current = currentUrl
            _logger.info(`First Page: ${currentUrl}`)
            return
        }

        if (prevUrlRef.current !== currentUrl) {
            _logger.info(`Route Changed: ${prevUrlRef.current} -> ${currentUrl}`)
            prevUrlRef.current = currentUrl
        }
    }, [pathname, searchParams])

    return null
}