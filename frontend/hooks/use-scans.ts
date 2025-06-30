import { useEffect, useState } from "react"
import { apiClient, Scan } from "@/lib/api-client"

interface UseScanOptions {
    autoRefresh?: boolean
    refreshInterval?: number
}

export function useScans(options: UseScanOptions = {}) {
    const [scans, setScans] = useState<Scan[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
  
    const fetchScans = async () => {
      try {
        setLoading(true)
        setError(null)
  
        const response = await apiClient.getScans()
  
        if (response.success) {
          setScans(response.data)
        } else {
          setError(response.message || "Failed to fetch scans")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }
  
    useEffect(() => {
      fetchScans()
    }, [])

    useEffect(() => {
        if (options.autoRefresh && options.refreshInterval) {
          const interval = setInterval(fetchScans, options.refreshInterval)
          return () => clearInterval(interval)
        }
      }, [options.autoRefresh, options.refreshInterval])
  
    return {
      scans,
      loading,
      error,
      refetch: fetchScans,
    }
}