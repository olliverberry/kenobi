"use client"

import { useState, useEffect } from "react"
import { apiClient, type POVData } from "@/lib/api-client"

interface UsePOVsOptions {
  status?: string
  autoRefresh?: boolean
  refreshInterval?: number
}

export function usePOVs(options: UsePOVsOptions = {}) {
  const [povs, setPOVs] = useState<POVData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPOVs = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = options.status ? await apiClient.getPOVsByStatus(options.status) : await apiClient.getAllPOVs()

      if (response.success) {
        setPOVs(response.data)
      } else {
        setError(response.message || "Failed to fetch POVs")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPOVs()
  }, [options.status])

  useEffect(() => {
    if (options.autoRefresh && options.refreshInterval) {
      const interval = setInterval(fetchPOVs, options.refreshInterval)
      return () => clearInterval(interval)
    }
  }, [options.autoRefresh, options.refreshInterval])

  return {
    povs,
    loading,
    error,
    refetch: fetchPOVs,
  }
}

export function usePOV(id: string) {
  const [pov, setPOV] = useState<POVData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPOV = async () => {
    if (!id) return

    try {
      setLoading(true)
      setError(null)

      const response = await apiClient.getPOVById(id)

      if (response.success) {
        setPOV(response.data)
      } else {
        setError(response.message || "Failed to fetch POV")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPOV()
  }, [id])

  return {
    pov,
    loading,
    error,
    refetch: fetchPOV,
  }
}
