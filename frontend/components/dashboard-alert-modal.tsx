"use client"

import * as React from "react"
import { Bell, Mail, Check, Building2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface POV {
  id: string
  prospectName: string
  status: string
  salesOwner: string
}

interface DashboardAlertSetupModalProps {
  isOpen: boolean
  onClose: () => void
  povs: POV[]
}

export function DashboardAlertSetupModal({ isOpen, onClose, povs }: DashboardAlertSetupModalProps) {
  const [selectedPOVs, setSelectedPOVs] = React.useState<string[]>([])
  const [emailAddress, setEmailAddress] = React.useState("")
  const [frequency, setFrequency] = React.useState("daily")
  const [customMessage, setCustomMessage] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const activePOVs = povs.filter((pov) => pov.status === "active")

  const handlePOVClick = (povId: string) => {
    if (selectedPOVs.includes(povId)) {
      setSelectedPOVs(selectedPOVs.filter((id) => id !== povId))
    } else {
      setSelectedPOVs([...selectedPOVs, povId])
    }
  }

  const handleSelectAll = () => {
    if (selectedPOVs.length === activePOVs.length) {
      setSelectedPOVs([])
    } else {
      setSelectedPOVs(activePOVs.map((pov) => pov.id))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Auto-close after success
      setTimeout(() => {
        setIsSuccess(false)
        setSelectedPOVs([])
        setEmailAddress("")
        setFrequency("daily")
        setCustomMessage("")
        onClose()
      }, 2000)
    }, 1500)
  }

  const handleClose = () => {
    setSelectedPOVs([])
    setEmailAddress("")
    setFrequency("daily")
    setCustomMessage("")
    setIsSuccess(false)
    onClose()
  }

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Alerts Configured!</h3>
            <p className="text-sm text-muted-foreground">
              You&apos;ll receive {frequency} notifications for {selectedPOVs.length} selected POV
              {selectedPOVs.length !== 1 ? "s" : ""}.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Setup Dashboard Alerts
          </DialogTitle>
          <DialogDescription>
            Configure email notifications for your POVs. Select which POVs to monitor and set up alert preferences.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* POV Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Select POVs to Monitor</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
                className="text-xs bg-transparent"
              >
                {selectedPOVs.length === activePOVs.length ? "Deselect All" : "Select All"} ({activePOVs.length})
              </Button>
            </div>

            <div className="grid gap-3 max-h-48 overflow-y-auto border rounded-lg p-3">
              {activePOVs.map((pov) => {
                const isSelected = selectedPOVs.includes(pov.id)
                return (
                  <div
                    key={pov.id}
                    className={`cursor-pointer transition-colors p-3 border rounded-lg ${
                      isSelected ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                    }`}
                    onClick={() => handlePOVClick(pov.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium text-sm">{pov.prospectName}</div>
                          <div className="text-xs text-muted-foreground">Sales Owner: {pov.salesOwner}</div>
                        </div>
                      </div>
                      <div
                        className={`w-4 h-4 border rounded ${isSelected ? "bg-primary border-primary" : "border-border"}`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white m-0.5" />}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Alert Configuration */}
          {selectedPOVs.length > 0 && (
            <div className="space-y-4">
              <Label className="text-base font-medium">Alert Configuration</Label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <Label htmlFor="email">Email Address</Label>
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@company.com"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily Summary</SelectItem>
                      <SelectItem value="weekly">Weekly Report</SelectItem>
                      <SelectItem value="immediate">Immediate (failures only)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Custom Message (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Add any specific instructions or context for these alerts..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Alert Types Info */}
          {selectedPOVs.length > 0 && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-sm font-medium text-blue-900 mb-2">What you&apos;ll receive:</h4>
              <div className="text-xs text-blue-700 space-y-1">
                <div>
                  • Monitoring {selectedPOVs.length} POV{selectedPOVs.length !== 1 ? "s" : ""}
                </div>
                <div>• {frequency.charAt(0).toUpperCase() + frequency.slice(1)} email notifications</div>
                <div>• Scan failure alerts, contributor threshold warnings, and activity summaries</div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={selectedPOVs.length === 0 || !emailAddress || isSubmitting}>
              {isSubmitting
                ? "Setting up..."
                : `Setup Alerts for ${selectedPOVs.length} POV${selectedPOVs.length !== 1 ? "s" : ""}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
