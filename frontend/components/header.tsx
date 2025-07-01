import { Bell, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';
import { DashboardAlertSetupModal } from './dashboard-alert-modal';
import { useState } from 'react';
import { POVData } from '@/lib/api-client';

export default function Header({ povs }: { povs: POVData[] | null }) {
  const { hasAlertsModal } = useFlags();
  const ldClient = useLDClient();
  const [showDashboardAlertsModal, setShowDashboardAlertsModal] =
    useState(false);

  const handleSetupAlertsClick = () => {
    // Track the button click with LaunchDarkly
    if (ldClient) {
      ldClient.track('setup-alerts-button-clicked');
    }
    setShowDashboardAlertsModal(true);
  };
  return (
    <header className='border-b bg-white'>
      <div className='flex h-16 items-center px-6'>
        <div className='flex items-center space-x-2'>
          <Shield className='text-primary h-6 w-6' />
          <h1 className='text-xl font-semibold'>Semgrep POV Management</h1>
        </div>
        <div className='ml-auto'>
          {hasAlertsModal && (
            <Button
              variant='outline'
              size='sm'
              className='cursor-pointer gap-2 bg-transparent'
              onClick={handleSetupAlertsClick}
            >
              <Bell className='h-4 w-4' />
              Setup Alerts
            </Button>
          )}
        </div>
      </div>
      <DashboardAlertSetupModal
        isOpen={showDashboardAlertsModal}
        onClose={() => setShowDashboardAlertsModal(false)}
        povs={povs ?? []}
      />
    </header>
  );
}
