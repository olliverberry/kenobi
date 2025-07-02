import * as ld from '@launchdarkly/node-server-sdk';
import { Session } from 'next-auth';

class LaunchDarklyServer {
  private static client: ld.LDClient | undefined = undefined;
  private static initPromise: Promise<void> | undefined = undefined;

  async initialize() {
    if (LaunchDarklyServer.initPromise) {
      return LaunchDarklyServer.initPromise;
    }

    LaunchDarklyServer.initPromise = (async () => {
      try {
        if (!process.env.LD_SERVER_SDK_SECRET) {
          console.warn(
            '[LaunchDarkly] LD_SERVER_SDK_SECRET not found, using offline mode',
          );
          LaunchDarklyServer.client = ld.init('dummy-key', { offline: true });
          return;
        }

        console.log('[LaunchDarkly] Initializing LaunchDarkly client...');
        LaunchDarklyServer.client = ld.init(process.env.LD_SERVER_SDK_SECRET);

        await LaunchDarklyServer.client.waitForInitialization({
          timeout: 10,
        });

        console.log('[LaunchDarkly] Client initialized successfully');
      } catch (error) {
        console.error('[LaunchDarkly] Initialization failed:', error);
        LaunchDarklyServer.client = ld.init('dummy-key', { offline: true });
      }
    })();

    return LaunchDarklyServer.initPromise;
  }

  async getInitialContext(session: Session) {
    const userContext = {
      kind: 'user',
      key: session?.user.email ?? 'anonymous',
      custom: {
        userId: session?.user.userId ?? 'anonymous',
        email: session?.user.email ?? 'anonymous',
        firstName: session?.user.firstName ?? 'anonymous',
        lastName: session?.user.lastName ?? 'anonymous',
        businessUnit: session?.user.businessUnit ?? 'anonymous',
        title: session?.user.title ?? 'anonymous',
      },
    };

    if (!LaunchDarklyServer.client) {
      await this.initialize();
    }

    try {
      if (
        !LaunchDarklyServer.client ||
        !LaunchDarklyServer.client.initialized()
      ) {
        console.warn('[LaunchDarkly] Client not ready, returning empty flags');
        return {
          flags: {},
          context: userContext,
        };
      }

      const flagsState =
        await LaunchDarklyServer.client.allFlagsState(userContext);
      console.log(
        `[LaunchDarkly] Retrieved ${Object.keys(flagsState.toJSON()).length} flags`,
      );
      return {
        flags: flagsState.toJSON(),
        context: userContext,
      };
    } catch (error) {
      console.error('[LaunchDarkly] Error getting flags:', error);
      return {
        flags: {},
        context: userContext,
      };
    }
  }
}

export const launchDarklyServer = new LaunchDarklyServer();
