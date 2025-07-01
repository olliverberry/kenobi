import * as ld from '@launchdarkly/node-server-sdk';
import { Session } from 'next-auth';

class LaunchDarklyServer {
  private static client: ld.LDClient | undefined = undefined;

  async initialize() {
    LaunchDarklyServer.client = ld.init(process.env.LD_SERVER_SDK_SECRET!);
    await LaunchDarklyServer.client.waitForInitialization({
      timeout: 5,
    });
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
    const flagsState =
      await LaunchDarklyServer.client!.allFlagsState(userContext);
    return {
      flags: flagsState.toJSON(),
      context: userContext,
    };
  }
}

export const launchDarklyServer = new LaunchDarklyServer();
