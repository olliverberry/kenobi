import * as ld from '@launchdarkly/node-server-sdk';

// this is a server-side function that gets all feature flags
// which is used in the frontend to initialize the launchdarkly
// react sdk with initial feature flags. it is only intended to be used once.
export async function getFeatureFlags(userContext: ld.LDContext) {
    try {
      const client = ld.init(process.env.LD_SERVER_SDK_SECRET!);
      await client.waitForInitialization({
        timeout: 5,
      });
      
      const flagsState = await client.allFlagsState(userContext);
      client.close();
      
      return flagsState.toJSON();
    } catch (error) {
      console.warn('Failed to get feature flags:', error);
      return {};
    }
}